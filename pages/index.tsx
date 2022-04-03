import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Collections from './components/Collections'
import { GetServerSideProps } from 'next'
import { sanityClient } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>NFT Drops</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] dark:from-purple-400/[0.15]">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-8">
          <Header />
          <main className="grid flex-grow items-center gap-0 pb-12 md:grid-cols-2 md:gap-24 md:pb-48 md:pt-24">
            <div className="col-span-1 mb-12 mt-16 flex flex-col space-y-6 rounded-xl text-center md:mb-0 md:text-left lg:justify-center lg:space-y-2">
              <h1 className="font-poppins text-3xl font-extralight dark:text-white md:max-w-md md:text-6xl">
                The best <span className="font-bold text-purple-500">NFTs</span>{' '}
                in one place
              </h1>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                <div className="flex flex-col gap-3 pt-24 md:gap-6"></div>
                <div className="flex flex-col gap-3 pt-12 md:gap-6"></div>
                <div className="flex flex-col gap-3 md:gap-6"></div>
              </div>
            </div>
          </main>
          <div className="pt-12 pb-24 md:grid md:grid-cols-4">
            <div className="md:col-span-4 xl:col-span-3 xl:col-start-2">
              <section className="pb-12 lg:pb-16">
                <h1 className="font-poppins text-center text-3xl font-extralight dark:text-white md:text-left md:text-4xl">
                  <span className="font-bold text-purple-500">Explore</span> the
                  collections
                </h1>
              </section>
              <div className="flex flex-col items-stretch justify-center space-y-8 md:space-y-24">
                <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                  {/* LOOP THROUGH AND RENDER ALL COLLECTIONS */}
                  <Collections collections={collections} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
