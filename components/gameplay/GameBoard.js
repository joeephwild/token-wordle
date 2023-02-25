import GameScoreCard from "./GameScoreCard";

export default function GameBoard(){
    return(
        <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12 relative">
            <a href="" className="inline-block absolute top-0 left-[97%]">
                <img src="./images/mdi_close-circle.png" alt="cancel" className="mt-3"/>
            </a>
            <GameScoreCard />
        </div>
    )
}