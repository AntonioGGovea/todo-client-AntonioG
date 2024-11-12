import { useForm } from 'react-hook-form';
import { TodoModel } from '../../interfaces';
import useTodoStore from '../../stores';
import { useShallow } from 'zustand/shallow';
import Button from '../Button';
import { useCreateTodoMutation, useUpdateTodoMutation } from '../../services';
import { TextInput } from '../Inputs';
import { useNavigate } from 'react-router-dom';
import Label from '../Label';
import { ActionError, InputError } from '../Errors';
import { FormContainer, FormContent, FormHeader } from '../FormLayout';
import { errorMessages, pages } from '../../constants';

const TodoForm = () => {
    const [todo, setTodo] = useTodoStore(useShallow((_) => [_.todo, _.setTodo]));
    const { register, handleSubmit, formState: { errors } } = useForm<TodoModel>({ defaultValues: { ...todo } });
    const navigate = useNavigate();
    const isEdit = !!todo?.id;

    const createTodoMutation = useCreateTodoMutation();
    const updateTodoMutation = useUpdateTodoMutation();

    const onSubmit = (todoToSubmit: TodoModel) => {
        const mutateFn = isEdit ? updateTodoMutation.mutate : createTodoMutation.mutate;
        mutateFn(todoToSubmit, {
            onSuccess: () => navigate(pages.todo.path),
        });
        setTodo(undefined);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {createTodoMutation.error && (
                <ActionError onClose={() => createTodoMutation.reset()}>
                    {errorMessages.todo.create}
                </ActionError>
            )}
            {updateTodoMutation.error && (
                <ActionError onClose={() => updateTodoMutation.reset()}>
                    {errorMessages.todo.update}
                </ActionError>
            )}
            <FormContainer>
                <FormHeader>
                    {isEdit ? 'Edit To Do' : 'Create To Do' }
                </FormHeader>
                <FormContent>
                    <div>
                        <Label className='mb-2' htmlFor='title'>
                            Label
                        </Label>
                        <TextInput id='title' type='text' placeholder='Title' {...register('title', { required: true })} />
                        {errors.title && (<InputError>This field is required</InputError>)}
                    </div>
                    <div className='flex items-center gap-3'>
                        <input id='isDone' type='checkbox' {...register('isDone')} />
                        <Label htmlFor='isDone'>Done</Label>
                    </div>
                </FormContent>
                <div className='flex justify-end mt-6'>
                    <Button type='submit' $variant='secondary'>
                        Save
                    </Button>
                </div>
            </FormContainer>
        </form>
    )
};

export default TodoForm;
