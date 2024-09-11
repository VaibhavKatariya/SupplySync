'use client'
import { useState, useEffect } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./signup.modules.css";
import { SignedOut } from '../components/signedOut';
import { IconFidgetSpinner, IconEye, IconEyeOff } from '@tabler/icons-react';

const errorMessages = {
  'auth/email-already-in-use': 'An account already exists with this email address.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/weak-password': 'The password is too weak.',
  'auth/operation-not-allowed': 'Email/Password accounts are not enabled.'
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState();
  const [createUserWithEmailAndPassword, user, loading, firebaseError] = useCreateUserWithEmailAndPassword(auth);
  const [stateUser, stateLoading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (stateUser) {
      router.push('/dashboard'); // Redirect to /dashboard if user is authenticated
    }
  }, [stateUser, router]);

  const isEmailValid = email.endsWith('@gmail.com')  || email.endsWith('@kaily.in');
  const isPasswordValid = password.length >= 6 && password.length <= 20;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!isEmailValid) {
      setError('Please use a valid @gmail.com or @kaily.in email address.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be between 6 and 20 characters.');
      return;
    }

    await createUserWithEmailAndPassword(email, password);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (user) {
      router.push('/completeAccountDetails');
    }
  }, [user]);

  useEffect(() => {
    if (firebaseError) {
      const errorMessage = errorMessages[firebaseError.code] || 'An unexpected error occurred.';
      setError(errorMessage);
    }
  }, [firebaseError]);

  if (stateLoading || loading) {
    return (
      <>
        <Header button="home" />
        <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header button="home" />
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
            <h1 className="text-white text-2xl mb-5">Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
              />
              <div className="relative w-full mb-4">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                  minLength={6} maxLength={12}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </span>
              </div>
              <button
                type='submit'
                className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                disabled={loading}
              >
                {loading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : 'Sign Up'}
              </button>
            </form>
            <div className='p-2 text-center'>
              Already have an Account?
              <Link legacyBehavior href="/sign-in">
                <p className='cursor-pointer text-blue-300'> sign in</p>
              </Link>
            </div>
            <p className='p-2 text-red-500'>{error}</p>
          </div>
        </div>
      </SignedOut>
      <Footer />
    </>
  );
};

export default SignUp;
