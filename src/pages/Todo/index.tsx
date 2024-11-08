import TodoItem from '../../components/TodoItem';
import { Modal } from '../../components/Modal';
import TodoForm from '../../components/TodoForm';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../../components/Button';
import { apiRequestWithAuth, useQueryWithAuth } from '../../services';
import { Controllers } from '../../constants';
import { TodoModel } from '../../interfaces';

const Todo = () => {
    const [todo, setTodo, setNewTodo] = useTodoStore(
        useShallow((_) => [_.todo, _.setTodo, _.setNewTodo])
    );

    const todoQuery = useQueryWithAuth({
        queryKey: ["GetTodoList"],
        queryFn: () => apiRequestWithAuth<TodoModel[]>({
            controller: Controllers.Todo,
        })
    });

    return (
        <div>
            <div className='w-full bg-slate-500 p-4'>
                <h1 className='text-4xl text-white font-bold'>
                    To Do
                </h1>
            </div>
            <div className='p-6 flex flex-col gap-4'>
                <div className='flex justify-end w-full'>
                    <Button type="button" onClick={setNewTodo}>
                        Create To Do
                    </Button>
                </div>
                <div>
                    <div className='flex flex-col gap-2'>
                        {todoQuery.data?.map((entry) => (
                            <TodoItem key={entry.id} todo={entry} />
                        ))}
                    </div>
                </div>
                {todo && (
                    <Modal onClose={() => setTodo(undefined)} className='w-1/2'>
                        <TodoForm />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default Todo;
