'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { IconFidgetSpinner } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const ForgotPassword = () => {
    const [stateUser, stateLoading] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (stateUser) {
          router.push('/accountDetails');
        }
      }, [stateUser, router]);

    const validateEmail = (email) => {
        // Simple email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    if (stateLoading) {
        return (
          <>
            <Header button="home" />
            <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
            <Footer />
          </>
        );
      }

    const handleSendResetEmail = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent successfully. Please check your inbox.");
            setTimeout(() => router.push("/sign-in"), 5000); // Redirect to sign-in page after 5 seconds
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError("The email address is badly formatted.");
            } else if (error.code === 'auth/user-not-found') {
                setError("There is no user corresponding to this email.");
            } else {
                setError("Error sending password reset email. Please try again.");
            }
            console.error("Error sending password reset email:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header button="home" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h1 className="text-white text-2xl mb-5">Forgot Password</h1>
                    <p className="text-gray-400 mb-4">Enter your email address to receive a password reset link.</p>
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form>
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        onClick={handleSendResetEmail}
                        className={`w-full p-3 ${loading ? 'bg-gray-500' : 'bg-indigo-600'} rounded text-white hover:bg-indigo-500`}
                        disabled={loading}
                    >
                        {loading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : 'Send Reset Link'}
                    </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForgotPassword;
