import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StakingHeader from "../components/StakingHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Staking() {
  return (
    <>
      <div className="h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-2 border-gray-100 w-[90%] px-10 py-5 mx-20 my-10  rounded-lg  lato">
        <StakingHeader />
        <hr className="mb-10" />
        <div className="flex gap-20 justify-between ">
          <div className="w-1/2">
            <div className="bg-white p-5 flex flex-col gap-y-3 rounded-lg">
              <p className="text-gray-300">Total Balance</p>
              <h1>785.22TLC</h1>
              <p className="text-gray-400">$45.56</p>
            </div>
            <div className="py-5">
              <h1>Amount of TLC to stake</h1>
              <input
                type="text"
                className="form-input px-4 py-3 rounded-lg w-full bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20  "
                placeholder="400.00TLC"
              />
              <p className="text-gray-400">You will have 385TLC remaining</p>
            </div>
            <div className="p-5 text-center text-white py-5 w-1/3 bg-black cursor-pointer">
              <h1>Stake</h1>
            </div>
          </div>
          <div className="py-5 w-1/2 rounded-lg bg-white">
            <div className="flex pl-4 flex-col gap-y-3">
              <p className="text-gray-300">Current staking appreciation</p>
              <p className="text-bold">24.6576%</p>
              <p className="text-gray-300">Total TLC staked</p>
              <p>12348.78654</p>
            </div>
            <hr className="my-5" />
            <div className="flex pl-4 flex-col gap-y-3">
              <p className="text-gray-300">Projected Monthly reward</p>
              <h1>24.6576%</h1>
              <p className="text-gray-300">Estinated bi-monthly reward</p>
              <h2>12348.78654</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
