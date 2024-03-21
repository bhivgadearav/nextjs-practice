"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { set } from "mongoose";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.href.split("token=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return(
        <div>
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    <span className="inline-block bg-gray-200 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                    </span>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Verify Email</h2>
                <p className="text-gray-600 text-center mb-6">{token ? `${token}` : "no token"}</p>
                {
                    verified && 
                    <p className="text-gray-600 text-center mb-6">Email Verification Successfull</p>
                }
                {
                    error && 
                    <p className="text-gray-600 text-center mb-6">Oops! Something went wrong</p>
                }
            </div>
        </div>
    </div>
    )
}