import React from 'react';
import Link from 'next/link';
import { Logo } from "./Icons";
import MobileNav from './MainMenuNav';

const LandingPageHeader = () => {
    return (
        <header className="bg-gradient-to-b from-blue-100 sticky to-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-6">
                {/* Logo */}
                <div className="flex-shrink-0 mr-4">
                    <Logo />
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex space-x-4">
                    {/* Navigation Links */}
                    <ul className="flex items-center space-x-6 text-sm font-semibold">
                        <NavItem href="/">Home</NavItem>
                        <NavItem href="/community">Community</NavItem>
                        <NavItem href="/tool-store">Tool Store</NavItem>
                        <NavItem href="/dapps">D-App-Store</NavItem>
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
};

// Navigation Link Component
const NavItem = ({ href, children }) => {
    return (
        <li>
            <Link href={href} className="text-gray-800 hover:text-blue-500 text-2xl transition duration-300">
                {children}
            </Link>
        </li>
    );
};

export default LandingPageHeader;
