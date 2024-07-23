// components/CheckoutButton.js

'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
    const handleCheckout = async () => {
        try {
            const shippingDetails = {
                name: 'John Doe',
                address: {
                    line1: '123 Main Street',
                    line2: '',
                    city: 'San Francisco',
                    state: 'CA',
                    postal_code: '94111',
                    country: 'US',
                },
            };

            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: 1, // You can pass dynamic quantity here
                    shippingDetails, // Pass the shipping details here
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { id } = await res.json();

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <button onClick={handleCheckout} className="checkout-button">
            Checkout Now
        </button>
    );
}
