import { NextResponse } from "next/server";
import User from "@/models/userModel";
import sendMailer from "@/helpers/mailer";
import connectDB from "@/dbConfig/dbConfig";
connectDB();
export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { email } = await request.json();

    
    // Find the user by email
    const user = await User.findOne({email});
    
    // console.log("resetpassword:", user);
    
    // If user is not found, return a 404 response
    if (!user) {
      return NextResponse.json({
        message: "Sorry, could not find user account",
        success: false
      }, { status: 404 });
    }

    // Generate a reset token or handle password reset logic
    const userId = user._id;
    await sendMailer({ email, emailType: "RESET", userId });

    // Return success response
    return NextResponse.json({
      message: "Password reset link sent successfully",
      success: true
    });

  } catch (err) {
    console.error("Error:", err.message);
    // Return an error response
    return NextResponse.json({
      message: "Internal Server Error",
      success: false
    }, { status: 500 });
  }
}
