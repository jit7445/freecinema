'use client';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import axios from "axios";

export default function NewPassword() {
  
  const [formdata, setFormData] = useState({
    password: "",
    confirmPassword: "",
    Token: ""
  })
  const searchParams = useSearchParams()
  const route = useRouter()

  
  const token = searchParams.get('token') 
  console.log("token from url:", token);
  formdata.Token = token

  const handlePasswordChange = (event) => {
    setFormData({ ...formdata, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setFormData({ ...formdata, confirmPassword: event.target.value });
  };

  const handleContinue = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (formdata.password !== formdata.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Example API call to update the password
      const response = await axios.post('/api/users/newpassword', formdata)
      console.log("response:", response);
      route.push('/login');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating password');
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <Card color="transparent" shadow={false} className="w-full max-w-md p-6 border border-gray-200 rounded-lg bg-cyan-50">
        <Typography variant="h4" color="blue-gray" className="text-center mb-6">
          Enter New Password
        </Typography>
     
        <form className="mt-8 mb-2 w-full" onSubmit={handleContinue}>
          <div className="mb-4 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formdata.password}
              onChange={handlePasswordChange}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formdata.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white" fullWidth>
            Continue
          </Button>
        </form>
      </Card>
    </div>
  );
}