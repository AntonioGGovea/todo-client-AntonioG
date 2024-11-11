import { TodoModel } from '../interfaces';

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
};

export default todoMockData;