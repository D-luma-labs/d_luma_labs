// // Card.jsx
// import React from 'react';
// import Image from 'next/image';
// const Card = ({ dapp }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//       <img src={dapp.logo} alt={dapp.name} quality={100} className="w-full h-30 mx-auto mb-4" />
//       <h2 className="text-xl font-semibold text-center mb-2">{dapp.name}</h2>
//       <p className="text-gray-600 text-center">{dapp.description}</p>
//       <div className="flex justify-center mt-4">
//         <a href={dapp.link} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Visit Dapp</a>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from 'react';

const Card = ({ dapp }) => {

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {dapp.logo ? (
        <img src={dapp.logo} alt={dapp.name} className="w-full h-26 object-cover object-center" />
      ): (
        <img src={`https://placehold.it/200x150`} alt={dapp.name} className="w-full h-26 object-cover object-center" />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dapp.name}</h2>
        <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: truncateDescription(dapp.fullDescription || '', 150) }}></p>
        <div className="flex justify-center">
          <a href={dapp.link} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Visit Dapp</a>
        </div>
      </div>
      <div className="p-4 bg-gray-100 border-t border-gray-200">
        <ul className="flex justify-center">
          {dapp.socialLinks.map((socialLink, index) => (
            <li key={index} className="mx-2">
              <a
                href={socialLink.url}
                className="text-gray-600 hover:text-gray-900 transition duration-300"
                title={socialLink.title}
              >
                {socialLink.type}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-2">
          <a href={dapp.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {dapp.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

