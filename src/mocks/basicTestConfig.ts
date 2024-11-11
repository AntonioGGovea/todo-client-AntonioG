import { afterAll, afterEach, beforeAll } from 'vitest';
import { tokenClient } from '../config';
import server from './node';
import db from './db';
import { TodoModel } from '../interfaces';

const basicTestConfig = () => {
    const entries: { todo: TodoModel[] } = {
        todo: []
    };

    beforeAll(() => {
        tokenClient.set("token");
        [1, 2, 3].map(() => entries.todo.push(db.todo.create()))
        server.listen()
    });
    afterEach(() => {
        server.resetHandlers();
        const todoIds = entries.todo.map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
        [1, 2, 3].map(() => entries.todo.push(db.todo.create()))
    });
    afterAll(() => {
        tokenClient.remove();
        server.close();
        const todoIds = entries.todo.map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
    });

    return entries;
};

export default basicTestConfig;
