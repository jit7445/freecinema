'use client';
import Image from "next/image";
import { Button, Modal } from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');
  const [open, setOpen] = useState(false);

  const getUserDetail = async () => {
    try {
      const response = await axios.get('/api/users/me');
      console.log("getDetail:", response);
      setData(response.data.data._id);
    } catch (err) {
      console.log("Error fetching user details:", err.message);
      toast.error("Failed to fetch user details");
    }
  };

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

  const handleProfileClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex p-[16%] lg:mx-[24%] m-4">
      <div className="lg:p-2 p-12">
        <div className="flex w-max items-end gap-4">
          {/* Add profile picture or any other information if needed */}
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
          <h2 onClick={handleProfileClick}>
            {data === 'nothing' 
              ? " " 
              : <Link href={`/profile/${data}`}>View Profile</Link>
            } 
            {data}
          </h2>
        </div>
        <Button onClick={getUserDetail}>Get Details</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Modal
        size="lg"
        isOpen={open}
        onClose={handleClose}
        className="max-w-lg"
      >
        <Modal.Header>
          <h2 className="text-2xl font-bold">Profile Details</h2>
        </Modal.Header>
        <Modal.Body>
          {/* Add profile details here */}
          <p>Profile ID: {data}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;