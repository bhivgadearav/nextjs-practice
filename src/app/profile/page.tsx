"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [userData, setUserData] = React.useState("nothing");
    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);
            setUserData(res.data.data._id);
        } catch (error: any) {
            toast.error(error);
        }
    }
    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex justify-center mb-6">
                        <span className="inline-block bg-gray-200 rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                        </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-center mb-4">WELCOME!</h2>
                    <p className="text-gray-600 text-center mb-6">Here is your profile</p>
                    <p className="text-gray-600 text-xs text-center mt-4">
                        {userData === "nothing" ? "Loading..." : 
                        <Link href={`/profile/${userData}`}>{userData}</Link>}
                    </p>
                    <button 
                    onClick={async () => {
                        try {
                            await axios.get("/api/users/logout")
                            router.push("/login")
                        } catch (error: any) {
                            toast.error(error)
                        }
                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Logout
                    </button>
                    <button 
                    onClick={getUserDetails}
                    className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}