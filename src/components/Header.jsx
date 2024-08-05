'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import DarkModeSwitch from './DarkModeSwitch';
import MenuItem from './MenuItem';
import { FaSearch } from "react-icons/fa";
import Sidebar from './Sidebar';
import { Button, ListItem, } from '@material-tailwind/react';

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [islogged,setlogged]=useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  const handleGptSearchClick = () => {
    console.log("hell0");
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
        <Sidebar/>
      </div>

        {islogged ? (
          <ListItem>
            Log Out
          </ListItem>
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