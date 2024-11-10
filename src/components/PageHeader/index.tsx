import { useLocation } from 'react-router-dom';
import Button from '../Button';
import { StyledPageHeader, StyledPageHeaderContainer } from './styled';

const PageHeader = () => {
    const location = useLocation();

    // const pageTitle = location
    console.log('loc', location)

    return (
        <StyledPageHeaderContainer>
            <StyledPageHeader>
                To Do
            </StyledPageHeader>
            <Button type='button' $variant='text'>
                Logout
            </Button>
        </StyledPageHeaderContainer>
    )
};

export default PageHeader;
