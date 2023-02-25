export default function ConnectWallet({handleClick}) {
  return (
    <div className="w-[70%] mx-auto mt-0">
      <h1 className="text-center font-medium text-5xl">Connect your wallet</h1>
      <p className="w-[60%] text-center mx-auto mt-4">
        This is required to earn tokenized rewards and NFTs. Your rewards are
        stored directly in your wallet, making them secure and accessible
        anytime.
      </p>
      <div className="mt-8">
        <button className="block w-1/2 bg-black text-white text-2xl font-semibold py-3 rounded-lg mx-auto" onClick={() => handleClick()}>
          Connect Wallet
        </button>
        <div className="mt-5 text-center">
          <span className="text-center">
            Don’t have a wallet?{" "}
            <a href="" className="text-white">
              Create one
            </a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
