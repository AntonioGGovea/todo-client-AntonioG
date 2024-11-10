import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import TodoForm from '../../components/TodoForm';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';

const TodoModal = () => {
    const [setTodo] = useTodoStore(useShallow((_) => [_.setTodo]));
    const navigate = useNavigate();

    const onClose = () => {
        setTodo(undefined);
        navigate('/todo');
    };

    return (
        <Modal onClose={onClose} className='w-1/2'>
            <TodoForm />
        </Modal>
    )
}

export default TodoModal;
