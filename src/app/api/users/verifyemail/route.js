import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse JSON body from the request
    const { Token } = await request.json();



    // Find the user with the provided token
    const user = await User.findOne({
      verifyToken: Token,
      verifyTokenExpiry: { $gt: Date.now() }
    });

    // If no user is found, return an error response
    if (!user) {
      return new Response("Invalid or expired token", { status: 401 });
    }

   

    // Update user verification status
    user.isVerified = true; // Fixed typo here
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    // Return success response
    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    });

  } catch (err) {
  
    return new Response(err.message, { status: 500 });
  }
}
