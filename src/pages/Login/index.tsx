import Button from '../../components/Button';
import { UserModel } from '../../interfaces';
import { useLoginMutation } from '../../services/controllerBaseQueries/auth';
import { useNavigate } from 'react-router-dom';
import { StyledLoginButtonContainer } from './styled';
import { pages } from '../../constants';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const onSubmit = (user: UserModel) => {
        loginMutation.mutate(user, {
            onSuccess: () => navigate(pages.todo.path),
        });
    };

    return (
        <LoginForm onSubmit={onSubmit}>
            <StyledLoginButtonContainer>
                <Button className='w-fit' type='submit'>
                    Login
                </Button>
                <Button
                    onClick={() => navigate('/register')}
                    className='w-fit'
                    type='button'
                    $color='secondary'
                    $variant='text'
                >
                    Register
                </Button>
            </StyledLoginButtonContainer>
        </LoginForm>
    );
}

export default Login;
