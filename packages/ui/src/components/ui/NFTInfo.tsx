import React from 'react';
const nftDefault = {
  creator: "Perperzon",
  title: "Future of Polygon X",
  description:
    "A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.",
  lastBid: 3.421,
  timeLeft: "04 : 45 : 32",
  imageUrl: "https://dagora.xyz/_next/image?url=https%3A%2F%2Fcoin98.s3.ap-southeast-1.amazonaws.com%2FNFTs%2Fstarship.gif&w=3840&q=75",
  collectionImage: "https://inventory.coin98.com/images/1702878809573-tomo-0x8c630bd3a6b58fd26f246e5eb74837ffcce6c5be-logo_120x120.png"
};
export const NFTInfo: React.FC = ({nft}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img
          className="w-full h-60 object-cover"
          src={nft.imageUrl}
          alt={nft.title}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={nft.collectionImage}
            alt="creator avatar"
          />
          <div>
            {/*<h4 className="text-sm text-gray-500">Created by</h4>*/}
            <h3 className="text-md font-medium text-gray-800">{nft.title}</h3>
          </div>
        </div>
        <div className={'flex flex-wrap'}>
          {
            nft.traits && Object.keys(nft.traits).map((key,index)=>(
              <div key={index} className={'bg-gray-200 text-gray-800 rounded-md px-2 py-1 mr-2 mb-2'}>
                <div>{key}</div>
                <div>{nft.traits[key]}</div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-between items-center border-t pt-4">

          {/*<div>*/}
          {/*  <h4 className="text-xs text-gray-500">Action ending in</h4>*/}
          {/*  <p className="text-md font-bold text-gray-900">{nft.timeLeft}</p>*/}
          {/*</div>*/}
        </div>
        <button className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500">
         Buy now {Number(nft.price)/1e18} ETH
        </button>
      </div>
    </div>
  );
};

