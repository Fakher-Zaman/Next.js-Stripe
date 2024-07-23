// app/page.js

'use client';

import Head from 'next/head';
import CheckoutButton from '../components/CheckoutButton';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Stripe Checkout Integration</title>
        <meta name="description" content="Pay with Stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Our Store</h1>
        <div className='border p-4'>
          <img src='https://www.shutterstock.com/image-illustration/bottle-gel-lotion-beauty-product-260nw-1348122737.jpg' alt='img'/>
          <p>Buy a Gel Bottle for $20.00</p>
        </div>
        <CheckoutButton />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        p {
          text-align: center;
          font-size: 1.5rem;
        }
        .checkout-button {
          padding: 10px 20px;
          background-color: #6772e5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .checkout-button:hover {
          background-color: #5469d4;
        }
      `}</style>
    </div>
  );
}
