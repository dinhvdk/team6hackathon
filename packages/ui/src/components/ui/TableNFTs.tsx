import { get } from 'lodash'
import React, { useEffect } from 'react'
import {
  addToWatchlist,
  getDataBest,
  getDataBlur,
  getDataOpenSea,
  getNFTDetail,
  getPrices
} from '../../apis.ts'
import { useDebounceCallback } from '../../hooks/useDebounceCallback.ts'
import { SearchNFT } from './SearchNFT.tsx'
import { Button } from './button.tsx'

export const TableNFTs = ({ address }: { address: string }) => {
  const [collectionsData, setCollectionsData] = React.useState([])

  const [collections, setCollections] = React.useState([])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    fetchCollectionsData('')
  }, [collections.length])

  const init = async () => {
    const data = await getDataBlur()
    const dataRes = get(data, 'collections', [])
    setCollections(dataRes)
  }

  const fetchCollectionsData = async (key: string) => {
    const collectionsData = collections.filter((collection) => collection.name.search(key) !== -1)
    const enhancedCollections = await Promise.all(
      collectionsData.slice(0, 5).map(async (collection) => {
        const openSeaData = await getDataOpenSea(collection.contractAddress)
        const bestListingData = await getDataBest(openSeaData.collection)

        return { ...collection, openSea: { ...bestListingData } }
      }),
    )
    setCollectionsData(enhancedCollections)
  }

  const handleBuy = async (collection: any) => {
    const priceBlur = BigInt(get(collection, 'floorPrice.amount', 0) * 10 ** 18)
    const prices = await getPrices(collection.collectionSlug)
    const tokenId = await get(prices, 'nftPrices[0].tokenId', '')
    const detail = await getNFTDetail(collection.contractAddress, tokenId)
    const nft = {
      creator: '',
      title: get(detail, 'token.name', ''),
      description: '',
      // price:  priceOpenSea < priceBlur ? priceOpenSea : priceBlur,
      price: priceBlur,
      imageUrl: get(detail, 'token.imageUrl', ''),
      collectionImage: collection.imageUrl,
      traits: get(detail, 'token.traits', []),
      contractAddress: collection.contractAddress,
      tokenId,
    }
    window.openModalNft(nft)
    // Your logic to handle the purchase here
  }

  const getOpenSeaPrice = (collection) => {
    return Number(get(collection.openSea, 'listings[0].price.current.value', 0)) / 1e18
  }

  const addWatchList = async (collection) => {
    delete collection.openSea
    await addToWatchlist(address, collection)
  }

  const handleChange = useDebounceCallback(async (e) => {
    fetchCollectionsData(e.target.value)
  }, 500)

  return (
    <div>
      <div className="mb-4">
        <SearchNFT onChange={handleChange} />
      </div>
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
                <td className="px-6 py-4">
                  <Button onClick={() => addWatchList(collection)}>Add watchlist</Button>
                </td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleBuy(collection)}>Buy now</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
