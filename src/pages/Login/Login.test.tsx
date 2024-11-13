import { test, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { basicTestConfig, renderWithRouter, userMockData } from '../../mocks';
import { errorMessages, pages } from '../../constants';
import Login from '.';
import Todo from '../Todo';

const getLoginWithRoute = () => ({ element: <Login />, path: pages.login.path });

basicTestConfig();

test('Login successful Redirects to home page', async () => {
    renderWithRouter(getLoginWithRoute(), [
        { element: <Todo />, path: '/todo' }
    ]);

    const user = userMockData.getUser();

    fireEvent.change(await screen.findByPlaceholderText('Email'), { target: { value: user.email } });
    fireEvent.change(await screen.findByLabelText('Password'), { target: { value: user.password } });
    fireEvent.click(await screen.findByText('Login'));

    const todoScreen = await screen.findByText('Create To Do');

    expect(todoScreen).toBeInTheDocument();
});

test('Login fails causes error message to be displayed', async () => {
    renderWithRouter(getLoginWithRoute());

    const user = userMockData.getFailingUser();

    fireEvent.change(await screen.findByPlaceholderText('Email'), { target: { value: user.email } });
    fireEvent.change(await screen.findByLabelText('Password'), { target: { value: user.password } });
    fireEvent.click(await screen.findByText('Login'));

    const todoScreen = await screen.findByText(errorMessages.generalError, { exact: false });

    expect(todoScreen).toBeInTheDocument();
});
