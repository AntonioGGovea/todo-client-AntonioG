import { FaTrash, FaEdit  } from "react-icons/fa";
import { TodoModel } from '../../interfaces';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';

interface TodoItemProps {
    todo: TodoModel;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const [setTodo] = useTodoStore(useShallow((_) => [_.setTodo]));

    return (
        
        <div className='flex justify-between w-full'>
            <div className='flex items-center gap-3'>
                <button className='hover:cursor-pointer'>
                    <FaTrash />
                </button>
                <button className='hover:cursor-pointer'>
                    <FaEdit onClick={() => setTodo(todo)} />
                </button>
                {todo.title}
            </div>
            <span>
                <input type='checkbox' checked={todo.isDone} readOnly />
            </span>

        </div>
    );
}

export default TodoItem;
