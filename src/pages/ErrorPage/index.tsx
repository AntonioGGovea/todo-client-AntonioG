import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError() as Record<string, string | undefined>
    console.error(error);

    return (
        <div>
            <h4>Oops!</h4>
            <p>An unexpected error has occurred.</p>
            <p>
                <i>{error?.status}</i>
            </p>
        </div>
    )
};

export default ErrorPage;
