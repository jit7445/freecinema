import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
export default function Sidebar() {
  const [openTop, setOpenTop] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const [openBottom, setOpenBottom] = React.useState(false);
  const [openLeft, setOpenLeft] = React.useState(false);
  const [islogged,seislogged]=useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-2  ">
        <Button onClick={openDrawerRight} className="bg-gray-800"><GiHamburgerMenu className="text-3xl"/></Button>
      </div>

      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 bg-white"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            FreeCinema
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </IconButton>
            </div> 

         <div>  
         
          <List>
            <ListItem>
            <NavbarItem title="Trending" param="trending" className="scroll-mr-0.5 snap-start" />
             
            </ListItem>
            <ListItem>

            <NavbarItem title="Popular" param="popular" className="scroll-mr-0.5 snap-start" />
            </ListItem>
            <ListItem>

            <NavbarItem title="TV Shows" param="tvShows" className="scroll-mr-0.5 snap-start" />
       

            </ListItem>
            <ListItem>

            <NavbarItem title="Top Rated" param="topRated" className="scroll-mr-0.5 snap-start" />
           
            </ListItem>
            <ListItem>

            <NavbarItem title="Upcoming movies" param="upcoming" className="scroll-mr-0.5 snap-start" />
            </ListItem>
            {islogged ? (<ListItem>
              Log Out
            </ListItem>) :(<div className="flex gap-1">
            <ListItem className=" bg-gray-500">
            <Link href="/signup" className="font-medium text-gray-900">
            Sign Up
          </Link>
            </ListItem>
            <ListItem className=" bg-gray-500 " >
            <Link href="/login" className="font-medium text-gray-900">
            Login
          </Link>
            </ListItem>
            </div>)}
            
          </List>
        </div>


      </Drawer>


    </React.Fragment>
  );
}