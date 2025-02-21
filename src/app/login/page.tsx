'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
});

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = (data: { email: string, password: string }) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-8">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg ">
                <h2 className="text-3xl font-medium mb-4 text-black_color">Login</h2>
                <p className='font-normal text-[#6c757d] tracking-wider'>Welcome back! Please enter your username and</p>
                <p className='font-normal text-[#6c757d] tracking-wider'>password to login.</p>



                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className='space-y-3'>
                        

                        <div>

                            <input
                                type="email"
                                placeholder='E-mail address'
                                {...register('email')}
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder='Password'
                                {...register('password')}
                                className="w-full mt-1 p-2  border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-primary_color mt-8 text-white rounded-md "
                    >
                        Login
                    </button>
                </form>
                <p className='font-normal text-[#6c757d] tracking-wider mt-7'>Are you create new account?please <Link href='/register'  className='text-primary_color'>Register</Link> </p>
            </div>
        </div>
    );
}
