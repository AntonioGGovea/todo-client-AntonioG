import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { UserModel } from '../../interfaces';
import { TextInput } from '../../components/Inputs';
import { useLoginMutation } from '../../services/controllerBaseQueries/auth';
import { useNavigate } from 'react-router-dom';
import { InputError } from '../../components/Errors';
import { FormContainer, FormContent, FormHeader } from '../../components/FormLayout';
import Label from '../../components/Label';
import { StyledLoginButtonContainer, StyledLoginCard } from './styled';
import pages from '../../constants';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    // TODO: Register
    const onSubmit = (user: UserModel) => {
        loginMutation.mutate(user, {
            onSuccess: () => navigate(pages.todo.path),
        });
    }

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
                                {errors.email && (<InputError>This field is required</InputError>)}
                            </div>
                            <div>
                                <Label className='mb-2' htmlFor='label'>Password</Label>
                                <TextInput
                                    id='label'
                                    type='password'
                                    {...register('password', { required: true, minLength: 4 })}
                                />
                                {errors.password && (<InputError>This field is required</InputError>)}
                            </div>
                        </FormContent>
                        <StyledLoginButtonContainer>
                            <Button className='w-fit' type='submit' $variant='primary'>
                                Login
                            </Button>
                            <Button className='w-fit' type='submit' $variant='secondary'>
                                Register
                            </Button>
                        </StyledLoginButtonContainer>
                    </FormContainer>
                </StyledLoginCard>
            </div>
        </form>
    );
}

export default Login;
