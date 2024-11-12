import { useState, useEffect } from "react";
import axios from "axios";

export default function OtpVerification() {
    const [input, setInput] = useState({
        email: "",
        otp: "",
    });
    const [success, setSuccess] = useState<boolean | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSendOtp = async (e: any) => {
        e.preventDefault();
        try {
            console.log('Sending OTP to:', input.email);

            const response = await axios.post(
                `${API_BASE_URL}/auth/send-otp`,
                { email: input.email },
                { withCredentials: true } // Allow credentials like cookies if needed
            );

            console.log('OTP sent successfully:', response.data);
            setOtpSent(true);
        } catch (error: any) {
            console.error('Error sending OTP:', error.response?.data?.message || error.message);
            setSuccess(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/verify-otp`,
                input,
                { withCredentials: true }
            );

            localStorage.setItem('token', response.data.token);
            console.log('OTP verified successfully:', response.data);
            setSuccess(true);
        } catch (error: any) {
            console.error('OTP verification failed:', error.response?.data?.message || error.message);
            setSuccess(false);
        }
    };

    useEffect(() => {
        if (success === true) {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            className="block w-full px-3 py-2 mt-1 text-sm border rounded-md"
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                            value={input.email}
                            required
                        />
                        {!otpSent && (
                            <button 
                                className="w-full px-3 py-2 my-2 text-white bg-red-500 rounded-md"
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        )}
                    </div>
                    {otpSent && (
                        <div className="mb-5">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                            <input 
                                type="text" 
                                name="otp" 
                                id="otp" 
                                placeholder="Enter OTP" 
                                className="block w-full px-3 py-2 mt-1 text-sm border rounded-md"
                                onChange={(e) => setInput({ ...input, otp: e.target.value })}
                                value={input.otp}
                                required
                            />
                        </div>
                    )}
                    {otpSent && (
                        <button 
                            type="submit" 
                            className="w-full px-3 py-3 text-white bg-green-500 rounded-md"
                        >
                            Submit
                        </button>
                    )}
                    {success === true && <p className="text-green-500 mt-3">OTP verified successfully!</p>}
                    {success === false && <p className="text-red-500 mt-3">OTP verification failed. Try again.</p>}
                </form>
            </div>
        </div>
    );
}
