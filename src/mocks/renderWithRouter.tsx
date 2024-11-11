import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { isValidElement, ReactElement } from 'react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { queryClient } from '../config';

const renderWithRouter = (children: ReactElement, routes = []) => {
    const withProviders =
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    const options = isValidElement(withProviders)
        ? { element: withProviders, path: '/' } as RouteObject
        : withProviders as RouteObject;

    const router = createMemoryRouter([{ ...options as RouteObject }, ...routes], {
        initialEntries: [options.path as string],
        initialIndex: 1,
    });

    return render(<RouterProvider router={router} />);
};

export default renderWithRouter;
