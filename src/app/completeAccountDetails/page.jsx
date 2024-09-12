'use client'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import "./account.modules.css";
import { IconFidgetSpinner } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const AccountDetails = () => {

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    const [error, setError] = useState(""); // State to track errors
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUid(user.uid);
        }
    }, [user]);

    if (loading) {
        return (
            <>
                <Header />
                <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
                <Footer />
            </>
        );
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        // Validate name input
        if (name.trim() === "") {
            setError("Name cannot be empty");
            return;
        }
        if (name.trim().length < 5) {
            setError("Name must be at least 5 characters long");
            return;
        }

        // If validation passes, update the profile
        try {
            await updateProfile(user, {
                displayName: name.charAt(0).toUpperCase() + name.slice(1),
            });
            console.log("Profile updated successfully!");
            router.push('/verifyEmail');
        } catch (error) {
            console.error("Error updating profile:", error.message);
            setError("Error updating profile, please try again");
        }
    };

    return (
        <>
            <Header button="home" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <p className="text-base text-white text-2xl mb-5">
                        What should we call you? <br /> Definitely not <em>&quot;{user?.email}&quot;</em>, right? :)
                    </p>
                    <form onSubmit={handleProfileUpdate}>
                        <input
                            required
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(""); // Clear error on input change
                            }}
                            className="name-input w-full p-3 mb-2 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                            minLength={4}
                        />
                        <nav className='error-message pb-2 text-red-500 test-sm'>name should have min 4 chars</nav>
                        {error && <span className='error-message text-red-500 mb-4 block'>{error}</span>}
                        <button
                            type="submit"
                            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                        >
                            Complete Profile
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AccountDetails;
