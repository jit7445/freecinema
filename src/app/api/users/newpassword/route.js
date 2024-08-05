import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();
    
    // Parse JSON body from the request
    const { Token, password } = await request.json();
    console.log("Received forgot password token:", Token,password);
    
    // Find the user with the provided token
    const user = await User.findOne({
      forgotPasswordToken: Token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    });
    
    // If no user is found, return an error response
    if (!user) {
      return new Response("Invalid or expired token", { status: 401 });
    }
    
    console.log("User found:", user);
    
    // Hash the new password
    const salt = await bcryptjs.genSalt(10); // Corrected: use genSalt instead of salt
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    // Update user's password
    user.password = hashedPassword;
    
    // Optionally, clear the forgot password token and expiry
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    
    // Save the user with the new password
    await user.save();
    
    // Return success response
    return NextResponse.json({
      message: "Your password has been changed successfully",
      success: true
    });
  } catch (err) {
    console.error("Error:", err.message);
    return new Response(err.message, { status: 500 });
  }
}