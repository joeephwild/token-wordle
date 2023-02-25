import HomeTopButtons from "./HomeTopButtons";

export default function HomeGlassCard() {
  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 w-[90%] mx-auto mt-8 py-12">
      <HomeTopButtons />
      <div className="mt-16">
        <img src="./images/LandingImage.png" className="block mx-auto" />
      </div>
      <div className="mt-16">
        <button className="btn mx-auto">PLAY NOW</button>
      </div>
    </div>
  );
}
