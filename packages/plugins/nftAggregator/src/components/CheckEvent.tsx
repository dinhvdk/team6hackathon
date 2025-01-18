import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { fakeWl } from './Fake';

const initialState: any = {};

const Context = createContext<any>({ ...initialState });

export const useEmitContext = () => useContext<any>(Context);

let timeout: any;
export const Events = ({ children, collectionsData }: any) => {
  const [events, setEvents] = React.useState<any>([]);

  const checkOffer = async (collection: any) => {
    console.log(collection);
    const options = {
      method: 'GET',
      url: `https://blur.p.rapidapi.com/v1/collections/${collection.collectionSlug}/executable-bids`,
      params: { filters: '{}' },
      headers: {
        'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
        'x-rapidapi-host': 'blur.p.rapidapi.com',
      },
    };

    // const options2 = {
    //   method: 'GET',
    //   url: `https://opensea15.p.rapidapi.com/api/v2/offers/collection/${collection.collectionSlug}/all`,
    //   headers: {
    //     'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
    //     'x-rapidapi-host': 'opensea15.p.rapidapi.com',
    //   },
    // };

    try {
      const response = await axios.request(options);
      // const response2 = await axios.request(options2);

      const floorPrice = BigInt(Number(collection.floorPrice) * 10 ** 18);

      const bestBid = BigInt(
        Number(response.data.priceLevels?.[0]?.price) * 10 ** 18
      );

      if (floorPrice < bestBid) {
        const event = {
          collection: collection.name,
          floorPrice: collection.floorPrice,
          bestBid: response.data.priceLevels?.[0]?.price,
          imageUrl: collection.imageUrl,
        };

        // MODAL NICE TRADE
        setEvents((prev: any) => [...prev, event]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (timeout) {
      clearInterval(timeout);
    }

    if (fakeWl.length > 0) {
      fakeWl.forEach((collection: any) => {
        checkOffer(collection);
      });

      timeout = setInterval(() => {
        fakeWl.forEach((collection: any) => {
          checkOffer(collection);
        });
      }, 30 * 1000);
    }
  }, []);

  const value: any = {
    events,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
