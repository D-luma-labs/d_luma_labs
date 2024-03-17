import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Importing the hamburger menu icon from Feather Icons

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-black'>
            <div className="fixed left-0 top-0 h-screen bg-black z-40 opacity-50 transition-opacity duration-300" onClick={toggleSidebar} style={{ visibility: isOpen ? 'visible' : 'hidden' }}></div>
            <div className={`fixed left-0 top-0 h-full bg-white z-50 w-64 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar} className="focus:outline-none">
                        <FiMenu className="w-8 h-8 text-black" />
                    </button>
                </div>
                <nav className="px-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="http://localhost:3000" className="text-gray-800 hover:text-black">Community</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/dapps" className="text-gray-800 hover:text-black">DApps</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 hover:text-black">Buying Tokens</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/generated-article" className="text-gray-800 hover:text-black">AI generated Articles</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 hover:text-black">Blogs Landing Page</a>
                        </li>
                        {/* Add more navigation links as needed */}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
