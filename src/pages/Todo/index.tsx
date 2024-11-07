import TodoItem from '../../components/TodoItem';
import { Modal } from '../../components/Modal';
import TodoForm from '../../components/TodoForm';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../../components/Button';

const Todo = () => {
    const [todo, setTodo, setNewTodo] = useTodoStore(
        useShallow((_) => [_.todo, _.setTodo, _.setNewTodo])
    );

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
                        <TodoItem todo={{ id: 1, title: 'First', isDone: false }} />
                        <TodoItem todo={{ id: 1, title: 'First', isDone: false }} />
                        <TodoItem todo={{ id: 1, title: 'First', isDone: false }} />
                        <TodoItem todo={{ id: 1, title: 'First', isDone: false }} />
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
