'use client';

import Head from 'next/head';
import CheckoutButton from '../components/CheckoutButton';

export default function Home() {
  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center">
      <Head>
        <title>Stripe Checkout Integration</title>
        <meta name="description" content="Pay with Stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 py-16">
        <h1 className="text-2xl font-bold text-center">Welcome to Our Store</h1>
        <div className="border p-4 flex flex-col items-center">
          <img
            src='https://www.shutterstock.com/image-illustration/bottle-gel-lotion-beauty-product-260nw-1348122737.jpg'
            alt='Gel Bottle'
            className="w-full max-w-xs object-cover mb-4"
          />
          <p className="text-xl text-center">Buy a Gel Bottle for $20.00</p>
        </div>
        <CheckoutButton />
      </main>
    </div>
  );
}
