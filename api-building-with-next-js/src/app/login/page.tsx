'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login successfully done', response.data);
            router.push('/profile');
        } catch (error: any) {
            console.log('SignUp failed');
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user.email.length && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col justify-center items-center py-2 min-h-screen">
            <h1>{loading ? 'Loading...' : 'Sign Up'}</h1>
            <hr />

            <label htmlFor="email">Email:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <hr />
            <label htmlFor="password">Password:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {buttonDisabled ? 'please fill all fields' : 'Login'}
            </button>
            <Link href="/signup">Don't have an account? Sign Up</Link>
        </div>
    );
}
