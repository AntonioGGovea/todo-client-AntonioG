import { useForm } from 'react-hook-form';
import { TodoModel } from '../../interfaces';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../Button';
import { useCreateTodoMutation, useUpdateTodoMutation } from '../../services';
import { TextInput } from '../Inputs';

const TodoForm = () => {
    const [todo, setTodo] = useTodoStore(useShallow((_) => [_.todo, _.setTodo]));
    const { register, handleSubmit, formState: { errors } } = useForm<TodoModel>({ defaultValues: { ...todo } });
    const isEdit = !!todo?.id;

    const createTodoMutation = useCreateTodoMutation();
    const updateTodoMutation = useUpdateTodoMutation();

    const onSubmit = (todoToSubmit: TodoModel) => {
        if (isEdit) updateTodoMutation.mutate(todoToSubmit)
        else createTodoMutation.mutate(todoToSubmit);
        setTodo(undefined);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='pb-8'>
                    <h2 className='text-2xl font-semibold'>
                        {isEdit ? "Edit To Do" : "Create To Do" }
                    </h2>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="label">
                            Label
                        </label>
                        <TextInput id="label" type="text" placeholder="Label" {...register("title", { required: true })} />
                        {errors.title && (<span className="text-red-500 text-xs">This field is required</span>)}
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type='checkbox' {...register("isDone")} />
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="label">
                            Done
                        </label>
                    </div>
                </div>
                <div className='flex justify-end mt-6'>
                    <Button type="submit" $variant='secondary'>
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
};

export default TodoForm;
