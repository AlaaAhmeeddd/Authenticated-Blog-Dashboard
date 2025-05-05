import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import PersonInfo from '../Header/PersonInfo'

export default function MainNavigation() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
     
    return (
        <div className='rounded-md bg-slate-900 mb-8 text-white container mx-auto py-4 px-8'>
            <div className='flex items-center justify-between flex-1'>
                <p className='text-3xl font-bold'>Dashboard</p>
                <div className='font-semibold text-sm'>
                    <NavLink to={'/'} className={({ isActive }) => (isActive ? 'text-white bg-slate-700 rounded-2xl px-4 py-2' : 'px-4 py-2')}>
                        Posts
                    </NavLink>
                    <NavLink to={'dashboard'} className={({ isActive }) => (isActive ? 'text-white bg-slate-700 rounded-2xl px-4 py-2' : 'px-4 py-2')}>
                        Dashboard
                    </NavLink>
                </div>
                <ul className='flex gap-x-4 font-semibold'>
                    {user ? (
                        <button
                            className='text-white bg-[#5D5FEF] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#5556C3] duration-300'
                            onClick={() => dispatch(logout())}
                        >
                            Log out
                        </button>
                    ) : (
                        <>
                            <li className='text-white bg-slate-700 rounded-xl px-4 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'>
                                <Link to={'/login'}>Login</Link>
                            </li>
                            <li className='text-white bg-slate-700 rounded-xl px-4 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'>
                                <Link to={'/signup'}>Sign Up</Link>
                            </li>
                        </>
                    )
                    }
                </ul>
            </div>
            <PersonInfo />
        </div>
    )
}
