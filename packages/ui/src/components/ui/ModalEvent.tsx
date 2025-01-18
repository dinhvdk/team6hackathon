import Modal from 'react-modal'
import { NFTInfo } from '../../../../plugins/nftAggregator/src/components/NFTInfo'
import React, { useEffect, useState } from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
}

export const ModalEvent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [nft, setNft] = useState({})
  useEffect(() => {
    window.openModalEvent = (event) => {
      setNft(event)
      setIsOpen(true)
    }
    window.closeModalEvent = () => {
      setIsOpen(false)
      setNft({})
    }
  })
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={window.closeModalEvent} contentLabel="Example Modal">
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-60 object-cover"
            src={nft.imageUrl}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
          {/*  <img*/}
          {/*    className="w-10 h-10 rounded-full mr-3"*/}
          {/*    src={nft.collectionImage}*/}
          {/*    alt="creator avatar"*/}
          {/*  />*/}
            <div>
              <h3 className="text-md font-medium text-gray-800">{nft.collection}</h3>
              <p className={'text-md font-medium text-gray-800'}>Price floor: {nft.floorPrice?.amount} {nft.floorPrice?.unit}</p>
              <p className={'text-md font-medium text-gray-800'}>Best bid: {nft.bestBid} {nft.floorPrice?.unit}</p>
            </div>
          {/*</div>*/}
          {/*<div className={'flex flex-wrap'}>*/}
          {/*  {nft.traits &&*/}
          {/*    Object.keys(nft.traits).map((key, index) => (*/}
          {/*      <div*/}
          {/*        key={index}*/}
          {/*        className={*/}
          {/*          'bg-gray-200 text-gray-800 rounded-md px-2 py-1 mr-2 mb-2'*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <div>{key}</div>*/}
          {/*        <div>{nft.traits[key]}</div>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          </div>
          {/*<div className="flex justify-between items-center border-t pt-4"></div>*/}
          {/*<button*/}
          {/*  className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500"*/}
          {/*  onClick={buyBlur}*/}
          {/*>*/}
          {/*  Buy now {Number(nft.price) / 1e18} ETH*/}
          {/*</button>*/}
        </div>
      </div>
    </Modal>
  )
}
