import { create } from 'zustand';
import { TodoModel } from '../interfaces';

const newTodo: TodoModel = {
    isDone: false,
    title: '',
}

interface TodoState {
    todo?: TodoModel;
    setTodo: (newTodo: TodoModel | undefined) => void;
    setNewTodo: () => void;
    todoList: TodoModel[];
    setTodoList: (todoList: TodoModel[]) => void;
}

const useTodoStore = create<TodoState>()((set) => ({
    todo: undefined,
    setTodo: (todo: TodoModel | undefined) => set(() => ({ todo })),
    setNewTodo: () => set(() => ({ todo: { ...newTodo } })),
    todoList: [],
    setTodoList: (todoList: TodoModel[]) => set(() => ({ todoList })),
}));

export default useTodoStore;
