'use client'
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { SignedOut } from '../components/signedOut';
import { IconFidgetSpinner, IconEye, IconEyeOff } from '@tabler/icons-react';
import "./signin.modules.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState();
  const [signInWithEmailAndPassword, user, loading, firebaseError] = useSignInWithEmailAndPassword(auth);
  const [stateUser, stateLoading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (stateUser) {
      router.push('/dashboard');
    }
  }, [stateUser, router]);

  const isEmailValid = email.endsWith('@gmail.com');
  const isPasswordValid = password.length >= 6 && password.length <= 20;

  const handleSignIn = async (e) => {
    e.preventDefault();

    setError("");
    if (!isEmailValid) {
      setError('Please use a valid @gmail.com email address.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be between 6 and 20 characters.');
      return;
    }

    const res = await signInWithEmailAndPassword(email, password);
    if (res) {
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    if (firebaseError) {
      const errorMessage = 'Invalid Credentials! Please try again';
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
            <h1 className="text-white text-2xl mb-5">Sign In</h1>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
              />
              <div className="relative w-full mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
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
                {loading ? <IconFidgetSpinner className='animate-spin w-6 h-6 mx-auto' /> : 'Sign In'}
              </button>
            </form>
            <div className='p-2'>
              <Link legacyBehavior href="/sign-up">
                <a>Don&apos;t have an Account? 
                  <span className='text-blue-300 cursor-pointer'> Sign up </span></a>
              </Link> <br />or
              <Link legacyBehavior href="/resetPass">
                <a className='text-blue-300'> Reset your Password</a>
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

export default SignIn;
