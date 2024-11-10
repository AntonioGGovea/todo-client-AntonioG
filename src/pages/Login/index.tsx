import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { UserModel } from '../../interfaces';
import { TextInput } from '../../components/Inputs';
import { useLoginMutation } from '../../services/controllerBaseQueries/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();


    const onSubmit = (user: UserModel) => {
        loginMutation.mutate(user, {
            onSuccess: () => navigate("/todo"),
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full h-screen bg-cyan-50'>
                <div className='w-full max-w-96 absolute left-1/2 -translate-x-1/2 mt-24 rounded shadow-xl p-5 bg-white'>
                    <div className='pb-8'>
                        <h2 className='text-2xl font-semibold'>
                            Welcome
                        </h2>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="label">
                                Email
                            </label>
                            <TextInput id="label" type="text" placeholder="Label" {...register("email", { required: true })} />
                            {errors.email && (<span className="text-red-500 text-xs">This field is required</span>)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="label">
                                Password
                            </label>
                            <TextInput id="label" type="password" placeholder="Label" {...register("password", { required: true, minLength: 4 })} />
                            {errors.password && (<span className="text-red-500 text-xs">This field is required</span>)}
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-6 mt-6'>
                        <Button className='w-fit' type="submit" $variant='primary'>
                            Login
                        </Button>
                        <Button className='w-fit' type="submit" $variant='secondary'>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
