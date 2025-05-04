import { NavLink } from 'react-router-dom';
import { IoPersonCircle } from "react-icons/io5";


export default function Sidebar() {
  return (
    <div className='flex flex-col items-center p-10 h-full sticky top-0 text-[#7B91B0]'>
      <IoPersonCircle className='text-8xl text-[#7B91B0]' />
      <p className='font-semibold'>Youremail@hhh.com</p>
      <div className='flex flex-col  gap-5 my-10 font-semibold'>
        <NavLink to={'dashboard'} className={({ isActive }) => (isActive ? 'text-white bg-[#5D5FEF] rounded-lg px-9 py-2' : 'px-9 py-2')}>
          Dashboard
        </NavLink>
        <NavLink to={'posts'} className={({ isActive }) => (isActive ? 'text-white bg-[#5D5FEF] rounded-lg px-9 py-2' : 'px-9 py-2')}>
          Posts
        </NavLink>
      </div>
    </div>
  );
}
