import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "../components/SocialLinks";

import waveTop from "../icons/wave_top.svg";
import waveBottom from "../icons/wave_bottom.svg";

function WaveTop() {
  return <div className="absolute top-0 left-0"><Image src={waveTop} alt="wave top" /></div>;
};
function WaveBottom() {
  return <div className="absolute bottom-0 right-0"><Image src={waveBottom} alt="wave bottom" /></div>;
};

export default function ComingSoonPage(){
  return (
    <>
      <Head>
        <title>Coming Soon</title>
      </Head>

      <WaveTop/>
      <WaveBottom/>

      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
        <h1 className="text-secondary text-7xl pb-12 text-center font-bold text-white">Coming soon</h1>
        <Link href="/"><button className="bg-primary text-secondary text-xl py-2 px-8 rounded">Home</button></Link>
        <SocialLinks />
      </div>
    </>
  );
};
