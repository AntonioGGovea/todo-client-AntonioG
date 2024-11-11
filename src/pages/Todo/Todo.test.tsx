import Todo from '.';
import { test, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { basicTestConfig, renderWithRouter } from '../../mocks';

const entries = basicTestConfig();

test('Displays todo list', async () => {
    renderWithRouter(<Todo />);

    const todo = await screen.findByText(entries.todo[0].title);

    expect(todo).toBeInTheDocument();
});

test('Delete todo updates the list', async () => {
    renderWithRouter(<Todo />);
    const todo = await screen.findByText(entries.todo[0].title);

    expect(todo).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId(`delete-${entries.todo[0].id}`));

    expect(todo).not.toBeInTheDocument();
});
