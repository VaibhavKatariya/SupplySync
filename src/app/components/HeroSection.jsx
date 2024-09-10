'use client'
import React from 'react'
import Image from 'next/image'
import heroImage from "@/app/assets/hero.jpeg"
import Link from 'next/link'
import { SignedOut } from './signedOut'
import { SignedIn } from './signedIn'

function HeroSecction() {
    return (
        <section className="text-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-900">Streamline Your Inventory
                        <br className="hidden lg:inline-block" /> with Our Advanced System
                    </h1>
                    <p className="mb-8 leading-relaxed">Efficiently manage your stock with our cutting-edge inventory system. Track products, monitor stock levels, and optimize your supply chain with ease. Simplify your operations and stay ahead of the curve with real-time updates and intuitive controls.</p>
                    <div className="flex justify-center">
                        <SignedOut>
                        <Link legacyBehavior href="/sign-up">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button></Link>
                        <Link legacyBehavior href="/dashboard"><button className="ml-4 inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">Dashboard</button></Link>
                        </SignedOut>
                        <SignedIn>
                        <Link legacyBehavior href="/dashboard">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go to Dashboard</button></Link>
                        </SignedIn>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image
                        src={heroImage}
                        width={720}
                        height={600}
                        alt="Inventory System"
                        className="object-cover object-center rounded"
                    />
                </div>
            </div>
        </section>

    )
}

export default HeroSecction