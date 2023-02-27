export default function LetterBox({ letter }) {
  return (
    <div className="w-24 h-24 flex justify-center items-center bg-slate-100 text-4xl p-5 rounded-xl uppercase font-bold">
      {letter}
    </div>
  );
}
