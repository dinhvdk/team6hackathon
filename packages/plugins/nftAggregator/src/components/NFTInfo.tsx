import {
  Execute,
  createClient,
  getClient,
  reservoirChains,
} from '@reservoir0x/reservoir-sdk';
import React, { useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { useAuthContext } from '../Auth';

export const NFTInfo: React.FC = ({ nft }: any) => {
  const { walletAddress } = useAuthContext();

  const initClient = async () => {
    createClient({
      chains: [
        {
          ...reservoirChains.mainnet,
          active: true,
        },
      ],
      source: 'core-api.prod.blur.io',
      apiKey: 'core-api.prod.blur.io',
    });
  };

  const buyBlur = async () => {
    try {
      const wallet = createWalletClient({
        account: walletAddress,
        transport: custom(window.coin98?.provider),
      });

      await getClient()?.actions.buyToken({
        items: [
          {
            token: `${nft.contractAddress}:${nft.tokenId}`,
            quantity: 1,
          },
        ],
        // options: {
        //   skipBalanceCheck: true,
        // },
        wallet,
        onProgress: (steps: Execute['steps']) => {
          console.log(steps);
        },
      });
    } catch (error: any) {
      alert(`Error buying NFT: Insufficient funds`);
    }
  };

  useEffect(() => {
    initClient();
  }, []);

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
            <h3 className="text-md font-medium text-gray-800">{nft.title}</h3>
          </div>
        </div>
        <div className={'flex flex-wrap'}>
          {nft.traits &&
            Object.keys(nft.traits).map((key, index) => (
              <div
                key={index}
                className={
                  'bg-gray-200 text-gray-800 rounded-md px-2 py-1 mr-2 mb-2'
                }
              >
                <div>{key}</div>
                <div>{nft.traits[key]}</div>
              </div>
            ))}
        </div>
        <div className="flex justify-between items-center border-t pt-4"></div>
        <button
          className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500"
          onClick={buyBlur}
        >
          Buy now {Number(nft.price) / 1e18} ETH
        </button>
      </div>
    </div>
  );
};
