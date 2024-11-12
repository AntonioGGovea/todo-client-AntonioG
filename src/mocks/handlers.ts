
import { http, HttpResponse } from 'msw';
import { Controllers } from '../constants';
import db from './db';
import todoMockData from './todoMockData';

const baseUrl = 'https://localhost:44350/api/';

const buildUrl = (controller: Controllers, endpoint?: string | number) => {
    const endpointOrDefault = endpoint ? `/${endpoint}` : '';
    return `${baseUrl}${controller}${endpointOrDefault}`;
};

export const handlers = [
    http.get(buildUrl(Controllers.Todo), () => {
        return HttpResponse.json(db.todo.getAll())
    }),
    http.get(buildUrl(Controllers.Todo, db.todo.getAll()[0]?.id), () => {
        return HttpResponse.json(db.todo.getAll()[0])
    }),
    http.delete(buildUrl(Controllers.Todo, todoMockData.getTodo()?.id),
        () => {
            db.todo.delete({ where: { id: { equals: Number(todoMockData.getTodo()?.id) } } });
            return new HttpResponse(null, { status: 200 })
        }
    ),
    http.post(buildUrl(Controllers.Todo),
        () => {
            db.todo.create(todoMockData.getCreateTodo());
            return HttpResponse.json(todoMockData.getCreateTodo())
        }
    ),
    http.patch(buildUrl(Controllers.Todo),
        () => {
            db.todo.update({
                where: { id: { equals: todoMockData.getTodo().id } },
                data: todoMockData.getUpdatedTodo(),
            },
                );
            return HttpResponse.json(todoMockData.getCreateTodo())
        }
    ),
]
