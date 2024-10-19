"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Circles } from 'react-loader-spinner';
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error) {
            const axiosError = error as AxiosError; 
            alert("Wrong credentials");
            console.log("Login failed", axiosError.message);
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-8 m-4 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4">{loading ? "Processing..." : "Login"}</h1>
                <hr className="my-4 border-gray-300" />

                <label htmlFor="email" className="text-gray-700">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                
                <label htmlFor="password" className="text-gray-700">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "bg-blue-600 text-white"}`}
                >
                    {loading ? <Circles height="25" width="25" color="#fff" ariaLabel="loading" /> : "Login Here"}
                </button>
                
                <Link href="/signup" className="text-blue-500 hover:underline text-center">
                    Visit Signup page
                </Link>
            </div>
        </div>
    );
}
