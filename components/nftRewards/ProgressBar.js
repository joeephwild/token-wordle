export default function ProgressBar({percent}){
    <div className="w-full bg-zinc-600 h-12 rounded-xl">
        <div className={`bg-green-600 w-[${percent}%] h-full`}></div>
    </div>
}