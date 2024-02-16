import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../db/dbConfig';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, code } = body

        const user = await getUser(email)
        if (!user) {
            return NextResponse.json({ message: 'Email not found!' }, { status: 422 });
        }
        // for already verified
        if (user.email_verified) {
            return NextResponse.json({ message: 'Your email already verified!' }, { status: 201 });
        }

        if (user.email_verification_code == code) {
            const verified = await updateUser(email)
            if (verified) {
                return NextResponse.json({ message: 'Your email has been verified!', name: user.name, email: user.email }, { status: 200 });
            }
        }
        return NextResponse.json({ message: 'Your email verification code is invalid!' }, { status: 422 });


    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

async function getUser(email) {
    try {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (result.length === 0) {
            return null; // User not found
        }

        const user = result[0]; // Get the user object from the result
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        throw new Error('Internal server error');
    }
}

async function updateUser(email) {
    try {
        const connection = await connectToDatabase();

        // Update the email_verified column
        const [updateResult] = await connection.execute(`UPDATE users SET email_verified = 1 WHERE email = ?`, [email]);

        if (updateResult.affectedRows === 0) {
            return null; // User not found or email_verified already set to 1
        }

        // Fetch the updated user
        const [selectResult] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (selectResult.length === 0) {
            return null; // User not found (should not happen after a successful update)
        }

        const updatedUser = selectResult[0]; // Get the updated user object
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Internal server error');
    }
}


