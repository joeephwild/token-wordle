import LetterBox from "./LetterBox";

export default function WordBox({ wordArray = [] }) {
  return (
    <div className="flex justify-between w-[90%] my-3">
      <LetterBox letter={wordArray[0]} />
      <LetterBox letter={wordArray[1]} />
      <LetterBox letter={wordArray[2]} />
      <LetterBox letter={wordArray[3]} />
      <LetterBox letter={wordArray[4]} />
    </div>
  );
}
