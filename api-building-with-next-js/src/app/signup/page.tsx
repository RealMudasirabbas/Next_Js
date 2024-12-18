'use client';
import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('Singup successfully done', response.data);
            router.push('/login');
        } catch (error: any) {
            console.log('SignUp failed');
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (
            user.username.length &&
            user.email.length &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col justify-center items-center py-2 min-h-screen">
            <h1>{loading ? 'Loading...' : 'Sign Up'}</h1>
            <hr />
            <label htmlFor="username">Username:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
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
            <button onClick={onSignUp}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                {buttonDisabled ? "please fill all fields" : "Sign Up"}
            </button>
            <Link href="/login">Already have an account? Visit Login page</Link>
        </div>
    );
}
