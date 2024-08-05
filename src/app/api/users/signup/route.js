import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import sendMailer from '@/helpers/mailer'
connectDB();

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    console.log("userdata:", { name, email, password });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    //send verification 
      await sendMailer({email:email,emailType:"VERIFY",userId:savedUser._id});

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: savedUser
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
