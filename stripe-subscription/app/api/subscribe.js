import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function subscribe(req, res) {
    try {
        if(req.method !== 'POST') {
            return res.status(400).json({ message: 'Only POST requests are allowed' });
        }
        const { name, email, paymentMethod } = req.body;
        // Create a customer
        const customer = await Stripe.customers.create({
            name,
            email,
            paymentMethod,
            invoice_settings: {
                default_payment_method: paymentMethod
            }
        });
        // Create a product
        const product = await stripe.products.create({
            name: 'Monthly Subscription',
        });
        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price_data: {
                        currency: 'INR',
                        product: product.id,
                        unit_amount: 500,
                        recurring: {
                            interval: 'month',
                        }
                    },
                }
            ],
            payment_settings: {
                payment_method_options: ['card'],
                save_default_payment_method: "on_subscription",
            },
            expand: ['latest_invoice.payment_intent']
        });
        // Send back the client_secret
        res.json({
            message: 'Subscription successful!',
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}