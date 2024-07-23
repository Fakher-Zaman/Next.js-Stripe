'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const [amount, setAmount] = useState(1000); // $10.00
    const [currency, setCurrency] = useState('aud');
    const [paymentMethodType, setPaymentMethodType] = useState('afterpay_clearpay');
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientSecret = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount, currency, paymentMethodType }),
                });
                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientSecret();
    }, [amount, currency, paymentMethodType]);

    return (
        <div className='flex flex-col justify-center items-center p-6 w-full'>
            <h1 className='text-center text-2xl'>Stripe Checkout</h1>
            <label className='p-4'>
                Payment Method:
                <select
                    value={paymentMethodType}
                    onChange={(e) => setPaymentMethodType(e.target.value)}
                    className='border border-gray-300 rounded p-2 ml-2'
                >
                    <option value="afterpay_clearpay">Afterpay</option>
                    <option value="zip">Zip</option>
                </select>
            </label>

            {loading ? (
                <p>Loading...</p>
            ) : (
                clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm amount={amount} currency={currency} paymentMethodType={paymentMethodType} />
                    </Elements>
                )
            )}
        </div>
    );
};

export default Checkout;
