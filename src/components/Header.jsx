'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import DarkModeSwitch from './DarkModeSwitch';
import MenuItem from './MenuItem';
import { FaSearch } from "react-icons/fa";
import Sidebar from './Sidebar';
import { Button, ListItem,Avatar } from '@material-tailwind/react';
import axios from 'axios';

export default function Header() {
  const [user, setUser] = useState({});
  const [openNav, setOpenNav] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/');
    } catch (err) {
      console.log("Error during logout:", err.message);
      toast.error("Failed to logout");
    }
  };
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get('/api/users/userdetail');
        const userData = response.data;
        setUser(userData);
        setIsLogged(true);
      } catch (error) {
        console.error(error);
        setIsLogged(false);
      }
    };
    fetchUserDetail();
  }, []);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleGptSearchClick = () => {
    console.log("hello");
  }

  return (
    <header className="bg-gray-800 text-white p-5 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-4">FreeCinema</h1>
        <ul className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 ${openNav ? 'block' : 'hidden'} md:block`}>
          <MenuItem title="Home" address="/" />
          <MenuItem title="About" address="/about" />
          <MenuItem title="Blog" address="/blog" />
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <DarkModeSwitch className="ml-4" />
        <div className='lg:hidden sm:block'>
        <Sidebar isLogged={isLogged} logout={logout} />
        </div>

        {isLogged ? (
   
          <Button className='bg-gray-500 lg:block hidden hover:bg-gray-600 mx-2' onClick={logout}>Logout</Button>
      
      
      
      
        ) : (
          <div className='lg:block hidden'>
            <div className="flex justify-center items-center gap-2 lg:block">
              <Button className='bg-gray-500 hover:bg-gray-600  mx-2'>
                <Link href="/signup" className="font-medium">
                  Signup
                </Link>
              </Button>
              <Button className='bg-gray-500 hover:bg-gray-600 mx-2'>
                <Link href="/login" className="font-medium">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}