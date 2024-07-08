'use client';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const createSubscription = async (e) => {
        try {
            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement('card'),
            });
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    paymentMethod: paymentMethod.paymentMethod.id,
                }),
            });
            if(!response.ok) return alert("Something went wrong! Please try again.");
            const data = await response.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret);
            if(confirm.error) return alert("Payment failed! " + confirm.error.message);
            alert("Payment successful!");
        } catch (error) {
            console.log(error);
            alert("Payment failed! " + error.message);
        }
    }

    return (
        <>
            <form>
                <div>
                    Name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    Email:{" "}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <CardElement />
                <div>
                    <button
                        onClick={createSubscription}
                    >
                        Subscribe - 5 INR
                    </button>
                </div>
            </form>
        </>
    )
}

export default PaymentForm;