import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { queryClient } from '../config';

const renderWithRouter = (children: ReactElement, routes: { element: ReactElement, path: string }[] = []) => {
    const withProviders = children;

    const options = { element: withProviders, path: '/todo' } as RouteObject;

    const router = createMemoryRouter([{ ...options }, ...routes], {
        initialEntries: ["/", options.path as string],
        initialIndex: 1,
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default renderWithRouter;
