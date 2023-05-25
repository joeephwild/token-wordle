export default function LetterBox({ letter, correct, wrong }) {
  if (correct == true) {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-green-400 text-4xl p-5 rounded-xl uppercase font-bold text-white">
        {letter}
      </div>
    );
  } else if (wrong) {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-yellow-600 text-4xl p-5 rounded-xl uppercase font-bold">
        {letter}
      </div>
    );
  } else {
    return (
      <div className="w-20 h-20 flex justify-center items-center bg-slate-100 text-4xl p-5 rounded-xl uppercase font-bold">
        {letter}
      </div>
    );
  }
}
