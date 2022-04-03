import { useNFTDrop, useAddress } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  collection: Collection
}

function Collection({ collection }: Props) {
  const [customAnimation, setCustomAnimation] = useState('hidden')
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [price, setPrice] = useState<String>()
  const nftDrop = useNFTDrop(collection.address)
  const [loading, setLoading] = useState<boolean>(false)
  const address = useAddress()

  useEffect(() => {
    setTimeout(() => {
      setCustomAnimation('animate-fade-in-down')
    }, 1000)
  }, [])

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
      position: "bottom-center"
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (transactionData) => {
        const receipt = transactionData[0].receipt
        const claimedTokenId = transactionData[0].id
        const claimedNFT = await transactionData[0].data()
        
        toast.success("Succesfully minted!")
        console.log(receipt)
        console.log(claimedTokenId)
        console.log(claimedNFT)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong", {
          position: "bottom-center"
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left side */}
      <div className="animate-slide-in-down bg-gradient-to-br from-cyan-900 to-purple-900 shadow-2xl lg:col-span-4 lg:animate-slide-in-right">
        {/* update with dynamic image*/}
        <div className="flex flex-col items-center justify-center py-4 lg:min-h-screen">
          <div className="animate-ease-in-out rounded-xl bg-gradient-to-br from-yellow-500 to-rose-500 p-2">
            <img
              className="w-44 rounded-xl object-cover"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="p-5 text-center text-white">
            <h1 className="text-4xl font-bold">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* right side */}

      <div
        className={`flex flex-1 flex-col p-8 shadow-inner lg:col-span-6 ${customAnimation}`}
      >
        {/* header */}
        <div className="relative">
          <Header />
        </div>

        <hr className="my-2 border" />

        <div className="relative flex flex-1 flex-col items-center justify-center space-y-6 text-center sm:mt-10">
          <img
            className="w-80 object-cover lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className="text-4xl font-bold">{collection.title}</h1>
          <div className="rounded-lg border-2 border-black p-2">
            {loading ? (
              <p className="animate-pulse">LOADING SUPPLY COUNT...</p>
            ) : (
              <p className="text-green-500">
                {claimedSupply}/{totalSupply?.toString()} NFT's claimed
              </p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={handleMintButton}
            className="h-16 w-full rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 text-white"
          >
            Mint ({price} ETH)
          </button>
        </div>
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
