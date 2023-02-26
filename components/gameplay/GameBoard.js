import GameScoreCard from "./GameScoreCard";
import Keyboard from "./Keyboard";
import WordBox from "./WordBox";

export default function GameBoard() {
  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12 relative">
      <a href="" className="inline-block absolute top-0 left-[97%]">
        <img
          src="./images/mdi_close-circle.png"
          alt="cancel"
          className="mt-3"
        />
      </a>
      <GameScoreCard />
      <div className="mt-5 flex w-[80%] mx-auto gap-12 border border-red-300">
        <div className="w-[50%] border border-green-300">
          <WordBox />
          <WordBox />
          <WordBox />
        </div>
        <div className="w-[50%] border border-green-300">
          <WordBox />
          <WordBox />
          <WordBox />
        </div>
      </div>
      <div className="mt-5">
        <Keyboard />
      </div>
      <div className="mt-5">
        <button className="btn block mx-auto">Submit</button>
      </div>
    </div>
  );
}
