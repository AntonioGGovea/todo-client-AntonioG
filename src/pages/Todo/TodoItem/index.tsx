import { FaTrash, FaEdit  } from 'react-icons/fa';
import { TodoModel } from '../../../interfaces';
import useTodoStore from '../../../stores';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { StyledTodoItem } from './styled';

interface TodoItemProps {
    todo: TodoModel;
    onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
    const [setTodo] = useTodoStore(useShallow((_) => [_.setTodo]));
    const navigate = useNavigate();
    
    const onEditClick = () => {
        setTodo(todo);
        navigate(`${todo.id}`);
    }

    return (
        <StyledTodoItem>
            <div className='flex items-center gap-3'>
                <button data-testid={`delete-${todo.id}`} onClick={() => onDelete(Number(todo.id))}>
                    <FaTrash />
                </button>
                <button data-testid={`update-${todo.id}`} onClick={onEditClick}>
                    <FaEdit />
                </button>
                {todo.title}
            </div>
            <input type='checkbox' className='cursor-default' checked={todo.isDone} readOnly />
        </StyledTodoItem>
    );
}

export default TodoItem;
