// pages/api/create-payment-intent.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { amount, currency, paymentMethodType } = req.body;

        try {
            // Create a PaymentIntent with Afterpay and Zip
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: [paymentMethodType],
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
