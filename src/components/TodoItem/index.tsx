import { FaTrash, FaEdit  } from "react-icons/fa";
import { TodoModel } from '../../interfaces';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import { useDeleteTodoMutation } from '../../services';

interface TodoItemProps {
    todo: TodoModel;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const [setTodo] = useTodoStore(useShallow((_) => [_.setTodo]));
    const deleteTodoMutation = useDeleteTodoMutation();

    const onDelete = () => {
        if (todo.id) deleteTodoMutation.mutate(todo.id)
    };

    return (
        <div className='flex justify-between w-full'>
            <div className='flex items-center gap-3'>
                <button className='hover:cursor-pointer'>
                    <FaTrash onClick={onDelete} />
                </button>
                <button className='hover:cursor-pointer'>
                    <FaEdit onClick={() => setTodo(todo)} />
                </button>
                {todo.title}
            </div>
            <span>
                <input type='checkbox' className='cursor-default' checked={todo.isDone} readOnly />
            </span>

        </div>
    );
}

export default TodoItem;
