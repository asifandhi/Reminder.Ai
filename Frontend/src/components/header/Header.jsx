import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from "../../store/authSlice.js"
import { logoutUser } from '../../api/auth.js'
import Button from '../bacisComponets/Button.jsx'
import { useState } from 'react'

function Header() {
    const dispatch = useDispatch();
    const { status, userData } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md  border-b border-white/10 shadow-xl bg-gray-950"            
        >
            <div className="flex justify-between items-center max-w-300    px-1 sm:px-4 md:px-6 h-12">

                <Link to="/">
                    <span className=" font-bold text-xl sm:text-3xl  md:text-4xl   tracking-tighter"
                        style={{ color: "white" }}
                    >
                        Re-Mind
                    </span>
                </Link>

                <div className="flex items-center gap-4"> 

                    {status ? (
                        <>
                            <span className=" text-sm font-semibold"
                                style={{ color: "#bbc9cf" }}
                            >
                                {userData?.name}
                            </span>

                            <Link to="/settings">
                                <Button variant="ghost" className="hidden sm:block text-sm rounded-full px-4 py-2">
                                    Settings
                                </Button>
                            </Link>

                            <Button
                                variant="cta"
                                className="hidden sm:block text-sm rounded-full px-6 py-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            
                            <Link to="/login">
                                <Button variant="ghost" className=" hidden sm:block text-sm rounded-full px-4 py-2">
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button variant="cta" className=" hidden sm:block text-sm rounded-full px-6 py-2">
                                    Sign Up
                                </Button>
                            </Link>
                            
                        </>
                    )}

                    <button type="button" command="--toggle" onClick={toggleMenu} commandfor="mobile-menu" className="relative sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
                                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                </div>
            </div>
            {isMenuOpen && (


                <div className="sm:hidden">
                    {status ? (
                        <>
                            

                            <div className='flex flex-col gap-2 mb-2 ml-0.5'>
                                <Link  to="/settings">
                                <Button
                                variant="cta"
                                className='bg-transparent px-3 w-[25%]  rounded hover:bg-blue-300 hover:text-black'
                                >Settings </Button>
                            </Link>

                            <Button
                                variant="cta"
                                className='bg-transparent px-3 w-[25%]  rounded hover:bg-blue-300 hover:text-black'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col justify-center px-1 gap-1.5  mb-1 '>
                                <Link className='bg-transparent px-3 w-[25%]  rounded hover:bg-blue-300 hover:text-black'  to="/login">
                                Login
                            </Link>

                            <Link className='bg-transparent px-3 w-[25%]  rounded hover:bg-blue-300 hover:text-black' to="/signup">
                               Sign up
                            </Link>
                            </div>
                            
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Header