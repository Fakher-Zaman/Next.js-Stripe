// app/cancel/page.js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Cancel() {
    const router = useRouter();

    return (
        <div className="container">
            <h1>Payment Cancelled</h1>
            <p>Your payment was not processed. Please try again.</p>
            <button onClick={() => router.push('/')} className="back-button">
                Go to Home
            </button>

            <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .back-button {
          padding: 10px 20px;
          background-color: #6772e5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .back-button:hover {
          background-color: #5469d4;
        }
      `}</style>
        </div>
    );
}
