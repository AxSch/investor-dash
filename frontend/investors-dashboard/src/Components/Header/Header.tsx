import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">InvestmentDash</h1>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/" className="hover:text-gray-200">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-gray-200">
                                    Investments
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-gray-200">
                                    Analytics
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-gray-200">
                                    Reports
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <nav className="md:hidden mt-4">
                        <ul className="flex items-center flex-col space-y-2">
                            <li>
                                <Link to="/" className="block px-4 py-2 hover:bg-blue-500">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-4 py-2 hover:bg-blue-500">
                                    Investments
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-4 py-2 hover:bg-blue-500">
                                    Analytics
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="block px-4 py-2 hover:bg-blue-500">
                                    Reports
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
            <Outlet />
        </>
    );
};

export default Header;

