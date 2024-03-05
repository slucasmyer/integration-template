import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  // const table = url.searchParams.get('table')
  const { email, subject, text } = await request.json();
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP host
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, // Replace with your SMTP username
        pass: process.env.EMAIL_PASSWORD, // Replace with your SMTP password
      },
    });
  
    // Send email
    const info = await transporter.sendMail({
      from: '"Your Service" <no-reply@example.com>', // Replace with your sender address
      to: email, // Receiver email address
      subject: subject, // Subject line
      text: text, // Plain text body
    });
    return NextResponse.json({ success: true, message: 'Data inserted successfully.' });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong. Please see Site Administrator.` }, { status: 400 });
  }

  
}
