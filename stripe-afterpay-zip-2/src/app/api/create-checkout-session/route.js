import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { quantity, shippingDetails } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'afterpay_clearpay', 'zip'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: 'Gel Bottle',
                            description: 'A great product for a great price!',
                            images: ['https://www.shutterstock.com/image-illustration/bottle-gel-lotion-beauty-product-260nw-1348122737.jpg'],
                        },
                        unit_amount: 2000, // Amount in cents, $20.00
                    },
                    quantity: quantity || 1, // Default quantity is 1
                },
            ],
            payment_intent_data: {
                shipping: {
                    name: shippingDetails.name,
                    address: {
                        line1: shippingDetails.address.line1,
                        line2: shippingDetails.address.line2,
                        city: shippingDetails.address.city,
                        state: shippingDetails.address.state,
                        postal_code: shippingDetails.address.postal_code,
                        country: shippingDetails.address.country,
                    },
                },
            },
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json(session);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}