'use client';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [formData, setFormData] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  const handleContinue = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!formData) {
      toast.error('Please enter your email');
      return;
    }

    try {
      // Send form data as JSON
      const response = await axios.post('/api/users/resetpasswordlink', { email: formData });
      console.log("response:", response.data);
      toast.success('Password reset link sent successfully');
      router.push('/resetp'); // Redirect to new password page
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending password reset link');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <Card color="transparent" shadow={false} className="w-full max-w-md mx-auto -mt-32 p-6 border border-gray-200 rounded-lg bg-white" >
      <Typography variant="h4" color="blue-gray">
        Reset Password
      </Typography>
     
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleContinue}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={formData}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Continue
        </Button>
      </form>
    </Card>
    </div>
  );
}
