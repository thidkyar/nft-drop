import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'

function Header() {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnectMetamask = useDisconnect()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between">
      <h1 className="animate-ease-in-out w-52 cursor-pointer font-bold">
        <Link href="/">
          <a>nft drop.</a>
        </Link>
      </h1>
      <div className="space-x-2">
        <Link href="/collections/random">
          <button className="animate-ease-in-out h-10 rounded-2xl border-2 bg-gradient-to-br from-cyan-900 to-purple-900 px-4 text-white">
            Collection
          </button>
        </Link>

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
