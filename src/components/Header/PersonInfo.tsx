import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../utils/http';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { RootState } from '@/store';

interface UserType {
  userName: string;
  email: string;
  age: number;
  location: string;
  imageUrl: string;
}

export default function PersonInfo() {
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });
  const [matchedUser, setMatchedUser] = useState<UserType>();
  useEffect(() => {
    if (user?.email) {
      const foundUser: UserType = data?.find((userData) => userData.email === user.email);
      setMatchedUser(foundUser);
    } else {
      setMatchedUser(undefined);
    }
  }, [user?.email, data]);

  if (!user?.email) {
    return (
      <p className="text-3xl m-8 text-center font-semibold">Welcome!</p>
    );
  }

  if (pathname !== '/dashboard') {
    return (
      <p className="text-3xl m-8 text-center font-semibold">Welcome {matchedUser?.userName}!</p>
    );
  }

  return (
    <div className='flex items-center gap-x-8 pt-10 pb-4'>
      <img src={matchedUser?.imageUrl} className='w-[100px] h-[100px] rounded-full' />
      <div className="flex flex-col gap-1">
        <p className='font-bold text-2xl'>Welcome {matchedUser?.userName}!</p>
        <p>Email: {matchedUser?.email}</p>
        <p>Age: {matchedUser?.age}</p>
        <p>Location: {matchedUser?.location}</p>
      </div>
    </div>
  );
}
