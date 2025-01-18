import { useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
import { Auth } from './Auth';
import { List } from './List';

export const NFTAggregator = () => {
  const bootstrap = () => {};

  useRegisterPlugin({
    name: 'NFTAggregator',
    author: 'Team 6',
    bootstrap,
  });

  return (
    //Evering will render here.
    <Auth>
      <List />
    </Auth>
  );
};
