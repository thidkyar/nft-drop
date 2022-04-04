import { useNFTDrop, useAddress } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Header from '../../components/Header'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '../../components/Footer'
import {
  PhotographIcon,
  ArrowLeftIcon,
  BanIcon,
  RefreshIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import Head from 'next/head'

interface Props {
  collection: Collection
}

function Collection({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [price, setPrice] = useState<String>()
  const nftDrop = useNFTDrop(collection.address)
  const [loading, setLoading] = useState<boolean>(false)
  const address = useAddress()

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop?.getAllClaimed()
      const total = await nftDrop?.totalSupply()
      const claimConditions = await nftDrop?.claimConditions.getAll()
      const price = claimConditions?.[0].currencyMetadata.displayValue
      setPrice(price)
      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }

    fetchNFTDropData()
  }, [nftDrop])

  const handleMintButton = () => {
    if (!nftDrop || !address) return

    const quantity = 1
    setLoading(true)
    const notification = toast.loading('Minting...', {
      position: 'bottom-center',
      style: {
        background: 'black',
        color: 'green',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (transactionData) => {
        const receipt = transactionData[0].receipt
        const claimedTokenId = transactionData[0].id
        const claimedNFT = await transactionData[0].data()

        toast.success('Succesfully minted!', {
          position: 'bottom-center',
          style: {
            background: 'black',
            color: 'green',
          },
        })
        console.log(receipt)
        console.log(claimedTokenId)
        console.log(claimedNFT)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Something went wrong', {
          position: 'bottom-center',
          style: {
            background: 'black',
            color: 'green',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>NFT Drops</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] dark:from-purple-400/[0.15]">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-8">
          {/* header */}
          <Header />

          <div className="mt-8 flex flex-grow items-center justify-center md:mt-0 md:pt-12">
            <div className="position: fixed; z-index: 9999; inset: 16px; pointer-events: none;"></div>
            {/* left side */}
            <section className="grid w-full grid-cols-2 items-center gap-0 rounded-xl bg-gradient-to-tr from-purple-400/[0.10] to-blue-400/[0.05] p-6 dark:from-purple-800/[0.10] dark:to-blue-800/[0.05] md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12">
              <div className="col-span-2">
                <div className="my-auto rounded-xl bg-gradient-to-bl from-pink-600/[0.3] to-blue-400/[0.3] p-1.5 transition duration-500 ease-in-out hover:rotate-1 dark:from-pink-600/[0.1] dark:to-blue-400/[0.1] md:p-3">
                  <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                    <span className="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;"></span>
                    <img
                      className="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
                      src={urlFor(collection.mainImage).url()}
                      alt=""
                    />
                  </span>
                </div>
              </div>

              {/* right side */}
              <div className="col-span-2 flex flex-col justify-center md:col-span-2 lg:col-span-3">
                <div className="flex flex-grow flex-col items-start justify-center px-1 pt-8 md:px-0 md:pt-0">
                  <h1 className="font-poppins text-4xl font-medium dark:text-white lg:text-6xl">
                    {collection.nftCollectionName}
                  </h1>
                  <h1 className="text-md mb-4 pt-1 font-poppins font-extralight uppercase tracking-wider text-amber-600 dark:text-amber-400 lg:text-lg">
                    <span className="font-poppins font-semibold">
                      {collection.title.split(' ')[0]}
                    </span>{' '}
                    {collection.title.split(' ').slice(1).join(' ')}
                  </h1>
                  <h2 className="mb-3 font-poppins text-black/75 dark:text-white/75 md:max-w-lg lg:mb-4">
                    {collection.description}
                  </h2>
                  <p className="mb-6 mt-2 inline-block w-auto rounded-md bg-white py-3 px-4 font-poppins text-lg font-medium uppercase text-green-600 shadow-lg dark:bg-black dark:text-green-500 lg:mb-0">
                    {loading
                      ? `LOADING SUPPLY COUNT...`
                      : `${claimedSupply}/${totalSupply?.toString()} NFT's claimed`}
                  </p>
                </div>
                <div className="space-between flex w-full flex-col items-center gap-3 md:gap-4 lg:flex-row lg:pb-2">
                  <div className="group relative w-full cursor-pointer">
                    <div
                      className={`${
                        address &&
                        claimedSupply !== totalSupply?.toNumber() &&
                        !loading &&
                        'group-hover:duration-600 group-hover:opacity-100'
                      } animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000`}
                    ></div>
                    <button
                      disabled={
                        loading ||
                        claimedSupply === totalSupply?.toNumber() ||
                        !address
                      }
                      onClick={handleMintButton}
                      className="relative flex w-full cursor-pointer items-center justify-between space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none text-black transition duration-200 hover:text-purple-500 disabled:cursor-not-allowed disabled:bg-gray-400/50 disabled:hover:text-black dark:bg-black dark:text-white dark:hover:text-purple-300 dark:disabled:bg-gray-500/50 disabled:dark:hover:text-white lg:justify-start"
                    >
                      {loading ? (
                        <RefreshIcon className="h-6 w-6 animate-spin" />
                      ) : !address ||
                        claimedSupply === totalSupply?.toNumber() ? (
                        <BanIcon className="h-6 w-6" />
                      ) : (
                        <PhotographIcon className="h-6 w-6" />
                      )}
                      <span className="font-poppins text-lg capitalize tracking-wider transition duration-200">
                        {loading ? (
                          <>Loading...</>
                        ) : claimedSupply === totalSupply?.toNumber() ? (
                          <>SOLD OUT</>
                        ) : !address ? (
                          <>Sign In To Mint</>
                        ) : (
                          <>Mint ({price} ETH)</>
                        )}
                      </span>
                    </button>
                  </div>
                  <div className="group relative w-full cursor-pointer">
                    <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
                    <Link href="/">
                      <button className="relative flex w-full cursor-pointer items-center justify-between space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none text-black transition duration-200 hover:text-purple-500 disabled:cursor-not-allowed disabled:bg-gray-400/50 disabled:hover:text-black dark:bg-black dark:text-white dark:hover:text-purple-300 dark:disabled:bg-gray-500/50 disabled:dark:hover:text-white lg:justify-start">
                        <ArrowLeftIcon className="h-6 w-6" />
                        <span className="font-poppins text-lg capitalize tracking-wider text-black transition duration-200 group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-300">
                          Go Back
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default Collection

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $collection][0]{
    _id,
    title,
      address,
      description,
      nftCollectionName,
      mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator->{
      _id,
      name,
      address,
      slug {
      current
    },
    },
    }`

  const collection = await sanityClient.fetch(query, {
    collection: params?.collection,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
