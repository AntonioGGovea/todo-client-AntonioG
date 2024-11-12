import Button from '../../components/Button';
import { UserModel } from '../../interfaces';
import { useRegisterMutation } from '../../services/controllerBaseQueries/auth';
import { useNavigate } from 'react-router-dom';
import { StyledLoginButtonContainer } from './styled';
import { pages } from '../../constants';
import LoginForm from '../../components/LoginForm';

const Register = () => {
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();

    const onSubmit = (user: UserModel) => {
        registerMutation.mutate(user, {
            onSuccess: () => navigate(pages.todo.path),
        });
    };

    return (
        <LoginForm onSubmit={onSubmit}>
            <StyledLoginButtonContainer>
                <Button className='w-fit' type='submit'>
                    Register
                </Button>
                <Button
                    onClick={() => navigate('/login')}
                    className='w-fit'
                    type='button'
                    $color='secondary'
                    $variant='text'
                >
                    Login
                </Button>
            </StyledLoginButtonContainer>
        </LoginForm>
    );
}

export default Register;
