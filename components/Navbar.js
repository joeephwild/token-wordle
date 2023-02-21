export default function Navbar(){

    return(
        <nav className="bg-black w-full text-white px-32">
            <div className="flex justify-between items-center">
                <div>
                    <img src="./images/Logo.png" alt="" />
                </div>
                <div className="">
                    <a href="" className="px-8 py-4 hover:border">Login</a>
                    <a href="" className="px-8 py-4 hover:border">Register</a>
                </div>
            </div>
        </nav>
    )
}