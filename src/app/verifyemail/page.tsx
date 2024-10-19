"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const verifyUserEmail = useCallback(async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: unknown) {
            setError(true);
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred');
            }
        }   
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-8 m-4 max-w-md w-full text-center">
                <h1 className="text-4xl mb-4">Verify Email</h1>
                <h2 className={`p-4 text-xl ${token ? "bg-orange-500 text-white text-wrap" : "text-black"}`}>
                    {token ? token : "No token provided"}
                </h2>

                {verified && (
                    <div className="mt-4">
                        <h2 className="text-2xl text-green-600">Email Verified 🎉</h2>
                        <Link href="/login" className="text-blue-500 hover:underline mt-2">
                            Login
                        </Link>
                    </div>
                )}
                
                {error && (
                    <div className="mt-4">
                        <h2 className="text-2xl bg-red-500 text-white p-2 rounded">Error verifying email ❌</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
