import { PropsWithChildren } from 'react';
import { StyledLoginCard } from './styled';
import { FormContainer, FormContent, FormHeader } from '../FormLayout';
import Label from '../Label';
import { TextInput } from '../Inputs';
import { InputError } from '../Errors';
import { useForm } from 'react-hook-form';
import { UserModel } from '../../interfaces';

interface LoginFormProps {
    onSubmit: (user: UserModel) => void;
}

const LoginForm = ({ children, onSubmit }: PropsWithChildren<LoginFormProps>) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full h-screen bg-cyan-50'>
                <StyledLoginCard>
                    <FormContainer>
                        <FormHeader>Welcome</FormHeader>
                        <FormContent>
                            <div>
                                <Label className='mb-2' htmlFor='label'>Email</Label>
                                <TextInput id='label' type='text' placeholder='email' {...register('email', { required: true })} />
                                {errors.email?.type === 'required' && (<InputError>This field is required.</InputError>)}
                            </div>
                            <div>
                                <Label className='mb-2' htmlFor='label'>Password</Label>
                                <TextInput
                                    id='label'
                                    type='password'
                                    {...register('password', { required: true, minLength: 4 })}
                                />
                                {errors.password?.type === 'required' && (<InputError>This field is required</InputError>)}
                                {errors.password?.type === 'minLength' && (<InputError>This field should have at least three characters.</InputError>)}
                            </div>
                        </FormContent>
                        {children}
                    </FormContainer>
                </StyledLoginCard>
            </div>
        </form>
    );
}

export default LoginForm;
