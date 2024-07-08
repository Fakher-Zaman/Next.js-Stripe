import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { name, email, paymentMethod } = await req.json();

        console.log('Received request with name:', name, 'email:', email, 'paymentMethod:', paymentMethod);

        // Create a customer
        const customer = await stripe.customers.create({
            email,
            name,
            payment_method: paymentMethod,
            invoice_settings: { default_payment_method: paymentMethod },
        });

        console.log('Customer created:', customer.id);

        // Create a product
        const product = await stripe.products.create({
            name: 'Monthly subscription',
        });

        console.log('Product created:', product.id);

        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price_data: {
                        currency: 'INR',
                        product: product.id,
                        unit_amount: 500, // amount should be a number, not a string
                        recurring: {
                            interval: 'month',
                        },
                    },
                },
            ],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
        });

        console.log('Subscription created:', subscription);

        // Log the entire subscription object
        console.log('Subscription details:', JSON.stringify(subscription, null, 2));

        // Check if the payment intent exists
        if (!subscription.latest_invoice || !subscription.latest_invoice.payment_intent) {
            throw new Error('Failed to create subscription payment intent');
        }

        console.log('Payment intent created:', subscription.latest_invoice.payment_intent.id);

        // Send back the client secret for payment
        return NextResponse.json({
            message: 'Subscription successfully initiated',
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (err) {
        console.error('Error creating subscription:', err);
        return NextResponse.json({ message: 'Internal server error', error: err.message }, { status: 500 });
    }
}