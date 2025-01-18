import { get } from 'lodash'
import React, { useEffect } from 'react'
import {
  getDataBest,
  getDataOpenSea,
  getDataWatchList,
  getNFTDetail,
  getPrices,
  removeFromWatchlist,
} from '../../apis.ts'
import { Button } from './button.tsx'

export const TableWatchList = ({ address }: { address: string }) => {
  const [collectionsData, setCollectionsData] = React.useState([])
  useEffect(() => {
    fetchCollectionsData()
  }, [address])
  const fetchCollectionsData = async () => {
    if (!address) {
      return
    }
    const data = await getDataWatchList(address)
    let collectionsToProcess = get(data, 'collections', []).slice(0, 5)
    const enhancedCollections = await Promise.all(
      collectionsToProcess.map(async (collection) => {
        const openSeaData = await getDataOpenSea(collection.contractAddress)
        const bestListingData = await getDataBest(openSeaData.collection)
        return { ...collection, openSea: { ...bestListingData } }
      }),
    )
    setCollectionsData(enhancedCollections)
  }

  const handleBuy = async (collection) => {
    const nftDefault = {
      creator: 'Perperzon',
      title: 'Future of Polygon X',
      description:
        'A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.',
      lastBid: 3.421,
      timeLeft: '04 : 45 : 32',
      imageUrl:
        'https://dagora.xyz/_next/image?url=https%3A%2F%2Fcoin98.s3.ap-southeast-1.amazonaws.com%2FNFTs%2Fstarship.gif&w=3840&q=75',
      collectionImage:
        'https://inventory.coin98.com/images/1702878809573-tomo-0x8c630bd3a6b58fd26f246e5eb74837ffcce6c5be-logo_120x120.png',
    }
    // getNFTDetail
    const priceOpenSea = BigInt(get(collection.openSea, 'listings[0].price.current.value', 0))
    const priceBlur = BigInt(get(collection, 'floorPrice.amount', 0) * 10 ** 18)

    const prices = await getPrices(collection.collectionSlug)
    const tokenId = await get(prices, 'nftPrices[0].tokenId', '')
    const detail = await getNFTDetail(collection.contractAddress, tokenId)
    const nft = {
      creator: '',
      title: get(detail, 'token.name', ''),
      description: '',
      price: priceOpenSea < priceBlur ? priceOpenSea : priceBlur,
      imageUrl: get(detail, 'token.imageUrl', ''),
      collectionImage: collection.imageUrl,
      traits: get(detail, 'token.traits', []),
    }
    window.openModalNft(nft)
    // Your logic to handle the purchase here
  }

  const getOpenSeaPrice = (collection) => {
    return Number(get(collection.openSea, 'listings[0].price.current.value', 0)) / 1e18
  }

  const removeWatchList = async (collection) => {
    await removeFromWatchlist(address, collection.contractAddress)
  }
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Listed
            </th>
            <th scope="col" className="px-6 py-3">
              Volume/day
            </th>
            <th scope="col" className="px-6 py-3">
              Price Blur/Opensea
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Buy now
            </th>
          </tr>
        </thead>
        <tbody>
          {collectionsData.map((collection, index) => (
            <tr key={index} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-white">
                <div className={'flex items-center gap-4'}>
                  <img src={collection.imageUrl} alt={collection.name} width={30} height={30} />
                  <span>{collection.name} </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {collection.volumeOneDay.amount} {collection.volumeOneDay.unit}
              </td>

              <td className={'px-6 py-4'}>
                {get(collection, 'floorPrice.amount', 0)} / {getOpenSeaPrice(collection)}{' '}
                {get(collection, 'floorPrice.unit', '')}
              </td>
              <td className={'px-6 py-4'}>
                <Button onClick={() => removeWatchList(collection)}>Remove</Button>
              </td>
              <td className="px-6 py-4">
                <Button onClick={() => handleBuy(collection)}>Buy now</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
