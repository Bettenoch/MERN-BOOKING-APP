import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';

export type SignInFormData = {
    email: string;
    password: string;  
}

const SignIn = () => {
    const { register, handleSubmit, formState:{errors} } = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: () => {
            console.log("User signed In")
        },
        onError: (error: Error)=> {
            console.log("User not signed In")
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    return (
        <form action="" className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold"> Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register('email', { required: 'This field is required' })} />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register('password', {
                    required: 'This field is required', minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long'
                    }
                })} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
        </form>
    );
};

export default SignIn;