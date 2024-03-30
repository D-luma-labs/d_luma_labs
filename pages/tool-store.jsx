import React from 'react';
import LandingPageHeader from '../components/LandingPageHeader';
const ToolStore = () => {
    return (
        <>
        <LandingPageHeader/>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
                    <p className="text-lg text-gray-600">Our tool store is currently under construction. Stay tuned for exciting updates!</p>
                </div>
            </div>
        </>
    );
};

export default ToolStore;
