import { useState } from "react";

export default function OtpVerification() {
    const [input, setInput] = useState({
        email: "",
        otp: "",
    });
    const [success, setSuccess] = useState<boolean | null>(null);

    const [otpSent, setOtpSent] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const handleSendOtp = async (e:any) => {
        e.preventDefault();
        try {
            // Send OTP request to the backend
            console.log('Sending OTP to:', input.email);
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: input.email }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('OTP sent successfully:', data);
                setOtpSent(true); // Show OTP field only after it's sent
            } else {
                console.error('Failed to send OTP:', data.message);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setSuccess(false);
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            // Verify OTP request to the backend
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('OTP verified successfully:', data);
                setSuccess(true);
            } else {
                console.error('OTP verification failed:', data.message);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setSuccess(false);
        }
    };

    if(success === true) {
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }
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
                            className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setInput({...input, email: e.target.value})} 
                            value={input.email}
                            required
                        />
                        {!otpSent && (
                            <div className="">
                                <button 
                                    className="w-full px-3 py-2 my-2 text-white bg-red-500 rounded-md"
                                    onClick={handleSendOtp}
                                >
                                    Send OTP
                                </button>
                            </div>
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
                                className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => setInput({...input, otp: e.target.value})} 
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
