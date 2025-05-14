import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Login from './pages/login';
import Signup from './pages/signup';
import Posts from './pages/posts';
import NewPost from './pages/new-post';
import Dashboard from './pages/dashboard';
import { Provider } from 'react-redux';
import store from './store';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import NotFound from './pages/not-found';

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
      },
      {
        path: '*',
        element: <NotFound />
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
