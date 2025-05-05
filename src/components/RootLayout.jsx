import { Outlet } from 'react-router-dom';
import MainNavigation from './Header/MainNavigation';

export default function RootLayout() {
  return (
    <div className='bg-zinc-100 min-h-[100vb] pb-10 pt-5'>
      <MainNavigation />
      <Outlet />
    </div>
  );
}
