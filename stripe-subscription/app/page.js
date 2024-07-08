'use client';

import PaymentForm from "@/components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  return (
    <main className="">
      <p>Stripe Subscription Method!</p>

      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </main>
  );
}
