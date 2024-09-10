'use client'
import Link from "next/link"
import { auth } from "../firebase/config"
import {useAuthState, useSignOut} from "react-firebase-hooks/auth"
import { useRouter } from 'next/navigation'


function Header({ page }) {
    const [user, loading] = useAuthState(auth)
    const [signOut] = useSignOut(auth);
    const router = useRouter();

    const handelSignOut = ()=>{
        signOut();
        router.push("/sign-in")
    }

    return (
        <header className="text-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link legacyBehavior href="/">
                    <a className="flex title-font font-medium items-center text-900 mb-4 md:mb-0">
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M14 20.889L12.777 21.5684C12.4934 21.726 12.3516 21.8047 12.2015 21.8356C12.0685 21.863 11.9315 21.863 11.7986 21.8356C11.6484 21.8047 11.5066 21.726 11.223 21.5684L3.82297 17.4573C3.52346 17.2909 3.37368 17.2077 3.26463 17.0893C3.16816 16.9847 3.09515 16.8606 3.05048 16.7254C3 16.5726 3 16.4013 3 16.0586V7.94153C3 7.59889 3 7.42757 3.05048 7.27477C3.09515 7.13959 3.16816 7.01551 3.26463 6.91082C3.37368 6.79248 3.52345 6.70928 3.82297 6.54288L11.223 2.43177C11.5066 2.27421 11.6484 2.19543 11.7986 2.16454C11.9315 2.13721 12.0685 2.13721 12.2015 2.16454C12.3516 2.19543 12.4934 2.27421 12.777 2.43177L20.177 6.54288C20.4766 6.70928 20.6263 6.79248 20.7354 6.91082C20.8318 7.01551 20.9049 7.13959 20.9495 7.27477C21 7.42757 21 7.59889 21 7.94153L21 12.5001M7.5 4.50008L16.5 9.50008M16 18.0001L18 20.0001L22 16.0001" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-3 text-xl">SupplySync</span>
                    </a>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {page === "home" || page === "about" ? (<div><Link legacyBehavior href="/about"><a className="mr-5 hover:text-900 cursor-pointer">About US</a></Link>
                        <Link legacyBehavior href="/#contact"><a className="mr-5 hover:text-900 cursor-pointer">Contact US</a></Link></div>) : ""}
                        {page === "dashboard" ? (<Link legacyBehavior href="/accountDetails"><a className="mr-5 hover:text-900 cursor-pointer">Account</a></Link>) : ""}
                        {page === "accountDetails" ? (<Link legacyBehavior href="/dashboard"><a className="mr-5 hover:text-900 cursor-pointer">Dashboard</a></Link>) : ""}
                </nav>
                {page === "logout" || user ? (
                    <button onClick={handelSignOut} className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0 mr-2">LogOut
                    </button>
                ) : ""}

                {page === "home" ? (<Link href={user ? "/dashboard" :"/sign-in"} passHref>
                    <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">{user ? "dashboard" :"sign-in"}
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </Link>) : (<Link href="/" passHref>
                    <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">Home
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </Link>)}

            </div>
        </header>
    )
}

export default Header