export default function Footer(){
    return(
        <footer className="bg-[#1B1402] fixed bottom-0 w-full">
                <div className="flex justify-between px-32 items-center">
                <div className="space-x-4 text-white flex items-center w-1/2 justify-between">
                    <img src="./images/Logo.png" alt="" />
                    <a href="">Privacy</a>
                    <a href="">Terms of Service</a>
                    <a href="">About</a>
                    <a href="">Support</a>
                </div>
                <div className="text-white">
                    <a href="">Tokenwordle2022</a>
                </div>
            </div>
            
        </footer>
    )
}