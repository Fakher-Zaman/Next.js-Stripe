import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount, currency, paymentMethodType } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: [paymentMethodType, 'card'], // Add 'card' if needed
        });

        return new Response(
            JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
