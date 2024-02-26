import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../db/dbConfig';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 422 });
        }


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 422 });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user.id, emai: email }, 'secret', { expiresIn: '1h' });
        return NextResponse.json({
            message: 'User signed in successfully',
            userId: user.id, token: token, email_verified: user.email_verified, email: email, name: user.name
        }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json({
            message: 'Internal server error',
            errors: err.message || 'Unknown error',
        }, {
            status: 500
        });
    }
}

async function getUserByEmail(email) {
    try {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (result.length === 0) {
            return null; // User not found
        }

        const user = result[0];
        return user;
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw new Error('Internal server error');
    }
}
