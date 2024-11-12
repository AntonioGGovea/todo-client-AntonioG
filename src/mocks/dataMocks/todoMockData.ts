import { TodoModel } from '../../interfaces';

const getTodo = (id = 1): TodoModel => ({
    id: id,
    title: `Todo ${id}`,
    isDone: false,
});

const getTodoList = () => [
    getTodo(1),
    getTodo(2),
    getTodo(3),
];

const todoMockData = {
    getTodo,
    getTodoList,
    getCreateTodo: () => getTodo(100),
    getFailingTodo: () => getTodo(3),
    getUpdatedTodo: () => ({ ...getTodo(), title: 'new title' }),
};

export default todoMockData;
