import { useState } from "react";
import GameScoreCard from "./GameScoreCard";
import InstructionModal from "./InstructionModal";
import Keyboard from "./Keyboard";
import WordBox from "./WordBox";

export default function GameBoard() {
  const [wordBoxes, setWordBoxes] = useState(Array(6).fill([]));
  const [currentWbIndex, setCurrentWbIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const getKeyboardInput = (letter) => {
    if (letter === "Enter") {
      // move to next word box if current one is full
      if (wordBoxes[currentWbIndex].length === 5) {
        setCurrentWbIndex((index) => index + 1);
      }
    } else if (letter === "Del") {
      // remove last letter from current word box
      setWordBoxes((boxes) => {
        const currentBox = boxes[currentWbIndex];
        if (currentBox.length > 0) {
          return [
            ...boxes.slice(0, currentWbIndex),
            currentBox.slice(0, -1),
            ...boxes.slice(currentWbIndex + 1),
          ];
        } else {
          return boxes;
        }
      });
    } else {
      // add letter to current word box
      setWordBoxes((boxes) => {
        const currentBox = boxes[currentWbIndex];
        if (currentBox.length < 5) {
          return [
            ...boxes.slice(0, currentWbIndex),
            [...currentBox, letter],
            ...boxes.slice(currentWbIndex + 1),
          ];
        } else {
          return boxes;
        }
      });
    }
  };

  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter mt-10 backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12 relative">
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
          <GameScoreCard clickHandler={displayModal}/>
          <div className="mt-5 flex w-[80%] items-center justify-center mx-auto gap-12">
            <div className="w-[50%]">
              {wordBoxes.slice(0, 3).map((box, index) => (
                <WordBox key={index} wordArray={box} />
              ))}
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
