import { NextResponse } from 'next/server';

export default function middleware(req) {

    const isLoggedIn = req.cookies.get("isLoggedIn");
    const isEmailVerify = req.cookies.get("isEmailVerify");
    const url = req.url;

    if (isLoggedIn?.value) {
        // Redirect logic based on session status
        if (isEmailVerify?.value == 1 && url.includes('/email-verification')) {
            return NextResponse.redirect('http://localhost:9999/home');
        } else if (isEmailVerify?.value == 0 && url.includes('/home')) {
            return NextResponse.redirect('http://localhost:9999/email-verification');
        } else if (url === 'http://localhost:9999/sign-up' || url === 'http://localhost:9999/sign-in') {
            return NextResponse.redirect('http://localhost:9999/home');
        }
    }

    if (!isLoggedIn?.value) {
        if (url.includes('/email-verification') || url.includes('/home')) {
            return NextResponse.redirect('http://localhost:9999/sign-in');
        }
    }

}

