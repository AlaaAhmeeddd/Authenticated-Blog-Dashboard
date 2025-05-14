import { Outlet } from 'react-router-dom';
import MainNavigation from './Header/MainNavigation';
import { useEffect } from 'react'
import { loginSuccess } from '../store/authSlice'
import { useDispatch } from 'react-redux';

export default function RootLayout() {
  const dispatch = useDispatch()

  useEffect(() => {
    const person = localStorage.getItem('person')
    if(person){
      const personData = JSON.parse(person)
      dispatch(loginSuccess(personData))
    }
  }, [])

  return (
    <div className='bg-zinc-100 min-h-[100vb] pb-10 pt-5'>
      <MainNavigation />
      <Outlet />
    </div>
  );
}
