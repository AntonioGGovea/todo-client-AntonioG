import { FaTrash, FaEdit  } from 'react-icons/fa';
import { TodoModel } from '../../interfaces';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import { useDeleteTodoMutation } from '../../services';
import { useNavigate } from 'react-router-dom';
import { StyledTodoItem } from './styled';

interface TodoItemProps {
    todo: TodoModel;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const [setTodo] = useTodoStore(useShallow((_) => [_.setTodo]));
    const navigate = useNavigate();
    const deleteTodoMutation = useDeleteTodoMutation();

    const onDelete = () => {
        if (todo.id) deleteTodoMutation.mutate(todo.id)
    };
    
    const onEditClick = () => {
        setTodo(todo);
        navigate(`${todo.id}`);
    }

    return (
        <StyledTodoItem>
            <div className='flex items-center gap-3'>
                <button>
                    <FaTrash onClick={onDelete} />
                </button>
                <button>
                    <FaEdit onClick={onEditClick} />
                </button>
                {todo.title}
            </div>
            <input type='checkbox' className='cursor-default' checked={todo.isDone} readOnly />
        </StyledTodoItem>
    );
}

export default TodoItem;
