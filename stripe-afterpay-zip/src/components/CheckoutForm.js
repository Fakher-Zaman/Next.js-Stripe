import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, currency, paymentMethodType }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setMessage('Stripe has not loaded yet.');
            setIsProcessing(false);
            return;
        }

        // Fetch the client secret from your backend
        const { clientSecret, error: backendError } = await fetch('/api/create-payment-intent', {
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

        // Confirm the payment based on the payment method type
        let result;
        try {
            result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.href, // Redirect after payment
                },
            });
        } catch (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }

        if (result.error) {
            setMessage(result.error.message);
            setIsProcessing(false);
            return;
        }

        setMessage(`Payment succeeded! PaymentIntent ID: ${result.paymentIntent.id}`);
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement options={{ layout: 'tabs' }} />
            <button type="submit" disabled={isProcessing || !stripe || !elements}>
                {isProcessing ? 'Processing…' : 'Pay Now'}
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
