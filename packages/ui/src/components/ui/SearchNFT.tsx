export const SearchNFT = ({ onChange }: any) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 488.4 488.4">
          <g>
            <g>
              <path
                d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z"
              />
            </g>
          </g>
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Search NFT"
        onChange={onChange}
      />
    </div>
  )
}
