import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../db/dbConfig';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password } = body;
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        const hashPass = await bcrypt.hash(password, 8);

        const userExists = await existUser(email);

        if (userExists) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 422 });
        }

        const userId = await insertUser(name, email, hashPass, verificationCode);

        if (userId) {
            // Send a verification email
            const transporter = nodemailer.createTransport({
                host: "203.130.2.136",
                port: 25,
                auth: {
                    user: process.env.SERVERMAILER,
                    pass: process.env.SERVERPASSWORD,
                },
            });

            const emailContent = `<p>Click the following link to verify your email:</p>
                <a href="http://localhost:9999/email-verification?email=${email}" target="_blank">Verify Email</a>`;

            const mailData = {
                from: 'nadir_ali@gmail.com', // Update with a valid email address
                to: email,
                subject: `New User Signup: ${name}`,
                html: emailContent,
            };

            await transporter.sendMail(mailData);

            const newToken = jwt.sign({ email: email }, 'secret', { expiresIn: '1h' });
            return NextResponse.json({
                message: 'User has been created',
                token: newToken,
                user: { id: userId, name: name, email: email, email_verified: 0 }
            },
                { status: 200 }
            );
        }
    } catch (err) {
        console.error('Error in POST:', err);
        return NextResponse.json({
            message: 'Internal server error',
            errors: err.message || 'Unknown error',
        }, {
            status: 500
        });
    }
}

async function existUser(email) {
    try {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);
        return result.length > 0; // Return true if user exists, false otherwise
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw new Error('Internal server error');
    }
}

async function insertUser(name, email, hashedPassword, verificationCode) {
    try {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            `INSERT INTO users (name, email, password, email_verification_code) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, verificationCode]
        );

        if (result.affectedRows === 1) {
            return result.insertId; // Return the inserted user ID
        } else {
            throw new Error('User insertion failed');
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        throw new Error('Internal server error');
    }
}
