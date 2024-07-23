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
            <div className="flex items-center justify-center min-h-screen">
                <div className="border-4 border-blue-600 border-opacity-20 border-t-blue-600 border-t-4 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-2xl mb-4 font-bold">Payment Successful!</h1>
            {sessionDetails && (
                <div className="mb-4">
                    <p className="text-xl mb-2">Your payment has been processed successfully.</p>
                    <p className="text-lg mb-2">Amount: ${(sessionDetails.amount_total / 100).toFixed(2)}</p>
                    <p className="text-lg">Email: {sessionDetails.customer_details.email}</p>
                </div>
            )}
            <button
                onClick={() => router.push('/')}
                className="py-2 px-4 bg-blue-600 text-white rounded cursor-pointer text-lg hover:bg-blue-500"
            >
                Go to Home
            </button>
        </div>
    );
}
