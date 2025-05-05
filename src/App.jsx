import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Posts from './components/Posts/Posts';
import NewPost from './components/Posts/NewPost';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Posts />
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
        path: 'new-post',
        element: <NewPost />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>,
      }
    ]
  }
]);

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}

export default App;

