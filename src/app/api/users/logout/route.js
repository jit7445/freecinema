import { NextResponse } from "next/server";

export  async function GET() {
  try {
    // Delete the session cookie
    const response = NextResponse.json({ message: 'Logged out successfully',
      success:true
     });
     response.cookies.set("token"," ",{
      httpOnly:true,
      expires:new Date(0)

     })
     
    

    // Return the response
    return response;
  } catch (err) {
    // Return an error response if something goes wrong
    return NextResponse.json({
      error: err.message
    }, {
      status: 500
    });
  }
}