import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import AuthProvider from '../pages/Auth';
import Todo from '../pages/Todo';
import TodoModal from '../pages/Todo/TodoModal';
import pages from '../constants';

export const queryClient = new QueryClient();

const tokenStorageKey = 'tokenStorageKey';

export const tokenClient = {
    get: () => sessionStorage.getItem(tokenStorageKey),
    set: (newToken: string) => sessionStorage.setItem(tokenStorageKey, newToken),
    remove: () => sessionStorage.removeItem(tokenStorageKey),
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthProvider />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: pages.todo.path,
                element: <Todo />,
                children: [
                    {
                        path: pages.todo.children.create.name,
                        element: <TodoModal />
                    },
                    {
                        path: ':todoId',
                        element: <TodoModal />
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        element: <Login />,
        errorElement: <ErrorPage />,
    }
])
