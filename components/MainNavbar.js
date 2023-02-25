import { useState } from "react"

export default function MainNavbar(){
    const [showMenu, setShowMenu] = useState(false)
    return(
        <nav className="bg-black w-full text-white md:px-32 px-3">
            <div className="flex justify-between items-center">
                <div>
                    <img src="./images/Logo.png" alt="" className="w-24"/>
                </div>
                <div class="md:hidden block" id="burger" onClick={() => setShowMenu(!showMenu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>                  
                </div>
                <div className={showMenu ? "block" :"hidden md:flex w-full ml-64"}>
                    <a href="" className="block px-8 py-4 hover:border">Home</a>
                    <a href="" className="block px-8 py-4 hover:border">Account</a>
                    <a href="" className="block px-8 py-4 hover:border">Scores</a>
                    <a href="" className="block px-8 py-4 hover:border">Tokens</a>
                    <button className="block px-8 py-4 border border-white ml-auto">Connect Wallet</button>
                </div>
            </div>
        </nav>
    )
}