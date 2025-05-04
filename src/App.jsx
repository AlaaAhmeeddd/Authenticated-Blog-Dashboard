import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'posts',
        element: <Posts />
      },
      {
        path: 'new-post',
        element: <NewPost />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

