function Header() {
  return (
    <header className="flex items-center justify-between sticky">
      <h1 className="w-52 cursor-pointer font-bold">nft drop.</h1>
      <button className="rounded-2xl border-2 bg-gradient-to-br from-purple-600 to-purple-900 w-20 h-10 text-white animate-ease-in-out">
        Login
      </button>
    </header>
  )
}

export default Header
