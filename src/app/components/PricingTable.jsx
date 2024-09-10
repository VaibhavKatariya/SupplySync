import React from 'react'
import { useRouter } from 'next/navigation'

function PricingTable() {
    const router = useRouter()
  return (
    <section className="text-white-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white-900">
        Pricing
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-white-300 flex flex-col relative overflow-hidden">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            START
          </h2>
          <h1 className="text-5xl text-white-900 pb-4 mb-4 border-b border-white-200 leading-none">
            Free
          </h1>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <button onClick={()=>{router.push('/sign-up')}} className="flex items-center mt-auto text-white bg-white-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-white-500 rounded">
            Get started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-auto"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-white-500 mt-3">
            Literally you probably haven&apos;t heard of them jean shorts.
          </p>
        </div>
      </div>
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
            POPULAR
          </span>
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            PRO
          </h2>
          <h1 className="text-5xl text-white-900 leading-none flex items-center pb-4 mb-4 border-b border-white-200">
            <span>$38</span>
            <span className="text-lg ml-1 font-normal text-white-500">/mo</span>
          </h1>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <button onClick={()=>{router.push('/sign-up')}} className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
          Get started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-auto"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-white-500 mt-3">
            Literally you probably haven&apos;t heard of them jean shorts.
          </p>
        </div>
      </div>
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-white-300 flex flex-col relative overflow-hidden">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            BUSINESS
          </h2>
          <h1 className="text-5xl text-white-900 leading-none flex items-center pb-4 mb-4 border-b border-white-200">
            <span>$56</span>
            <span className="text-lg ml-1 font-normal text-white-500">/mo</span>
          </h1>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <button onClick={()=>{router.push('/sign-up')}} className="flex items-center mt-auto text-white bg-white-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-white-500 rounded">
          Get started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-auto"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-white-500 mt-3">
            Literally you probably haven&apos;t heard of them jean shorts.
          </p>
        </div>
      </div>
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-white-300 flex flex-col relative overflow-hidden">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            SPECIAL
          </h2>
          <h1 className="text-5xl text-white-900 leading-none flex items-center pb-4 mb-4 border-b border-white-200">
            <span>$72</span>
            <span className="text-lg ml-1 font-normal text-white-500">/mo</span>
          </h1>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <p className="flex items-center text-white-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-white-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            lorem ipsum
          </p>
          <button onClick={()=>{router.push('/sign-up')}} className="flex items-center mt-auto text-white bg-white-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-white-500 rounded">
          Get started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-auto"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-white-500 mt-3">
            Literally you probably haven&apos;t heard of them jean shorts.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default PricingTable