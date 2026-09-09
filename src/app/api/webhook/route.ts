import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        if (!endpointSecret) throw new Error('Webhook secret not configured');
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve metadata
        const { genero, talla, cantidad, dni, telefono, producto } = session.metadata || {};

        console.log('Pago completado para:', producto);
        console.log('Detalles del cliente:', { genero, talla, cantidad, dni, telefono });

        // AQUÍ: Guardar el pedido en tu base de datos o enviar un email
        // await saveOrder({
        //   email: session.customer_details?.email,
        //   total: session.amount_total,
        //   genero, talla, cantidad, dni, telefono
        // });
    }

    return NextResponse.json({ received: true });
}
