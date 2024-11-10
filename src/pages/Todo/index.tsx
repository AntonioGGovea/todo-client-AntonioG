import TodoItem from '../../components/TodoItem';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../../components/Button';
import { useGetTodoListQuery } from '../../services';
import { Outlet, useNavigate } from 'react-router-dom';
import pages from '../../constants';

const Todo = () => {
    const [setNewTodo] = useTodoStore(useShallow((_) => [_.setNewTodo]));
    const navigate = useNavigate();

    const todoQuery = useGetTodoListQuery();
    
    const onCreateClick = () => {
        setNewTodo();
        navigate(pages.todo.children.create.name)
    };

    return (
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex justify-end w-full'>
                <Button type='button' onClick={onCreateClick}>
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
            <Outlet />
        </div>
    );
}

export default Todo;
