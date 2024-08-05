import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("userdata:", { email, password });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: 'User do not exists' }, { status: 400 });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // create token data
    const tokenData={
      id:existingUser._id,
      name:existingUser.name,
      email:existingUser.email

    }
    //create toekn
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn :"1d"  } )
  const response=NextResponse.json({
    message:"successful Login",
    success:true
  })
  response.cookies.set( "token",token,{
    httpOnly:true
  })
  return response

}
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }

}

// Function to generate a token
function generateToken(id) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id }, secret, {
    expiresIn: '1h',
  });
  return token;
}