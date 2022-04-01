import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Header from '../components/Header'

interface Props {
  collection: Collection
}

function Collection({ collection }: Props) {
  const [customAnimation, setCustomAnimation] = useState('hidden')

  useEffect(() => {
    setTimeout(() => {
      setCustomAnimation('animate-fade-in-down')
    }, 1000)
  })

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
          <p>x / xx NFT's claimed</p>
        </div>
        <div className="mt-10">
          <button className="h-16 w-full rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 text-white">
            Mint
          </button>
        </div>
      </div>
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
