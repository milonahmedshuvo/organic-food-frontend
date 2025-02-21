'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useUserRegisterMutation } from '@/redux/api/foodApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    role: z.enum(['customer', 'admin'], { message: 'Invalid role' })
});

export default function RegisterForm() {
    const {register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    const Router = useRouter()
    const [userRegister, { data, isSuccess, isError, error:registionError } ] = useUserRegisterMutation()



    useEffect(()=> {
      if(isSuccess){
        toast.success('Sign-up Successfull!!')
        console.log(data)
        if(data?.status){
            localStorage.setItem('accessToken', data?.data?.accessToken)
        }
        Router.push('/')
      }
      if(isError){
        toast.error('Sign-up failed. Please try again.')
        console.log(registionError)
      }
    }, [isSuccess, isError])





    const onSubmit = (data: { name: string, email: string, password: string, role : 'customer' | 'admin' }) => {
        console.log(data);

        const userData = {
            name : data.name,
            email: data.email,
            password: data.password,
            role : data.role
        }
        userRegister({data: userData})
    };




    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg ">
                <h2 className="text-3xl font-medium mb-4 text-black_color">Register</h2>
                <p className='font-normal text-[#6c757d] tracking-wider'>Create new account today to reap the benefits of a</p>
                <p className='font-normal text-[#6c757d] tracking-wider'>personalized shopping experience.</p>



                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className='space-y-3'>
                        <div>
                            <input
                                type="text"
                                placeholder='Username'
                                {...register('name')}
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none "
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

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

                         {/* Role Dropdown */}
                         <div>
                            <select
                                {...register('role')}
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            >
                                <option value="" className='text-gray-300' >Select Role</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-primary_color mt-8 text-white rounded-md "
                    >
                        Register
                    </button>
                </form>
                <p className='font-normal text-[#6c757d] tracking-wider mt-7'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy. <Link href= "/login" className='text-red-500'>Login</Link> </p>
            </div>
        </div>
    );
}
