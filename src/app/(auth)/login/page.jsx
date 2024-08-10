'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const [buttonDisable, setbuttonDisable] = useState(false);
  const[loading,setloading]=useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post('/api/users/login', user);
      // Handle successful login

      setloading(false)
      toast.success("login success")
      

      // Redirect to a dashboard or home page
      router.push('/');  // Adjust the route as necessary
    } catch (err) {
      setError('Login failed. Please try again.');
      setloading(false)
   
    }
  };


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-md w-full p-8 bg-cyan-50 rounded-lg shadow-lg">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          {loading ? "Processing...." : "Login"}
        </Typography>
        <Typography color="gray" className="text-center font-normal mb-8">
          Nice to meet you! Enter your details to sign in.
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {error && <Typography color="red" className="text-center mb-4">{error}</Typography>}
          <Button type="submit" className="w-full" fullWidth>
            Sign In
          </Button>
          <Link href="/resetpasswordlink" className="text-center block mt-4">Forgot Password</Link>
          <Typography color="gray" className="text-center font-normal mt-8">
            Dont have an account?{" "}
            <Link href="/signup" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}