import {
  Execute,
  createClient,
  getClient,
  reservoirChains,
} from '@reservoir0x/reservoir-sdk';
import axios from 'axios';
import React, { useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { useAuthContext } from './Auth';

const collection = {
  slug: 'beanzofficial',
  contractAddress: '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949',
};

export const Main = () => {
  const { walletAddress } = useAuthContext();
  const [bestPrice, setBestPrice] = React.useState<any>(null);

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
    if (!bestPrice) return;
    try {
      const wallet = createWalletClient({
        account: walletAddress,
        transport: custom(window.coin98?.provider),
      });

      await getClient()?.actions.buyToken({
        items: [
          {
            token: `${collection.contractAddress}:${bestPrice.tokenId}`,
            quantity: 1,
          },
        ],
        wallet,
        onProgress: (steps: Execute['steps']) => {
          console.log(steps);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getList = async () => {
    const options = {
      method: 'GET',
      url: `https://blur.p.rapidapi.com/v1/collections/${collection.slug}/prices`,
      params: {
        filters: '{"traits":[],"hasAsks":true}',
      },
      headers: {
        'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
        'x-rapidapi-host': 'blur.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setBestPrice(response.data?.nftPrices?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
    initClient();
  }, []);

  return <button onClick={buyBlur}>Buy Blur</button>;
};
