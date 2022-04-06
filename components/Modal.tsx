import React from 'react'
import { CakeIcon } from '@heroicons/react/outline'
import { Collection } from '../typings'

interface Props {
  showModal: boolean
  setShowModal: (active: boolean) => void
  txData: {
     description: string; name: string; image: string
  }
}

export default function Modal({
  showModal,
  setShowModal,
  txData,
}: Props) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all dark:bg-black">
                {/*header*/}
                <h1 className="font-poppins text-2xl font-medium leading-6 text-gray-900 dark:text-white">
                  Payment successful!
                </h1>
                {/*body*/}
                <div className="mt-4">
                  <p className="text-md font-poppins text-gray-500 dark:text-white/75">
                    Your payment has been successfully submitted.
                    Congratulations on your new{' '}
                    <span className="font-bold text-purple-500">
                      {txData.description}
                    </span>
                  </p>
                  <div className="grid w-full grid-cols-4 items-center gap-0 rounded-xl bg-gradient-to-tr from-purple-400/[0.10] to-blue-400/[0.05] p-6 dark:from-purple-800/[0.10] dark:to-blue-800/[0.05] md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12">
                    <div className="col-span-2 lg:col-span-3">
                      <div className="my-auto rounded-xl bg-gradient-to-bl from-pink-600/[0.3] to-blue-400/[0.3] p-1.5 transition duration-500 ease-in-out hover:rotate-1 dark:from-pink-600/[0.1] dark:to-blue-400/[0.1] md:p-2">
                        <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                          <span className="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;"></span>
                          <img
                            className="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
                            src={txData.image}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>

                    {/* right side */}
                    <div className="col-span-2 flex flex-col justify-center md:col-span-2 lg:col-span-2">
                      <div className="flex flex-grow flex-col items-start justify-center px-1 pt-8 md:px-0 md:pt-0">
                        <h1 className="font-poppins font-medium dark:text-white">
                          {txData.description}
                        </h1>
                        <h1 className="text-md mb-4 pt-1 font-poppins font-extralight uppercase tracking-wider text-amber-600 dark:text-amber-400 lg:text-lg">
                          <span className="font-poppins font-semibold">
                            {txData.name}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="mt-4 md:mt-8">
                  <button
                    className="outline-0"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <div className="group relative cursor-pointer">
                      <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-50 blur transition duration-1000 group-hover:opacity-100"></div>
                      <div className="relative flex w-96 items-center justify-center space-x-4 divide-gray-600 rounded-lg bg-white px-5 py-2 leading-none text-black transition duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300">
                        <CakeIcon className="h-6 w-6" />
                        <p className="text-md font-poppins capitalize tracking-wider text-black transition duration-200 group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-300">
                          Got it, thanks!
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}
