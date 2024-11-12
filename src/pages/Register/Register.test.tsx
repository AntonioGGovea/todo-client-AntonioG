import { test, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { basicTestConfig, renderWithRouter, userMockData } from '../../mocks';
import { errorMessages, pages } from '../../constants';
import Register from '.';
import Todo from '../Todo';

const getRegisterWithRoute = () => ({ element: <Register />, path: pages.login.path });

basicTestConfig();

test('Register successful Redirects to home page', async () => {
    renderWithRouter(getRegisterWithRoute(), [
        { element: <Todo />, path: '/todo' }
    ]);

    const user = userMockData.getUser();

    fireEvent.change(await screen.findByPlaceholderText('Email'), { target: { value: user.email } });
    fireEvent.change(await screen.findByLabelText('Password'), { target: { value: user.password } });
    fireEvent.click(await screen.findByText('Register'));

    const todoScreen = await screen.findByText('Create To Do');

    expect(todoScreen).toBeInTheDocument();
});

test('Register fails causes error message to be displayed', async () => {
    renderWithRouter(getRegisterWithRoute());

    const user = userMockData.getFailingUser();

    fireEvent.change(await screen.findByPlaceholderText('Email'), { target: { value: user.email } });
    fireEvent.change(await screen.findByLabelText('Password'), { target: { value: user.password } });
    fireEvent.click(await screen.findByText('Register'));

    const todoScreen = await screen.findByText(errorMessages.generalError);

    expect(todoScreen).toBeInTheDocument();
});
