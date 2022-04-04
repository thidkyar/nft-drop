import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

function Collections({ collections }: Props) {
  return (
    <>
      {collections?.map((collection) => (
        <Link
          key={collection._id}
          href={`/collections/${collection.slug.current}`}
        >
          <div className="group relative cursor-pointer transition duration-500 ease-in-out hover:rotate-1 hover:scale-105">
            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>
            <div className="relative flex items-center justify-between space-x-4 divide-gray-600 rounded-xl bg-white px-1.5 leading-none text-blue-200 transition duration-200 hover:text-purple-300 dark:bg-black sm:p-2">
              <div className="duration-600 w-full origin-top-left rounded-2xl p-3 sm:w-auto md:w-full">
                <div className="flex items-center gap-4 sm:flex-col md:flex-row md:gap-6">
                  <div className=" rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5">
                    <img
                      className="lg:w-38 h-auto w-16 flex-shrink rounded-lg object-cover sm:w-full md:w-32"
                      src={urlFor(collection.previewImage).url()}
                      alt=""
                    />
                  </div>
                  <div className="text-left sm:text-center md:text-left lg:py-8">
                    <h2 className="font-poppins text-xl text-amber-500 dark:text-amber-300 md:text-2xl xl:text-3xl">
                      {collection.nftCollectionName}
                    </h2>
                    <p className="font-poppins mt-2 hidden font-extralight text-black dark:text-white sm:block">
                      {collection.title}
                    </p>
                    <p className="font-poppins mt-2 font-medium text-purple-600 dark:text-purple-400">
                      {collection.creator.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Collections

