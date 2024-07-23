// app/success/page.js

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
    const [loading, setLoading] = useState(true);
    const [sessionDetails, setSessionDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            const params = new URLSearchParams(window.location.search);
            const sessionId = params.get('session_id');
            if (!sessionId) {
                return;
            }

            try {
                const response = await fetch(`/api/get-checkout-session?session_id=${sessionId}`);
                const data = await response.json();
                setSessionDetails(data);
            } catch (error) {
                console.error('Error fetching session details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessionDetails();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Payment Successful!</h1>
            {sessionDetails && (
                <div>
                    <p>Your payment has been processed successfully.</p>
                    <p>Amount: ${(sessionDetails.amount_total / 100).toFixed(2)}</p>
                    <p>Email: {sessionDetails.customer_details.email}</p>
                </div>
            )}
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
          margin-bottom: 0.5rem;
        }
        .back-button {
          padding: 10px 20px;
          background-color: #6772e5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
        }
        .back-button:hover {
          background-color: #5469d4;
        }
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #6772e5;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
