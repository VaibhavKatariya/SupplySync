'use client'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import "./account.modules.css"
import { IconFidgetSpinner } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const AccountDetails = () => {

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("")
    const [uid, setUid] = useState("")
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUid(user.uid)
        }
    }, [user])

    if (loading) {
        return (
            <>
                <Header />
                <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
                <Footer />
            </>
        )
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Fields cannot be empty");
            return;
        }

        updateProfile(user, {
            displayName: name.charAt(0).toUpperCase() + name.slice(1),
        }).then(() => {
            console.log("Profile updated successfully!");
            router.push("/dashboard")
        }).catch((error) => {
            console.error("Error updating profile:", error.message);
        });
    }

    return (
        <>
            <Header button="home" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <p className="text-base text-white text-2xl mb-5">What should we call you? <br /> Definitely not <em>"{user?.email}"</em>, right? :)</p>
                    <form>
                    <input
                        required
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={4}
                    />
                    <span className='error-message name-error-message'>Name must be at least 4 characters long</span>

                    <button
                    type='submit'
                        onClick={handleProfileUpdate}
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
