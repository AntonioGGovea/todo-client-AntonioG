import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import Todo from '../pages/Todo';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';

export const queryClient = new QueryClient();

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Todo />,
        errorElement: <ErrorPage />
    },
    {
        path: '/login',
        element: <Login />
    }
])
