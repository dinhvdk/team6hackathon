import Modal from 'react-modal';
import { NFTInfo } from './NFTInfo';
import { useEffect, useState } from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10
  },
};

export const ModalInfoNFT= () => {
  const [isOpen,setIsOpen]=useState(false)
  const [nft,setNft]=useState({})
  useEffect(()=>{
    window.openModalNft=(nft)=>{
      setNft(nft)
      setIsOpen(true)
    }
    window.closeModalNft=()=>{
      setIsOpen(false)
      setNft({})
    }
  })
  return  <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={window.closeModalNft}
      contentLabel="Example Modal"
    >
      <NFTInfo nft={nft}/>
    </Modal>
}