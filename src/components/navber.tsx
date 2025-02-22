/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { PiUserLight } from 'react-icons/pi';
import logo from '../images/logonav.webp';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { store } from "../redux/store"
import { AuthState, User } from '@/types/authTypes';
import { logout } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [scrolling, setScrolling] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth) as AuthState
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const allState = useSelector((state: RootState) => state.cart);
    const products = useSelector((state: RootState) => state.cart.products);
    const productCount = useSelector((state: RootState) => state.cart.totalProductCount);

  



    useEffect(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            setCurrentUser(JSON.parse(storedData) as User);
        }
    }, [user?.email]);



    console.log({ currentUser })

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleLogout = () => {
        store.dispatch(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        setCurrentUser(null)
        toast.success('Logout successfull!!')
    }


    // F7ECB4
    return (
        <div className={`fixed w-full top-0 left-0 z-50 transition-all duration-300  ${scrolling ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <nav className="w-full py-5">
                <div className="px-3 md:px-14 lg:px-24">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-3'>
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-gray-700 hover:text-[#b19776] duration-500 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            <Link href="/">
                                <Image src={logo} height={100} width={160} alt='Logo' />
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center gap-8 font-medium">
                            <Link className="text-black duration-500" href="/">Home</Link>
                            <Link className="text-black duration-500" href="/shop">Shop</Link>

                            {
                                currentUser?.email && <Link className="text-black duration-500" href="/dashboard">Dashbord</Link>
                            }

                            {
                                currentUser?.email ? <Link onClick={handleLogout} className="text-black duration-500" href="/">Logout</Link> : <Link className="text-black duration-500" href="/login">Login</Link>

                            }


                        </div>

                        <div className="flex items-center gap-5">
                            <div className='hidden md:block'>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 w-64 rounded-full focus:outline-none border focus:ring-2 focus:ring-blue-500 "
                                    />
                                    <CiSearch className="absolute left-3 " />
                                </div>
                            </div>
                            <CiSearch className="block md:hidden text-2xl" />
                            <div className="relative">
                                <Link href='/cart' > 
                                <LiaShoppingBagSolid className="text-2xl cursor-pointer" />
                                {cartCount >= 0 && (
                                    <span className="absolute -top-3 -right-3 bg-primary_color text-white text-xs font-bold px-2 py-[3px] rounded-full">
                                        {productCount}
                                    </span>
                                )}
                                </Link>
                            </div>
                            <PiUserLight className="text-2xl cursor-pointer" />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link className="block text-gray-700 hover:text-textBlue duration-500 px-3 py-2 rounded-md text-base font-medium" href="/">Home</Link>
                            <Link className="block text-gray-700 hover:text-textBlue duration-500 px-3 py-2 rounded-md text-base font-medium" href="/shop">Shop</Link>
                            <Link className="block text-gray-700 hover:text-textBlue duration-500 px-3 py-2 rounded-md text-base font-medium" href="/deals">Deals</Link>
                            <Link className="block text-gray-700 hover:text-textBlue duration-500 px-3 py-2 rounded-md text-base font-medium" href="/new">What’s New</Link>
                            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b19776] duration-500">Sign In</button>
                            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-black text-white">Sign Up</button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
