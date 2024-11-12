import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { queryClient } from '../config';

const renderWithRouter = (children: RouteObject, routes: RouteObject[] = []) => {
    const router = createMemoryRouter([{ ...children }, ...routes], {
        initialEntries: ["/", children.path as string],
        initialIndex: 1,
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default renderWithRouter;
