export default function GameScoreCard(){
    return(
            <div className="bg-white w-[70%] mx-auto p-3 flex justify-between items-center">
                <div className="flex justify-between w-64 items-center">
                    <h1 className="text-black text-4xl">Scores</h1>
                    <h1 className="bg-[#3A3A3A] rounded-full px-3 text-white text-4xl w-32 py-2">
                        0
                    </h1>
                </div>
                <div className="item-start justify-self-start">
                    <h1 className="text-[#ff0000] text-3xl">
                        4:59
                    </h1>
                </div>
                <div>
                    <img src="./images/medical-icon_i-information-us.png" />
                </div>
            </div>
    )
}