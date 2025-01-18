import { ModalInfoNFT, SearchNFT, TableNFTs, TableWatchList } from '@repo/ui';
import React from 'react';
import { useAuthContext } from './Auth';

export const List = () => {
  const { walletAddress } = useAuthContext();

  return (
    <>
      <h1>Watch List </h1>
      <TableWatchList address={walletAddress} />

      <h1>Market NFT</h1>
      <SearchNFT />
      <TableNFTs address={walletAddress} />
      <ModalInfoNFT />
    </>
  );
};
