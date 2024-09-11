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
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setEmail(user.email || "")
        }else{
            router.push("/sign-in")
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


    const handleProfileUpdate = () => {
        updateProfile(user, {
            displayName: name,
        }).then(() => {
            console.log("Profile updated successfully!");
            route
        }).catch((error) => {
            console.error("Error updating profile:", error.message);
        });
    }

    return (
        <>
            <Header button="`accountDetail`" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h1 className="text-white text-2xl mb-5">Account</h1>
                    <input
                        required
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={5}
                    />
                    <span className='error-message name-error-message'>name must be atleast 5 char long</span>

                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="name-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={5} maxLength={15}
                    />
                    <span className='error-message name-error-message'>name must be atleast 5 char long</span>

                    {/* <input
                        required
                        type="number"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="phone-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={10} maxLength={10}
                    />
                    <span className='error-message phone-error-message'>Phone number must contain 10 character. Do not include country code</span> */}
                    <button
                        onClick={handleProfileUpdate}
                        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"        >
                        Finish
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AccountDetails;