import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from './components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT Drops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-8">
        <Header />
        <hr className="my-2 border" />
        <h1>Homepage</h1>
      </div>
    </div>
  )
}

export default Home
