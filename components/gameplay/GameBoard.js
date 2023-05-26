import { useContext, useEffect, useState } from "react";
import GameScoreCard from "./GameScoreCard";
import InstructionModal from "./InstructionModal";
import Keyboard from "./Keyboard";
import WordBox from "./WordBox";
import GameplayContext from "../../contexts/GameplayContext";

export default function GameBoard() {
  const [wordBoxes, setWordBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const ctx = useContext(GameplayContext);

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const getKeyboardInput = (letter) => {
    console.log(wordBoxes);
    if (letter === "Enter") {
      //run checks instead
      // ctx.initGame();
    } else if (letter === "Del") {
      // remove last letter from current word box
      if (wordBoxes.length > 0) {
        let tempBox = [...wordBoxes];
        tempBox.pop();
        setWordBoxes(tempBox);
      }
    } else {
      // add letter to current word box
      if (!ctx.isStarted) {
        ctx.initGame();
      }
      if (wordBoxes.length <= 5) {
        console.log(letter);
        let tempBox = [...wordBoxes, letter];
        setWordBoxes(tempBox);
      }
    }
  };

  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12 relative">
      {showModal && <InstructionModal clickHandler={displayModal} />}
      {!showModal && (
        <>
          <a href="" className="inline-block absolute top-0 left-[97%]">
            <img
              src="./images/mdi_close-circle.png"
              alt="cancel"
              className="mt-3"
            />
          </a>
          <GameScoreCard clickHandler={displayModal} />
          <div className="mt-5 flex w-[80%] mx-auto gap-12">
            <div className="w-full">
              <WordBox wordArray={wordBoxes} />
            </div>
          </div>
          <div className="mt-5">
            <Keyboard clickHandler={getKeyboardInput} />
          </div>
          <div className="mt-5">
            <button className="btn block mx-auto">Submit</button>
          </div>
        </>
      )}
    </div>
  );
}
