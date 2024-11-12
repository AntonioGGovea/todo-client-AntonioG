import { test, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { basicTestConfig, renderWithRouter } from '../../mocks';
import { pages } from '../../constants';
import Auth from '.';
import Login from '../Login';
import { tokenClient } from '../../config';

const getAuthWithRoute = () => ({ element: <Auth />, path: pages.login.path });

basicTestConfig();

test('With valid credentials stay signed in', async () => {
    renderWithRouter(getAuthWithRoute());

    const logout = await screen.findByText('Logout');

    expect(logout).toBeInTheDocument();
});

test('With invalid token redirect to login', async () => {
    tokenClient.remove();
    renderWithRouter(getAuthWithRoute(), [
        { element: <Login />, path: '/login' }
    ]);

    const redirect = await screen.findByText('Redirecting...');
    expect(redirect).toBeInTheDocument();
    tokenClient.set('token');
});

test('Logout button redirect to login', async () => {
    renderWithRouter(getAuthWithRoute(), [
        { element: <Login />, path: '/login' }
    ]);

    fireEvent.click(await screen.findByText('Logout'))

    const redirect = await screen.findByText('Redirecting...');
    expect(redirect).toBeInTheDocument();
});
