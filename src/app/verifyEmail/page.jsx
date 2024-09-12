'use client';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconFidgetSpinner } from '@tabler/icons-react';
import { sendEmailVerification } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const VerifyEmail = () => {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [stateLoading, setStateLoading] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const [cooldown, setCooldown] = useState(0); // Cooldown timer state
    const [attempts, setAttempts] = useState(0); // Track email send attempts
    const [checkingVerification, setCheckingVerification] = useState(false); // For showing "Checking..." state
    const [error, setError] = useState(null);
    const [user, loading] = useAuthState(auth);

    // If user is not logged in or already verified, redirect
    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        } else if (user?.emailVerified) {
            router.push('/dashboard');
        }
    }, [user, router]);

    // Check if email is already verified on page load
    useEffect(() => {
        const checkEmailVerified = async () => {
            try {
                if (auth.currentUser) {
                    await auth.currentUser.reload(); // Refresh the user's state
                    if (auth?.currentUser.emailVerified) {
                        setIsVerified(true);
                        router.push('/dashboard'); // Redirect if email is verified
                    }
                }
            } catch (error) {
                setError('Error checking verification status. Please try again.');
            } finally {
                setStateLoading(false);
            }
        };

        checkEmailVerified();
    }, [router]);

    // Send the verification email manually
    const sendVerificationEmailHandler = async () => {
        if (attempts >= 2) return; // No more attempts after 2 tries

        try {
            setStateLoading(true);
            await sendEmailVerification(auth.currentUser).then(() => {
                setEmailSent(true);
                setCooldown(59); // Start the 59-second cooldown
                setAttempts((prev) => prev + 1); // Increase email send attempts
            });
        } catch (error) {
            setError('Failed to send verification email. Please try again.');
        } finally {
            setStateLoading(false);
        }
    };

    // Check verification status before the second attempt
    const checkVerificationStatus = async () => {
        try {
            setCheckingVerification(true); // Show "Checking..." on button
            await auth.currentUser.reload(); 
            if (auth.currentUser.emailVerified) {
                setIsVerified(true);
                router.push('/dashboard');
            } else {
                setCooldown(59); // Restart the 59-second cooldown if still not verified
            }
        } catch (error) {
            setError('Error checking verification status. Please try again.');
        } finally {
            setCheckingVerification(false); // Stop showing "Checking..."
        }
    };

    // Cooldown countdown
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer); // Clear the timer on component unmount
        }
    }, [cooldown]);

    // UI for verification page
    if (stateLoading || loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <IconFidgetSpinner className="animate-spin w-12 text-gray-600" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl mb-4">Verify your email to access the dashboard</h1>

            {isVerified ? (
                <h1 className="text-2xl mb-4">Email Verified! Redirecting to the dashboard...</h1>
            ) : (
                <>
                    <p className="mb-4">
                        Please click the button below to send a verification email to your inbox. Once your email is verified, you&apos;ll gain access to the dashboard.
                    </p>

                    {attempts >= 2 ? (
                        <p className="mb-4 text-green-500">Verification email sent! Check your inbox.</p>
                    ) : (
                        <>
                            <button
                                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
                                onClick={
                                    attempts === 1 && cooldown === 0
                                        ? checkVerificationStatus // After 1st attempt, check status before allowing the 2nd attempt
                                        : sendVerificationEmailHandler
                                }
                                disabled={cooldown > 0 || stateLoading || checkingVerification}
                            >
                                {checkingVerification
                                    ? 'Checking...'
                                    : cooldown > 0
                                    ? `Resend in ${cooldown}s`
                                    : 'Send Verification Email'}
                            </button>
                        </>
                    )}

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </>
            )}
        </div>
    );
};

export default VerifyEmail;
