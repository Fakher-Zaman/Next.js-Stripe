'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Cancel() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl mb-4">Payment Cancelled</h1>
            <p className="text-xl mb-4">Your payment was not processed. Please try again.</p>
            <button
                onClick={() => router.push('/')}
                className="py-2 px-4 bg-blue-600 text-white rounded cursor-pointer text-lg hover:bg-blue-500"
            >
                Go to Home
            </button>
        </div>
    );
}
