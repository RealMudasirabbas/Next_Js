'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setverified] = useState(false);
    const [error, setError] = useState(false);

    const VerifyEmailUser = async () => {
        try {
            await axios.post('/api/verifyemail', token).then((res) => {
                setverified(true);
                setError(false);
            });

            useEffect(() => {
                setError(false);
                const urlToken = window.location.search.split('=')[1];
                setToken(urlToken || '');
            }, []);

            useEffect(() => {
                setError(false);
                if (token.length > 0) {
                    VerifyEmailUser();
                }
            }, [token]);
        } catch (error: any) {
            setError(true);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center py-2 min-h-screen">
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>
                {token ? `${token}` : 'no token'}
            </h2>
            {verified && (
                <div>
                    <h1>Verified</h1>
                    <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h1>Error</h1>
                    
                </div>
            )}
        </div>
    );
}
