"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error:unknown) {
            console.log(error,"error ocurred");
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-8 m-4">
                <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                <hr className="my-4 border-gray-300" />
                <p className="text-gray-700">Profile page</p>
                <h2 className="p-1 rounded bg-green-500 text-white">
                    {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                </h2>
                <hr className="my-4 border-gray-300" />
                <button
                    onClick={logout}
                    className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
                <button
                    onClick={getUserDetails}
                    className="bg-green-800 m-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Get User Details
                </button>
            </div>
        </div>
    );
}
