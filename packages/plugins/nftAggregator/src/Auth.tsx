import axios from 'axios';
import React, { createContext, useContext, useEffect } from 'react';

const initialState: any = {};

const Context = createContext<any>({ ...initialState });

export const useAuthContext = () => useContext<any>(Context);

export const Auth = ({ children }: any) => {
  const [walletAddress, setWalletAddress] = React.useState('');
  const token =
    typeof localStorage.getItem('market-token') === 'string'
      ? JSON.parse(localStorage.getItem('market-token') || '')
      : '';

  const getAuth = async () => {
    const options = {
      method: 'POST',
      url: 'https://blur.p.rapidapi.com/auth/challenge',
      headers: {
        'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
        'x-rapidapi-host': 'blur.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        walletAddress,
      },
    };

    try {
      const response = await axios.request(options);
      const signature = await window.coin98?.provider.request({
        method: 'personal_sign',
        params: [response.data.message, walletAddress],
      });

      const optionsLogin = {
        method: 'POST',
        url: 'https://blur.p.rapidapi.com/auth/login',
        headers: {
          'x-rapidapi-key':
            'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
          'x-rapidapi-host': 'blur.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {
          ...response.data,
          signature,
        },
      };

      try {
        const response2 = await axios.request(optionsLogin);
        localStorage.setItem(
          'market-token',
          JSON.stringify(response2.data?.accessToken)
        );
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const response = await window?.coin98?.provider?.request({
      method: 'eth_requestAccounts',
    });

    if (response[0]) {
      setWalletAddress(response[0]);
    }
  };

  useEffect(() => {
    if (walletAddress && !token) {
      getAuth();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress) {
      connectWallet();
    }
  }, [walletAddress]);

  const value: any = {
    walletAddress,
    token,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
