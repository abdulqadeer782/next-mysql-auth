"use client"
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

function Page() {
    const user = getCookie('username')
    const router = useRouter()

    function deleteAllCookies() {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        router.push('/sign-in')
    }
    return (

        <div className="h-screen flex flex-col">
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link href="/home" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Next Auth
                            </span>
                        </Link>
                        <div className="flex items-center lg:order-2">

                            <button
                                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                onClick={deleteAllCookies}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto  max-w-screen-xl  mt-5">

                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                                Welcome {getCookie('username') || ""}
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default Page