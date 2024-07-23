import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    try {
        // Extract data from the request body
        const { amount, currency, paymentMethodType } = await req.json();

        // Create a PaymentIntent with Afterpay and Zip
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: [paymentMethodType, "card"],
        });

        // Respond with the client secret
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
