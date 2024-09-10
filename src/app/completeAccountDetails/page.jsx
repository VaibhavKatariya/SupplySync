'use client'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import "./account.modules.css"
import { IconFidgetSpinner } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

const AccountDetails = () => {

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [uid, setUid] = useState()
    const router = useRouter();

    useEffect(()=>{
        if(user){
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


    const handleProfileUpdate = async () => {
        if(name === "" || phone === "" || address === "") {alert("fields cant be empty");return}
        try {
            await setDoc(doc(db, 'users', uid), {
                phone: phone,
                address: address,
            });
            console.log('User info stored successfully!');
        } catch (error) {
            console.error('Error storing user info:', error);
        }

        
        updateProfile(user, {
            displayName: name.charAt(0).toUpperCase() + name.slice(1),
        }).then(() => {
            console.log("Profile updated successfully!");
            storeAdditionalUserInfo
            // router.push("/dashboard")
        }).catch((error) => {
            console.error("Error updating profile:", error.message);
        });
    }

    const storeAdditionalUserInfo = async () => {
        
    };

    return (
        <>
            <Header button="home" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h1 className="text-white text-2xl mb-5">complete account details</h1>
                    <input
                        required
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={4}
                    />
                    <span className='error-message name-error-message'>name must be atleast 4 char long</span>
                    <input
                        required
                        type="number"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="phone-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={10} maxLength={10}
                    />
                    <span className='error-message phone-error-message'>Phone number must contain 10 character. Do not include country code</span>

                    <input
                        required
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="phone-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                        minLength={5}
                    />
                    <span className='error-message phone-error-message'>address must contain minimum of 5 characters</span>

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