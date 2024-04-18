'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState('nothing');

    const getUserDetails = async () => {
        try {
            const response = await axios.post('/api/users/me');
            console.log(response.data.data._id);
            setData(response.data.data._id);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <h2>
                {data === 'nothing' ? (
                    'nothing'
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Logout
            </button>
            <button className='bg-green-500 hover:bg-green-700 mt-4 text-white font-bold py-2 px-4 rounded'
            onClick={getUserDetails}>
            Get User Details
            </button>
        </div>
    );
}
