'use client'
import { IconFidgetSpinner } from "@tabler/icons-react";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import PricingTable from "./components/PricingTable";

export default function Home() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <>
        <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto'/>
      </>
    )
  }

  return (
    <>
      <Header page="home" />
      <main>
      <HeroSection />
      <Products />
      <PricingTable/>
      <Contact />
      </main>
      <Footer />
    </>
  );
}
