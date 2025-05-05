import { IoPersonCircle } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../utils/http';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function PersonInfo() {
  const { pathname } = useLocation()
  const { user } = useSelector((state) => state.auth);
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });
  const [matchedUser, setMatchedUser] = useState(null);
  useEffect(() => {
    if (user?.email) {
      const foundUser = data?.find(userData => userData.email === user.email);
      setMatchedUser(foundUser);
    } else {
      setMatchedUser()
    }
  }, [user?.email, data]);

  if (!user?.email){
    return(
      <p className="text-3xl m-8 text-center font-semibold">Welcome!</p>
    )
  }

  if( pathname !== '/dashboard'){
    return(
      <p className="text-3xl m-8 text-center font-semibold">Welcome {matchedUser?.userName}!</p>
    )
  }

  return (
    <div className='flex items-center gap-x-8 pt-10 pb-4'>
      <IoPersonCircle className='text-8xl text-[#7B91B0]' />
      <div className="flex flex-col gap-1">
        <p className='font-bold text-2xl'>Welcome {matchedUser && matchedUser.userName}!</p>
        <p>Email: {matchedUser && matchedUser.email}</p>
        <p>Age: {matchedUser && matchedUser.age}</p>
        <p>Location: {matchedUser && matchedUser.location}</p>
      </div>
    </div>
  );
}
