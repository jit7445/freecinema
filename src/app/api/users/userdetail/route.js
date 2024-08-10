import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDatafromToken';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDB();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);


    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated', success: false }, { status: 401 });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User found',
      data: user,
      success: true,
    });
  } catch (err) {

    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}