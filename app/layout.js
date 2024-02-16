import { Inter } from 'next/font/google'
import './globals.css'
import HeaderComponent from './header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="h-screen flex flex-col">
                    <HeaderComponent />
                    <div className="container mx-auto  max-w-screen-xl  mt-5">
                        {children}
                    </div>
                </div>

                <Toaster />
            </body>
        </html>
    )
}
