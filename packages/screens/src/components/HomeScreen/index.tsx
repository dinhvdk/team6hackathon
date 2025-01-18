'use client'
import { Separator, TableNFTs, TableWatchList } from '@repo/ui'
import Link from 'next/link'
import Hero from './Hero'
import { PluginArea } from '../plugin-area'
import { SearchNFT } from '@repo/ui'
import { ModalInfoNFT } from '@repo/ui'
import { useWallet } from '@coin98t/wallet-adapter-react'
const HomeScreen = () => {
  const {address}=useWallet()
  return (
    <section className="flex flex-col gap-y-8 ">
      <Hero />
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Installed</h2>
        <Link href={'/explore'} className="text-textLink hover:underline hover:decoration-2">
          Explore All Snaps
        </Link>
      </div>
      <PluginArea />
      <h1>Watch List </h1>
      <TableWatchList address={address}/>

      <h1>Market NFT</h1>
      <TableNFTs address={address}/>
      <ModalInfoNFT/>
    </section>
  )
}

export default HomeScreen
