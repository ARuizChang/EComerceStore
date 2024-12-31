import { useState, useEffect } from 'react';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Package, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
                <header 
                    className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
                        scrolled 
                            ? 'bg-gray-900/90 backdrop-blur shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10' 
                            : 'bg-gray-900/50 backdrop-blur-sm'
                    }`}
                >
                    <div className="px-4 py-3 lg:px-6">
                        <div className="flex items-center justify-between">
                            {/* Logo Section */}
                            <Link 
                                to="/" 
                                className="flex items-center space-x-2 shrink-0 group"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Package className="h-8 w-8 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    E-Commerce
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-2">
                                <Link 
                                    to="/"
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                                        isActive('/') 
                                            ? 'bg-cyan-500/20 text-white' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                >
                                    Home
                                </Link>

                                {user && (
                                    <Link 
                                        to="/cart"
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 relative ${
                                            isActive('/cart') 
                                                ? 'bg-cyan-500/20 text-white' 
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <ShoppingCart className="h-5 w-5" />
                                            <span>Cart</span>
                                        </span>
                                        {cart.length > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                                                {cart.length}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link 
                                        to="/admin-dashboard"
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                                            isActive('/admin-dashboard') 
                                                ? 'bg-cyan-500/20 text-white' 
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            <span>Dashboard</span>
                                        </span>
                                    </Link>
                                )}

                                <div className="ml-4 flex items-center gap-2">
                                    {user ? (
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-all hover:scale-105"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    ) : (
                                        <>
                                            <Link
                                                to="/signup"
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-xl hover:bg-cyan-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                                            >
                                                <UserPlus className="h-4 w-4" />
                                                <span>Sign Up</span>
                                            </Link>
                                            <Link
                                                to="/login"
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-all hover:scale-105"
                                            >
                                                <LogIn className="h-4 w-4" />
                                                <span>Login</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden rounded-xl p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div
                        className={`lg:hidden overflow-hidden transition-all duration-300 ${
                            mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
                        }`}
                    >
                        <div className="px-4 py-4 space-y-4 border-t border-white/10">
                            <Link
                                to="/"
                                className={`block px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                                    isActive('/') 
                                        ? 'bg-cyan-500/20 text-white' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {user && (
                                <Link
                                    to="/cart"
                                    className={`block px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                                        isActive('/cart') 
                                            ? 'bg-cyan-500/20 text-white' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        <span>Cart</span>
                                        {cart.length > 0 && (
                                            <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {cart.length}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            )}

                            {isAdmin && (
                                <Link
                                    to="/admin-dashboard"
                                    className={`block px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                                        isActive('/admin-dashboard') 
                                            ? 'bg-cyan-500/20 text-white' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </span>
                                </Link>
                            )}

                            <div className="pt-4 border-t border-white/10">
                                {user ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <div className="flex flex-col space-y-3">
                                        <Link
                                            to="/signup"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-cyan-600 rounded-xl hover:bg-cyan-500 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            <span>Sign Up</span>
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <LogIn className="h-4 w-4" />
                                            <span>Login</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            
            {/* Spacer */}
            <div className="h-[76px]" />
        </>
    );
};

export default Navbar;