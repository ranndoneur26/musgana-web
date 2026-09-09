import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is missing');
    return NextResponse.json({ error: 'Configuración de pago no disponible' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const { genero, talla, cantidad, dni, telefono, lang, shippingDetails } = await req.json();
    
    // 4.1 Validación básica en el servidor
    const tallasValidas = ['S','M','L','XL','2XL','3XL','4XL','5XL', 'XS', 'XXL']; // Incluyendo tallas de mujer vistas en el frontend
    const generosValidos = ['Hombre','Mujer', 'male', 'female'];

    if (!tallasValidas.includes(talla)) {
      return NextResponse.json({ error: 'Talla no válida' }, { status: 400 });
    }
    if (!generosValidos.includes(genero)) {
      return NextResponse.json({ error: 'Género no válido' }, { status: 400 });
    }
    if (!cantidad || cantidad < 1 || cantidad > 10) {
      return NextResponse.json({ error: 'Cantidad no válida (máximo 10)' }, { status: 400 });
    }
    if (!dni || !dni.trim()) {
      return NextResponse.json({ error: 'D.N.I obligatorio' }, { status: 400 });
    }
    if (!telefono || !telefono.trim()) {
      return NextResponse.json({ error: 'Teléfono obligatorio' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: shippingDetails?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Camiseta La Musgaña 40 Aniversario',
              description: `Género: ${genero} | Talla: ${talla}`,
              images: ['https://lamusgaña.net/images/shop/tshirt_40th_mockup.png'], // URL baseada en el frontend
            },
            unit_amount: 2900, // 29.00 EUR
          },
          quantity: cantidad,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/${lang}/tienda/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/${lang}/tienda/cancel`,
      metadata: {
        producto: 'Camiseta La Musgaña 40 Aniversario',
        genero: genero,
        talla: talla,
        cantidad: String(cantidad),
        dni: dni,
        telefono: telefono,
        // Mantener otros detalles de envío útiles
        nombre: `${shippingDetails?.firstName} ${shippingDetails?.lastName}`,
        email: shippingDetails?.email || '',
        direccion: shippingDetails?.address || '',
        localidad: shippingDetails?.city || '',
        codigo_postal: shippingDetails?.zip || '',
        provincia: shippingDetails?.province || '',
        pais: shippingDetails?.country || 'España',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
