export default function HomeTopButtons() {
  return (
    <div className="px-8 flex justify-between">
      <a
        href="./leaderboard"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        LEADERBOARD
      </a>
      <a
        href="./nftRewards"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        NFT REWARDS
      </a>
      <a
        href="./staking"
        className="block w-64 py-3 bg-slate-50 text-2xl text-center"
      >
        STAKING
      </a>
    </div>
  );
}
