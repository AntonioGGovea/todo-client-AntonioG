import Todo from '.';
import { test, expect } from 'vitest';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { basicTestConfig, renderWithRouter, todoMockData } from '../../mocks';
import TodoModal from './TodoModal';

const entries = basicTestConfig();

// GET
test('Displays todo list', async () => {
    renderWithRouter(<Todo />);

    const todo = await screen.findByText(entries.todo[0].title);

    expect(todo).toBeInTheDocument();
});

// CREATE
test('Crate todo updates the list', async () => {
    renderWithRouter(<Todo />, [
        { element: <TodoModal />, path: 'todo/create' }
    ]);

    const newTitle = 'new title';

    fireEvent.click(await screen.findByText('Create To Do'));
    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const newTodo = await screen.findByTestId(`delete-${todoMockData.getCreateTodo().id}`);

    expect(newTodo).toBeInTheDocument();
});

// UPDATE
test('Update todo updates the list', async () => {
    renderWithRouter(<Todo />, [
        { element: <TodoModal />, path: 'todo/:todId' }
    ]);

    const newTitle = todoMockData.getUpdatedTodo().title;

    fireEvent.click(await screen.findByTestId(`update-${todoMockData.getTodo().id}`));

    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const newTodo = await screen.findByTestId(`update-${todoMockData.getTodo().id}`);

    expect(newTodo).toBeInTheDocument();
});

// DELETE
test('Delete todo updates the list', async () => {
    renderWithRouter(<Todo />);
    const todoTitle = todoMockData.getTodo().title;
    const todo = await screen.findByText(todoTitle);

    expect(todo).toBeInTheDocument(); 

    const deleteButton = await screen.findByTestId(`delete-${todoMockData.getTodo().id}`);
    fireEvent.click(deleteButton);

    await waitForElementToBeRemoved(() => screen.queryByText(todoTitle));

    expect(todo).not.toBeInTheDocument();
});
