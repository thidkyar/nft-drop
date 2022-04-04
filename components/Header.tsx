import { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'

function Header() {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnectMetamask = useDisconnect()

  const { theme, setTheme } = useTheme()
  console.log(theme)
  const dark = theme === 'dark' ? true : false

  const [checked, setChecked] = useState(dark)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    setTheme(checked ? 'dark' : 'light')
  }, [checked, setTheme])

  if (!mounted) return null
  return (
    <header className="z-50 flex flex-col items-center justify-between border-b border-pink-400/[0.15] pb-8 md:flex-row md:pb-10">
      <Link href="/">
        <h1 className="cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-purple-800/75 dark:text-purple-300/50 md:text-xl">
          nft{' '}
          <span className="font-medium text-purple-800 dark:text-purple-400">
            drop
          </span>
        </h1>
      </Link>

      <div className="mt-6 flex flex-col items-center space-y-4 md:mt-0 md:flex-row md:space-y-0 md:space-x-5">
        {address && (
          <p className="text-center text-sm text-amber-600 dark:text-amber-300">
            Logged in as{' '}
            <span className="font-medium">
              {address?.substring(0, 5)}...
              {address?.substring(address?.length - 5)}
            </span>
          </p>
        )}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => {
              address ? disconnectMetamask() : connectWithMetamask()
            }}
          >
            <div className="group relative">
              <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
              <div className="relative flex items-center space-x-4 divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none text-black transition duration-200 hover:text-purple-500 dark:bg-black dark:text-white dark:hover:text-purple-300">
                {address ? (
                  <LogoutIcon className="h-6 w-6" />
                ) : (
                  <LoginIcon className="h-6 w-6" />
                )}
                <span className="font-poppins text-lg capitalize tracking-wider text-black transition duration-200 group-hover:text-purple-500 dark:text-white dark:group-hover:text-purple-300">
                  {address ? 'Sign Out' : 'Sign In'}
                </span>
              </div>
            </div>
          </button>
          <button
            onClick={() => (checked ? setChecked(false) : setChecked(true))}
          >
            <div className="group relative">
              <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
              <div className="relative flex items-center space-x-4 divide-gray-600 rounded-full bg-white p-4 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-black dark:text-blue-200 dark:hover:text-purple-300">
                {theme === 'light' ? (
                  <MoonIcon className="h-6 w-6 fill-yellow-500 text-yellow-500 dark:text-yellow-500" />
                ) : (
                  <SunIcon className="text-yellow h-6 w-6 fill-yellow-500" />
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
