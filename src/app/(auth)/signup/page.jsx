"use client";
import Link from "next/link";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function Singup() {
  const router = useRouter();
  const [buttonDisable, setbuttonDisable] = useState(false);
  const[loading,setloading]=useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [user.name, user.email, user.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await axios.post("/api/users/signup", user);
      // Handle successful login (e.g., redirect to dashboard)

      router.push('/afterlinksend')
      setloading(false);
    } catch (err) {
      setError("Signup failed. Please try again.");
      toast.error(err.meassage);

      setloading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen mt-4 ">
    <Card color="transparent" shadow={false} className="max-w-md w-full p-8 bg-cyan-50 rounded-lg shadow-lg ">
      <Typography variant="h4" color="blue-gray">
       {loading? "processing..." :"singup"}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-black"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
        
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="!border-t-blue-gray-200  text-black focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-black"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        {error && (
          <Typography color="red" className="mt-2 text-center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          className="mt-6"
          fullWidth
          disabled={buttonDisable}
        >
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
   </div>
  );
}
