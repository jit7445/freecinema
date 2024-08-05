'use client';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSearchParams,useRouter } from 'next/navigation'

import toast from 'react-hot-toast';
import axios from "axios";

export default function NewPassword() {
  
  const [formdata, setFormData] = useState({
    Token: ""
  })
  const searchParams = useSearchParams()
  const route=useRouter()

  
  const token = searchParams.get('token') 
  console.log("token from url:", token);
formdata.Token=token

  const handleContinue = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Example API call to update the password
      const response =await axios.post('/api/users/verifyemail',formdata);
      console.log("resopone:",response)
      route.push('/');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <Card color="transparent" shadow={false} className="w-full max-w-md mx-auto -mt-32 p-6 border border-gray-200 rounded-lg bg-white">
      <Typography variant="h4" color="blue-gray" className="text-center mb-6">
       Verify Email
      </Typography>
     
      <form className="mt-8 mb-2 w-full" onSubmit={handleContinue}>
       
        <Button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white" fullWidth>
          Continue
        </Button>
      </form>
    </Card>
    </div>
  );
}