import { queryClient } from '../../../config';
import { Controllers } from '../../../constants';
import { TodoModel } from '../../../interfaces';
import { useMutationWithAuth, useQueryWithAuth } from '../../baseQueries';
import { apiRequestWithAuth } from '../../baseRequests';

const GET_TODO_LIST_KEY = 'GetTodoList';

export const useGetTodoListQuery = () => useQueryWithAuth({
    queryKey: [GET_TODO_LIST_KEY],
    queryFn: () => apiRequestWithAuth<TodoModel[]>({
        controller: Controllers.Todo,
    })
});

const invalidateTodoListQuery = () => queryClient.invalidateQueries({
    queryKey: [GET_TODO_LIST_KEY],
});

export const useCreateTodoMutation = () => useMutationWithAuth({
    mutationKey: ['CreateTodo'],
    mutationFn: (todo: TodoModel) =>
        apiRequestWithAuth<TodoModel>({
            controller: Controllers.Todo,
            method: 'POST',
            body: todo,
        }),
    onSuccess: invalidateTodoListQuery
})

export const useUpdateTodoMutation = () => useMutationWithAuth({
    mutationKey: ['UpdateTodo'],
    mutationFn: (todo: TodoModel) =>
        apiRequestWithAuth<TodoModel>({
            controller: Controllers.Todo,
            method: 'PATCH',
            body: todo,
        }),
    onSuccess: invalidateTodoListQuery
})

export const useDeleteTodoMutation = () => useMutationWithAuth({
    mutationKey: ['DeleteTodo'],
    mutationFn: (id: number) =>
        apiRequestWithAuth({
            controller: Controllers.Todo,
            endpoint: id.toString(),
            method: 'DELETE',
        }),
    onSuccess: invalidateTodoListQuery
})
