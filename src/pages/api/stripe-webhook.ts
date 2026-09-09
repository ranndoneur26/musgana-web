import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

// Disable Next.js body parsing to read raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

let stripe: Stripe;
let transporter: nodemailer.Transporter;

function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-12-18.acacia' as any,
    });
  }
  return stripe;
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stripe = getStripe();
  const transporter = getTransporter();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Fetch line items to display products
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const customerName = session.customer_details?.name || 'Cliente';
      const customerEmail = session.customer_details?.email || 'No email';
      const customerPhone = session.customer_details?.phone || 'No teléfono';

      // Address from Stripe or Metadata
      const sessionWithShipping = session as any;
      const address = sessionWithShipping.shipping_details?.address || session.customer_details?.address;

      const metadata = session.metadata || {};

      const genero = metadata.genero ?? "No indicado";
      const talla = metadata.talla ?? "No indicada";
      const cantidad = metadata.cantidad ?? "1";

      // Format address specifically from metadata if available (as requested)
      const shippingAddressFormatted = `
        Dirección: ${metadata.direccion || address?.line1 || ''}
        Localidad: ${metadata.localidad || address?.city || ''}
        Código Postal: ${metadata.codigo_postal || address?.postal_code || ''}
        Provincia: ${metadata.provincia || address?.state || ''}
        País: ${metadata.pais || address?.country || ''}
      `;

      const productsHtml = lineItems.data.map(item =>
        `<li>${item.description} (x${item.quantity}) - ${(item.amount_total / 100).toFixed(2)}€</li>`
      ).join('');

      const total = (session.amount_total || 0) / 100;

      const mailOptions = {
        from: `"La Musgaña Tienda" <${process.env.SMTP_USER}>`,
        to: 'ranndoneur26@gmail.com',
        subject: `Nuevo Pedido La Musgaña - ${customerName}`,
        html: `
          <h1>¡Nuevo pedido recibido!</h1>
          <p><strong>ID Sesión:</strong> ${session.id}</p>
          
          <h2>Detalles del Cliente</h2>
          <ul>
            <li><strong>Nombre:</strong> ${customerName}</li>
            <li><strong>Email:</strong> ${customerEmail}</li>
            <li><strong>Teléfono:</strong> ${customerPhone}</li>
          </ul>

          <h2>Dirección de Envío</h2>
          <pre>${shippingAddressFormatted}</pre>

          <h2>Producto</h2>
          <ul>
            <li><strong>Género:</strong> ${genero}</li>
            <li><strong>Talla:</strong> ${talla}</li>
            <li><strong>Cantidad:</strong> ${cantidad} ud.</li>
          </ul>

          <h2>Productos (Stripe)</h2>
          <ul>
            ${productsHtml}
          </ul>

          <h3>Total Pagado: ${total.toFixed(2)}€</h3>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email de pedido enviado correctamente.');

    } catch (err) {
      console.error('Error procesando el pedido o enviando email:', err);
      // Return 200 to Stripe to prevent retries even if email fails, as requested
    }
  }

  res.status(200).json({ received: true });
}
