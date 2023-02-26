import LetterBox from "./LetterBox";

export default function WordBox() {
  const allLetters = [
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
    <LetterBox />,
  ];
  return (
    <div className="flex justify-between w-full my-3">
      {allLetters.map((letter) => letter)}
    </div>
  );
}
