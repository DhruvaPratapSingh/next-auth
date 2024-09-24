"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Circles } from 'react-loader-spinner'; // Importing a loading spinner

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success(
                <div className="flex items-center">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Signup successful! ✅
                </div>
            );
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed");
            toast.error(
                <div className="flex items-center">
                    <FaExclamationCircle className="mr-2 text-red-500" />
                    Signup failed. Please check your credentials ❌
                </div>
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-8 m-4 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-center">{loading ? "Processing..." : "Sign Up"}</h1>
                <hr className="my-4 border-gray-300" />

                {/* Input Fields */}
                <div className="mb-4">
                    <label htmlFor="username" className="text-gray-700">Username</label>
                    <input
                        className='p-2 rounded-md text-blue-800 text-lg font-medium border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-full'
                        type="text"
                        id='username'
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder='Username'
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input
                        className='p-2 rounded-md text-blue-800 text-lg font-medium border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-full'
                        type="text"
                        id='email'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder='Email'
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700">Password</label>
                    <input
                        className='p-2 rounded-md text-blue-800 text-lg font-medium border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-full'
                        type="password"
                        id='password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder='Password'
                    />
                </div>

                {/* Signup Button */}
                <button
                    className={`bg-blue-600 flex items-center justify-center p-2 rounded-md mt-4 text-white w-full ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={onSignup}
                    disabled={buttonDisabled}
                >
                    {loading ? <Circles height="25" width="25" color="#fff" ariaLabel="loading" /> : (buttonDisabled ? "Fill the form" : "Sign Up")}
                </button>

                {/* Link to Login Page */}
                <Link className='bg-green-400 rounded-md p-2 mt-3 text-white text-center w-full block' href="/login">
                    Visit Login Page
                </Link>
            </div>
        </div>
    );
}

export default Page;
