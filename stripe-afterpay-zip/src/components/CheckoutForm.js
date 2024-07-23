// components/CheckoutForm.js

import { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, currency, paymentMethodType }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: backendError, clientSecret } = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, currency, paymentMethodType }),
        }).then((res) => res.json());

        if (backendError) {
            setMessage(backendError.message);
            setIsProcessing(false);
            return;
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Test User',
                },
            },
        });

        if (stripeError) {
            setMessage(stripeError.message);
            setIsProcessing(false);
            return;
        }

        setMessage(`Payment succeeded! PaymentIntent ID: ${paymentIntent.id}`);
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ hidePostalCode: true }} />
            <button type="submit" disabled={isProcessing || !stripe || !elements}>
                {isProcessing ? 'Processing…' : 'Pay Now'}
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
