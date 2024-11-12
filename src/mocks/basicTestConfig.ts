import { afterAll, afterEach, beforeAll } from 'vitest';
import { tokenClient } from '../config';
import server from './node';
import db from './db';
import { todoMockData } from './dataMocks';

const basicTestConfig = () => {
    beforeAll(() => {
        tokenClient.set("token");
        todoMockData.getTodoList().forEach(db.todo.create)
        server.listen()
    });
    afterEach(() => {
        const todoIds = todoMockData.getTodoList().map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
        todoMockData.getTodoList().forEach(db.todo.create);
        server.resetHandlers();
    });
    afterAll(() => {
        tokenClient.remove();
        const todoIds = todoMockData.getTodoList().map(x => Number(x.id))
        db.todo.deleteMany({ where: { id: { in: todoIds } }});
        server.close();
    });
};

export default basicTestConfig;
