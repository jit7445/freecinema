import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDatafromToken';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

connectDB();

export async function GET(request) {
  try {
  
    const userId = await getDataFromToken(request);
    console.log("userId:", userId);

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

   
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
