import { ModalInfoNFT, TableNFTs, TableWatchList } from '@repo/ui';
import React from 'react';
import { useAuthContext } from './Auth';
import { ModalEvent } from '@repo/ui'

export const List = () => {
  const { walletAddress } = useAuthContext();

  return (
    <>
      <h1 className="mb-4">Watch List </h1>
      <TableWatchList address={walletAddress} />

      <h1 className="my-4">Market NFT</h1>

      <TableNFTs address={walletAddress} />
      <ModalInfoNFT />
      <ModalEvent/>
    </>
  );
};
