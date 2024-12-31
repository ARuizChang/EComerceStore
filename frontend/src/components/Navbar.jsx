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
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children, className = "" }) => (
        <Link
            to={to}
            className={`relative group px-3 py-2 rounded-lg ${
                isActive(to)
                    ? 'text-white bg-cyan-500/20'
                    : 'text-gray-300 hover:text-white'
            } transition-all duration-300 ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <span className="absolute inset-0 bg-cyan-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
        </Link>
    );

    const ActionButton = ({ children, onClick, variant = "primary", className = "" }) => {
        const baseStyles = "relative overflow-hidden rounded-xl px-6 py-2.5 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95";
        const variants = {
            primary: "bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white",
            secondary: "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white",
            danger: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
        };

        return (
            <button
                onClick={onClick}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </button>
        );
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
            scrolled 
                ? 'bg-gray-900/85 backdrop-blur-2xl shadow-2xl border-b border-white/5' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Package className="w-8 h-8 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        </div>
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                            E-Commerce
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <NavLink to="/">Home</NavLink>
                        
                        {user && (
                            <NavLink to="/cart" className="flex items-center">
                                <ShoppingCart className="w-5 h-5" />
                                <span>Cart</span>
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                        {cart.length}
                                    </span>
                                )}
                            </NavLink>
                        )}

                        <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                            {isAdmin && (
                                <NavLink to="/admin-dashboard">
                                    <Lock className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </NavLink>
                            )}

                            {user ? (
                                <ActionButton variant="secondary" onClick={logout}>
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </ActionButton>
                            ) : (
                                <>
                                    <Link to="/signup" className="relative inline-flex group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl">
                                        <span className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                                        <span className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                                            <UserPlus className="w-4 h-4" />
                                            <span>Sign Up</span>
                                        </span>
                                    </Link>
                                    <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                                        <LogIn className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav className={`md:hidden absolute w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <NavLink to="/">Home</NavLink>
                    {user && (
                        <NavLink to="/cart">
                            <ShoppingCart className="w-5 h-5" />
                            <span>Cart ({cart.length})</span>
                        </NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/admin-dashboard">
                            <Lock className="w-4 h-4" />
                            <span>Dashboard</span>
                        </NavLink>
                    )}
                    {user ? (
                        <ActionButton variant="secondary" onClick={logout} className="w-full justify-center">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </ActionButton>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link to="/signup" className="w-full inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-xl text-white font-medium transition-all duration-300">
                                <UserPlus className="w-4 h-4" />
                                <span>Sign Up</span>
                            </Link>
                            <Link to="/login" className="w-full inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-all duration-300">
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;