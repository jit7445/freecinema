'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@material-tailwind/react';
const VerifyEmail = () => {
  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded-lg bg-cyan-50">
      <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
          Email  Verification
        </Typography>
        <Typography className="text-center text-black">Email verification link sent to your email, go and verify your email</Typography>
      </div>
    </div>
  );
};

export default VerifyEmail;