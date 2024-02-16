"use client"
import React, { useState } from 'react'
import { apiClient } from '../apiClient'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getCookie, setCookie } from 'cookies-next';


function EmailVerification() {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState(null)

    const handleVerification = (e) => {
        e.preventDefault()
        const email = getCookie('email')
        apiClient.post('/email-verification', { email: email, code: verificationCode }).then((res) => {
            setCookie('isEmailVerify', 1)
            toast.success(res.data?.message)
            router.push('/home')
        }).catch((err) => toast.error(err.response?.data?.message || "Network errors"))

    }

    return (
        <div className=" min-w-screen  bg-grey-lighter py-5 px-4">
            <div className="mail__wrapper max-w-md mx-auto">
                <div className="mail__content bg-white p-8 shadow-md">
                    <div className="content__header text-center tracking-wide border-b">
                        <h1 className="text-3xl h-20 flex items-center justify-center">
                            E-mail Confirmation
                        </h1>
                    </div>
                    <div className="content__body py-8">
                        <form onSubmit={handleVerification}>
                            <p>
                                Hey, <br />
                                <br />
                                It looks like you just signed up for The App, that’s awesome! Can we
                                ask you for email confirmation? Just click the button bellow.
                            </p>
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 p-4  mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your verification code."
                                required
                                onChange={(e) => setVerificationCode(e.target.value)}

                            />
                            <button type="submit" className="bg-slate-950 text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 ">
                                CONFIRM EMAIL ADRESS
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default EmailVerification