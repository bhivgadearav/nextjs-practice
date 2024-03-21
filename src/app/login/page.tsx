"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    });
    const router = useRouter();
    const [disabled, setDisabled] = React.useState(false);
    React.useEffect(() => {
        if (userData.email.length > 0 && userData.password.length > 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [userData])
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.push("/profile");
            if (!userData) {
                return;
            }
            console.log(userData);
            const res = await axios.post("/api/users/login", {
                email: userData.email,
                password: userData.password
            });
            console.log("Login success", res.data);
            toast.success("Login success");
        } catch (error: any) {
            toast.error(error);
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
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
                    <h2 className="text-2xl font-semibold text-center mb-4">Login to your account</h2>
                    <p className="text-gray-600 text-center mb-6">Enter your details to login</p>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                            <input 
                            type="email" 
                            id="email" 
                            name="email"
                            onChange={onChange}
                            value={userData.email}
                            className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
                            required placeholder="hello@alignui.com"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                            <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={onChange}
                            value={userData.password}
                            className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
                            required placeholder="••••••••"/>
                            <p className="text-gray-600 text-xs mt-1">Enter your details correctly.</p>
                        </div>
                        <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            {!disabled ? "Waiting..."  : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}