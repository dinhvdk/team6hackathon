import { useState } from 'react'


export const SearchNFT = ({onChange}) => {

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75L19.5 19.5m-4.455-7.26a6.75 6.75 0 11-9.547 9.547 6.75 6.75 0 019.547-9.547z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Search by nft address"
        // value={searchText}
        onChange={onChange}
      />
    </div>
  );
}