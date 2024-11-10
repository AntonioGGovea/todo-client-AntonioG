import TodoItem from '../../components/TodoItem';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../../components/Button';
import { useGetTodoListQuery } from '../../services';
import { Outlet, useNavigate } from 'react-router-dom';

const Todo = () => {
    const [setNewTodo] = useTodoStore(useShallow((_) => [_.setNewTodo]));
    const navigate = useNavigate();

    const todoQuery = useGetTodoListQuery();
    
    const onCreateClick = () => {
        setNewTodo();
        navigate("create")
    };

    return (
        <div>
            <div className='w-full bg-slate-500 py-4 pl-6 pr-4 flex justify-between'>
                <h1 className='text-4xl text-white font-bold'>
                    To Do
                </h1>
                <Button type='button' $variant='text'>
                    Logout
                </Button>
            </div>
            <div className='p-6 flex flex-col gap-4'>
                <div className='flex justify-end w-full'>
                    <Button type="button" onClick={onCreateClick}>
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
            </div>
            <Outlet />
        </div>
    )
}

export default Todo;
