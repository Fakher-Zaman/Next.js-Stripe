import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount, currency, paymentMethodType } = await req.json();

        // Include shipping details based on payment method type
        let paymentIntentParams = {
            amount,
            currency,
            payment_method_types: [paymentMethodType, 'card'], // Add 'card' if needed
        };

        // Add shipping details if required by payment method
        if (paymentMethodType === 'afterpay_clearpay' || paymentMethodType === 'zip' || paymentMethodType === 'klarna') {
            paymentIntentParams = {
                ...paymentIntentParams,
                shipping: {
                    address: {
                        line1: '123 Example St',
                        city: 'Sample City',
                        postal_code: '12345',
                        state: 'CA',
                        country: 'US',
                    },
                    name: 'John Doe', // Example name
                },
            };
        }

        const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

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
