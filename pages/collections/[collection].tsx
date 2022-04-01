import { useState, useEffect } from 'react'
import Header from '../components/Header'

function Collection() {
  const [customAnimation, setCustomAnimation] = useState('hidden')

  useEffect(() => {
    setTimeout(() => {
      setCustomAnimation('animate-fade-in-down')
    }, 1000)
  })

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left side */}
      <div className="animate-slide-in-down lg:animate-slide-in-right bg-gradient-to-br from-cyan-900 to-purple-900 shadow-2xl lg:col-span-4">
        {/* update with dynamic image*/}
        <div className="flex flex-col items-center justify-center py-4 lg:min-h-screen">
          <div className="animate-ease-in-out rounded-xl bg-gradient-to-br from-yellow-500 to-rose-500 p-2">
            <img
              className="w-44 rounded-xl object-cover"
              src="https://c.tenor.com/RmBLoLsN40EAAAAd/bored-ape.gif"
              alt=""
            />
          </div>
          <div className="p-5 text-center text-white">
            <h1 className="text-4xl font-bold">Collection Name</h1>
            <h2 className="text-xl text-gray-300">Collection Description</h2>
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

        <div className="relative flex flex-1 flex-col items-center space-y-6 text-center sm:mt-10 justify-center">
          {/* collection image */}
          <img
            className="w-80 object-cover lg:h-40"
            src="https://sothebys-md.brightspotcdn.com/d8/51/750fa3b846a1a2427aac73a7bf35/apes-collage-new.jpg"
            alt=""
          />
          <h1 className="text-4xl font-bold">Collection Name | NFT Drop</h1>
          <p>x / xx NFT's claimed</p>
          <button className="h-16 w-full rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 text-white">
            Mint
          </button>
        </div>
      </div>
    </div>
  )
}

export default Collection
