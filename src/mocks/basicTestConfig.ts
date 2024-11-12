import { afterAll, afterEach, beforeAll } from 'vitest';
import { tokenClient } from '../config';
import server from './node';
import db from './db';
import { TodoModel } from '../interfaces';
import todoMockData from './todoMockData';

const basicTestConfig = () => {
    const entries: { todo: TodoModel[] } = {
        todo: []
    };

    beforeAll(() => {
        tokenClient.set("token");
        [1, 2, 3].forEach((i) => entries.todo.push(db.todo.create(todoMockData.getTodo(i))))
        server.listen()
    });
    afterEach(() => {
        const todoIds = entries.todo.map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
        [1, 2, 3].forEach((_, i) => db.todo.create(entries.todo[i]))
        server.resetHandlers();
    });
    afterAll(() => {
        tokenClient.remove();
        const todoIds = entries.todo.map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
        server.close();
    });

    return entries;
};

export default basicTestConfig;
