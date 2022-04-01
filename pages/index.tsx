import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from './components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import Link from 'next/link'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="">
      <Head>
        <title>NFT Drops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-screen-2xl p-8">
        <Header />
        <hr className="my-2 border" />
        <h1>Homepage</h1>

        <main>
          <div>
            {collections.map((collection) => (
              <Link href={`/collections/${collection.slug.current}`}>
                <div>
                  <img
                    className="h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />

                  <div>
                    <h2>{collection.title}</h2>
                    <p>{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type =="collection"]{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
