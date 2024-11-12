import Todo from '.';
import { test, expect } from 'vitest';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { basicTestConfig, renderWithRouter, todoMockData } from '../../mocks';
import TodoModal from './TodoModal/TodoModal';
import { errorMessages, pages } from '../../constants';

const getTodoWithRoute = () => ({ element: <Todo />, path: pages.todo.path });

basicTestConfig();

// GET
test('Displays todo list', async () => {
    renderWithRouter(getTodoWithRoute());

    const todo = await screen.findByText(todoMockData.getTodo().title);

    expect(todo).toBeInTheDocument();
});

// CREATE
test('Crate todo updates the list', async () => {
    renderWithRouter(getTodoWithRoute(), [
        { element: <TodoModal />, path: 'todo/create' }
    ]);

    const newTitle = 'new title';

    fireEvent.click(await screen.findByText('Create To Do'));
    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const newTodo = await screen.findByTestId(`delete-${todoMockData.getCreateTodo().id}`);

    expect(newTodo).toBeInTheDocument();
});

test('Create todo fails causes error message to be displayed', async () => {
    renderWithRouter(getTodoWithRoute(), [
        { element: <TodoModal />, path: 'todo/:todId' }
    ]);

    const newTitle = todoMockData.getFailingTodo().title;

    fireEvent.click(await screen.findByText('Create To Do'));
    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const errorMessage = await screen.findByText(errorMessages.todo.create)

    expect(errorMessage).toBeInTheDocument();
});

// UPDATE
test('Update todo updates the list', async () => {
    renderWithRouter(getTodoWithRoute(), [
        { element: <TodoModal />, path: 'todo/:todId' }
    ]);

    const newTitle = todoMockData.getUpdatedTodo().title;

    fireEvent.click(await screen.findByTestId(`update-${todoMockData.getTodo().id}`));
    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const newTodo = await screen.findByTestId(`update-${todoMockData.getTodo().id}`);

    expect(newTodo).toBeInTheDocument();
});

test('Update todo fails causes error message to be displayed', async () => {
    renderWithRouter(getTodoWithRoute(), [
        { element: <TodoModal />, path: 'todo/:todId' }
    ]);

    const newTitle = todoMockData.getFailingTodo().title;

    fireEvent.click(await screen.findByTestId(`update-${todoMockData.getFailingTodo().id}`));
    fireEvent.change(await screen.findByPlaceholderText('Title'), { target: { value: newTitle } });
    fireEvent.click(await screen.findByText('Save'));

    const errorMessage = await screen.findByText(errorMessages.todo.update)

    expect(errorMessage).toBeInTheDocument();
});

// DELETE
test('Delete todo updates the list', async () => {
    renderWithRouter(getTodoWithRoute());
    const todoTitle = todoMockData.getTodo().title;
    const todo = await screen.findByText(todoTitle);

    expect(todo).toBeInTheDocument(); 

    const deleteButton = await screen.findByTestId(`delete-${todoMockData.getTodo().id}`);
    fireEvent.click(deleteButton);

    await waitForElementToBeRemoved(() => screen.queryByText(todoTitle));

    expect(todo).not.toBeInTheDocument();
});

test('Delete todo fails causes error message to be displayed', async () => {
    renderWithRouter(getTodoWithRoute());
    const todoTitle = todoMockData.getFailingTodo().title;
    const todo = await screen.findByText(todoTitle);

    expect(todo).toBeInTheDocument(); 

    const deleteButton = await screen.findByTestId(`delete-${todoMockData.getFailingTodo().id}`);
    fireEvent.click(deleteButton);

    const errorMessage = await screen.findByText(errorMessages.todo.remove)

    expect(errorMessage).toBeInTheDocument();
});
