'use client'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation'
import { IconFidgetSpinner } from '@tabler/icons-react'


function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <>
        <Header page="home" />
        <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
        <Footer />
      </>
    );
  }

  if (user) {
    return (
      <>
        <Header page="dashboard" />
        
        <Footer />
      </>
    );
  }

  return null;
}

export default Page;
