import { Outlet } from 'react-router-dom'
import MainNavigation from './MainNavigation'
import Sidebar from './Sidebar'


export default function RootLayout() {
  return (
    <div className='flex h-screen'>
      <Sidebar className='h-full' />
      <div className='flex-1 flex flex-col'>
        <MainNavigation />
        <div className='flex-1 p-4 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

