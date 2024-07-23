// pages/checkout.js
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [amount, setAmount] = useState(1000); // $10.00
  const [currency, setCurrency] = useState('usd');
  const [paymentMethodType, setPaymentMethodType] = useState('afterpay_clearpay');

  return (
    <div>
      <h1>Checkout</h1>
      <label>
        Payment Method:
        <select
          value={paymentMethodType}
          onChange={(e) => setPaymentMethodType(e.target.value)}
        >
          <option value="afterpay_clearpay">Afterpay</option>
          <option value="zip">Zip</option>
        </select>
      </label>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} currency={currency} paymentMethodType={paymentMethodType} />
      </Elements>
    </div>
  );
};

export default Checkout;
