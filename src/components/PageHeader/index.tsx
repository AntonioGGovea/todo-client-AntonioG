import Button from '../Button';
import { StyledPageHeader, StyledPageHeaderContainer } from './styled';
import { useLogout } from '../../hooks';

const PageHeader = () => {
    const logout = useLogout();

    return (
        <StyledPageHeaderContainer>
            <StyledPageHeader>
                To Do
            </StyledPageHeader>
            <Button type='button' $color='white' $variant='text' onClick={logout}>
                Logout
            </Button>
        </StyledPageHeaderContainer>
    )
};

export default PageHeader;
