import React from 'react';

const DappPreviewCard = ({ dapp }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{dapp.name}</h2>
        <p className="text-gray-600">{dapp.description}</p>
      </div>
      <div className="flex justify-center mt-4">
        <a href={dapp.link} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Visit Dapp</a>
      </div>
    </div>
  );
};

export default DappPreviewCard;
