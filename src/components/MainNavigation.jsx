import { Link } from 'react-router-dom'
export default function MainNavigation() {
  return (
    <div className='container mx-auto py-4 px-5'>
        <div className='flex items-center justify-between bg-white flex-1 sticky left-0 top-0'>
            <p className='text-3xl font-bold'>Dashboard</p>
            <ul className='flex gap-x-4 font-semibold'>
                <li className='text-white bg-[#5D5FEF] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#5556C3] duration-300'>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li className='text-white bg-[#5D5FEF] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#5556C3] duration-300'>
                    <Link to={'/signup'}>Sign Up</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
