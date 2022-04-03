import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'

function Header() {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnectMetamask = useDisconnect()
  console.log('header')
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between">
      <h1 className="animate-ease-in-out cursor-pointer font-bold">
        <Link href="/">
          <a>nft drop.</a>
        </Link>
      </h1>
      <div className="flex items-center space-x-2">
        {address && (
          <p className="animate-ease-in-out rounded-lg border-2 border-purple-600 p-1 text-purple-900">
            Logged in as{' '}
            <span className="font-semibold">
              {address?.substring(0, 5)}...
              {address?.substring(address?.length - 5)}
            </span>
          </p>
        )}
        <button
          onClick={() => {
            address ? disconnectMetamask() : connectWithMetamask()
          }}
          className="animate-ease-in-out h-10 rounded-2xl border-2 bg-gradient-to-br from-purple-600 to-purple-900 px-4 text-white"
        >
          {address ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  )
}

export default Header
