"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { apiClient } from '../apiClient'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { setCookie } from 'cookies-next'

function Signup() {
    const router = useRouter();
    const [confirmedPassError, setConfirmPassError] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('/sign-up', formData).then((res) => {
            sessionStorage.setItem('email', res.data?.user?.email)
            setCookie('email', res.data?.user?.email)
            setCookie('isLoggedIn', true)
            setCookie('token', res.data?.token)
            setCookie('isEmailVerify', res.data?.user?.email_verified)
            toast.success(res.data?.message)
            window.location.href = '/email-verification'
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Network errors")
        })

    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 ">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="eg: Jhon"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={(e) => {
                                    if (e.target.value === formData.password) {
                                        setFormData({ ...formData, confirm_password: e.target.value })
                                        setConfirmPassError(false)
                                    } else setConfirmPassError(true)
                                }}
                            />
                            {confirmedPassError && <p className="text-red-500 ">Your confirm password is not matched with your password!</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={confirmedPassError}
                            className="w-full bg-gray-950 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Sign up
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have account?{" "}
                            <Link
                                href="sign-in"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup
