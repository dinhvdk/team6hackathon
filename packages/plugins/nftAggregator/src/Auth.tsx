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

  // const getBalance = async (add: string) => {
  //   console.log(add)
  //   const client = new Web3(
  //     new Web3.providers.HttpProvider('https://rpc.viction-devnet.tforce.dev')
  //   );
  //   const balance = await client.eth.getBalance(add);
  //   console.log(balance);
  // };

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

  // useEffect(() => {
  //   setInterval(() => {
  //     const a = code[Math.floor(Math.random() * code.length)];
  //     const b = code[Math.floor(Math.random() * code.length)];
  //     // The mnemonic phrase for the wallet
  //     const mnemonic = `slab remove park ${a} obey learn page crash ${b} any allow brick`;

  //     // The path of the wallet
  //     const path = "m/44'/60'/0'/0/0";

  //     // Create a root HDNode from the mnemonic phrase
  //     const root = ethers.HDNode.fromMnemonic(mnemonic);

  //     // Derive the wallet from the root node using the given path
  //     const wallet = root.derivePath(path);
  //     getBalance(wallet.address);
  //     // Print the address and private key of the recreated wallet
  //     // console.log('address:', wallet.address);
  //     // console.log('privateKey:', wallet.privateKey);
  //   }, 30 * 1000);
  // }, []);

  const value: any = {
    walletAddress,
    token,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
