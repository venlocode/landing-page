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
        <title>Thank You!</title>
      </Head>

      <WaveTop/>
      <WaveBottom/>

      <div className="absolute top-1/2 left-1/2	transform -translate-y-1/2 -translate-x-1/2 text-center">
        <h1 className="text-secondary text-7xl text-center font-bold text-white">Thank You!</h1>
        <p className="text-tertiary text-lg pt-2 pb-8">Your registration was successful. You can safely close this page.</p>
        <Link href="/"><button className="bg-primary text-secondary text-xl py-2 px-8 rounded">Return Home</button></Link>
        <SocialLinks />
      </div>
    </>
  );
};
