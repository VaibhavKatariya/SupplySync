'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { updateProfile, deleteUser, updatePassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import "./account.modules.css";
import { IconFidgetSpinner, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import Link from 'next/link';

const errorMessages = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Wrong password.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/email-already-in-use': 'Email already in use.',
    'auth/operation-not-allowed': 'Operation not allowed.',
    'auth/requires-recent-login': 'Please reauthenticate and try again.',
    'auth/credential-already-in-use': 'Credential is already in use.',
    'auth/invalid-credential': 'Invalid credentials provided.',
    'auth/popup-closed-by-user': 'Popup closed by user.',
    // Add more error codes and messages as needed
};


const AccountDetails = () => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [initialName, setInitialName] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [error, setError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setEmail(user.email || "");
            setInitialName(user.displayName || "");
        }
    }, [user]);

    useEffect(() => {
        setHasChanges(name !== initialName);
    }, [name, initialName]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/sign-in");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <>
                <Header />
                <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
                <Footer />
            </>
        );
    }

    const handleProfileUpdate = async () => {
        try {
            await updateProfile(user, {
                displayName: name,
            });
            alert("Profile updated successfully");
            router.push("/dashboard");
            setInitialName(name); // Update initialName to the new name
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (user) {
            setDeleteLoading(true);
            try {
                const db = getFirestore(); // Initialize Firestore
                const userId = user.uid;
    
                // Reference to the user's products collection
                const productsRef = collection(db, `products/${userId}/userProducts`);
                const productsSnapshot = await getDocs(productsRef);
    
                // Delete all products documents in the user's collection
                const deletePromises = productsSnapshot.docs.map((productDoc) =>
                    deleteDoc(doc(db, `products/${userId}/userProducts`, productDoc.id))
                );
    
                // Delete the user document from the 'users' collection (if applicable)
                const userDocRef = doc(db, 'users', userId);
                deletePromises.push(deleteDoc(userDocRef));
    
                // Wait for all deletions to complete
                await Promise.all(deletePromises);
    
                // Delete Firebase user account
                await deleteUser(user);
                alert("Account and data deleted successfully");
                router.push("/sign-in");
            } catch (error) {
                console.error("Error deleting account and data:", error.message);
                setDeleteLoading(false);
            }
        }
    };


    const handleResetPassword = async () => {
        setError('');
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            return;
        }

        try {
            await updatePassword(user, newPassword); // Update with user
            alert("Password updated successfully");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setIsResetPasswordOpen(false);
        } catch (error) {
            const errorCode = error.code;
            const message = errorMessages[errorCode] || 'Error resetting password.';
            console.error('Error resetting password:', message);
            setError(message);
        }
    };


    return (
        <>
            <Header button="accountDetail" />
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
                        minLength={4}
                    />
                    <span className='error-message name-error-message'>Name must be at least 4 characters long</span>

                    <input
                        disabled
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="cursor-not-allowed name-input w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />

                    {auth?.currentUser?.emailVerified ? (<nav className='text-green-500'>Email is verified</nav>) : (<nav className='text-red-500'>Email is not verified <Link href="/verifyEmail" className='underline'>Verify now</Link> </nav>)}

                    {hasChanges && (
                        <button
                            onClick={handleProfileUpdate}
                            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                        >
                            Apply Changes
                        </button>
                    )}

                    <button
                        onClick={() => setIsResetPasswordOpen(true)}
                        className="w-full p-3 bg-yellow-600 rounded text-white hover:bg-yellow-500 mt-4"
                    >
                        Reset Password
                    </button>

                    <button
                        onClick={() => setIsConfirmDeleteOpen(true)}
                        className="w-full p-3 bg-red-600 rounded text-white hover:bg-red-500 mt-4"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Reset Password Modal */}
            {isResetPasswordOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <IconEyeOff className='text-white' /> : <IconEye className='text-white' />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <IconEyeOff className='text-white' /> : <IconEye className='text-white' />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmNewPassword ? 'text' : 'password'}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    >
                                        {showConfirmNewPassword ? <IconEyeOff className='text-white' /> : <IconEye className='text-white' />}
                                    </button>
                                </div>
                            </div>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setIsResetPasswordOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleResetPassword}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h2>
                        <p className="text-white mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setIsConfirmDeleteOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleDeleteAccount}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : 'Delete Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default AccountDetails;
