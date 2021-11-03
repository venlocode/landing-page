import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { logEvent } from "firebase/analytics";

import SocialLinks from "../components/SocialLinks";
import OpenInNew from "../components/OpenInNew";

import useAnalytics from "../hooks/useAnalytics";
import { join } from "../lib/api";

function WaitlistForm() {
  const analytics = useAnalytics();

  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const onJoinWaitlist = async () => {
    setClicked(true);
    logEvent(analytics, "join_waitlist", { email });
    
    const { error, errorData } = await join({ email });
    
    if(error){
      setError(error);
      logEvent(analytics, "join_waitlist_error", errorData && { stack: errorData.stack, message: errorData.message });
    } else {
      setSuccess(true);
    }
    setClicked(false);
  };

  const disabled = clicked || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

  return (
    success ? (
      <div className="flex justify-center content-center text-center flex-wrap space-x-1.5 md:space-y-0 space-y-2">
        <p className="text-tertiary">Thanks. A confirmation link has been sent to your email address.</p>
      </div>
    ) : error ? (
      <div className="flex justify-center content-center text-center flex-wrap space-x-1.5 md:space-y-0 space-y-2">
        <p className="text-tertiary">{error}</p>
      </div>
    ) :
    (
      <div className="flex justify-center content-center text-center flex-wrap space-x-1.5 md:space-y-0 space-y-2">
        {/* <label htmlFor="email" className="text-secondary text-xl p-3">Email:</label> */}
        <input 
          placeholder="Enter email address"
          id="email"
          className={`${clicked ? "bg-tertiary text-black" : "bg-secondary text-tertiary"} py-2.5 px-4 rounded`}
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          disabled={clicked}
        />
        <button 
          className={`text-secondary text-xl py-2.5 px-12 rounded ${disabled ? "bg-tertiary" : "bg-primary"}`}
          onClick={onJoinWaitlist} 
          disabled={disabled}
        >
          Join
        </button>
      </div>
    )
  );
};

export default function IndexPage(){
  return (
    <>
      <Head>
        <title>Venlo</title>
        
        <meta property="og:title" content="Venlo" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://af7c-49-14-106-71.ngrok.io/" />
        <meta property="og:image" itemProp="image" content="https://cdn.discordapp.com/attachments/615219601424252958/905035932225372270/unknown.png" />

        <meta property="og:description" content="Venlo tokenizes open-source work and creates dedicated marketplaces for it" />
        <meta property="og:locale" content="en-US" />
      </Head>

      <div className="font-sans bg-bgPrimary">
        <div className="flex flex-row justify-between bg-bgPrimary sm:px-8 px-4 py-4" id="home">
          <h1 className="text-primary text-3xl">
            <Link href="#home"><a>Venlo</a></Link>
          </h1>
          <nav className="flex items-center">
            <Link href="#waitlist"><a className="text-secondary px-4">Waitlist</a></Link>
            <Link href="#contact"><a className="text-secondary px-4">Contact</a></Link>
          </nav>
        </div>

        <div className="bg-bgSecondary py-24 lg:py-44 px-5 sm:text-center">
          <h1 className="text-base lg:text-7xl sm:text-6xl text-5xl text-secondary pb-8 leading-tight">
            Making <br className="md:hidden block"/><span className="text-primary">open-source</span><br/> self-sustainable
          </h1>
          <p className="text-tertiary text-lg pb-8">Venlo tokenizes open-source work and creates dedicated marketplaces for it</p>
          <Link href="#waitlist"><button className="text-secondary bg-primary md:text-xl text-lg py-3 px-5 m-auto rounded">Join waitlist</button></Link>
        </div>

        <div className="bg-bgPrimary lg:px-52 md:px-24 px-8 lg:pt-32 lg:pb-16 pt-24 pb-12">
          <h2 className="text-secondary text-3xl lg:text-4xl pb-4">
            Why?
          </h2>
          <ul className="list-disc text-tertiary text-md md:text-lg pl-5">
            <li className="p-0.5">Open-source is the backbone of entire software industry, yet it's sustained only by the goodwill of the developers. It’s been going great so far, but we can do better.</li>
            <li className="p-0.5">There is little incentive for developers to work on open-source projects because of the lack of financial support. Therefore, progress in open-source projects is typically very slow.</li>
            <li className="p-0.5"><OpenInNew href="https://www.gnu.org/philosophy/free-sw.en.html">Free software</OpenInNew>is a right, not a good-to-have. Self-sustainability of open-source is necessary in order to align incentives for free software to become mainstream.</li>
            <li className="p-0.5"><OpenInNew href="https://www.google.co.in/books/edition/The_Open_Source_Everything_Manifesto/XbGVEHFh35IC?hl=en&kptab=overview">The Open-source Everything Manifesto</OpenInNew></li>
            <li className="p-0.5"><OpenInNew href="https://www.gnu.org/philosophy/philosophy.en.html">GNU Free Software Philosophy</OpenInNew></li>
          </ul>
        </div>

        <div className="bg-bgPrimary lg:px-52 md:px-24 px-8 lg:py-16 py-12">
          <h2 className="text-secondary text-3xl lg:text-4xl pb-4">
            How?
          </h2>
          <ul className="list-disc text-tertiary text-md md:text-lg pl-5">
            <li className="p-0.5">All repositories have a token of their own.</li>
            <li className="p-0.5">People buy the tokens and use them as offerings for getting their issues resolved within a certain time limit.</li>
            <li className="p-0.5">The offered tokens remain locked inside the issues until either the issues are resolved or the time limit is exceeded.</li>
            <li className="p-0.5">Any number of users can offer any amount of tokens for resolving the same issue within any time limit, all numbers add up to determine the final worth of an issue.</li>
            <li className="p-0.5">Repository owners prioritize issues based on the total token offerings they have.</li>
            <li className="p-0.5">All contributions to the repositories are rewarded using the same tokens.</li>
            <li className="p-0.5">People can also buy and hold repo tokens to sell them at a higher price later on.</li>
          </ul>
        </div>

        <div className="bg-bgPrimary lg:px-52 md:px-24 px-8 lg:py-16 py-12">
          <h2 className="text-secondary text-3xl lg:text-4xl pb-4">
            There's more to it...
          </h2>
          <ul className="list-disc text-tertiary text-md md:text-lg pl-5">
            <li className="p-0.5">Anyone in the world with access to a computer and internet will be able to simply create a public software repository and have a token marketplace for their work. Software work will no longer have any gatekeeping, at all.</li>
            <li className="p-0.5">Large companies and organizations will have monetory incentives to free their code, allowing for more transpiracy and trust.</li>
            <li className="p-0.5">The non-profit open-source projects will finally be able to compete with their for-profit competitors.</li>
            <li className="p-0.5">More developers and organisations working fulltime on open-source means very directly impacting the overall software advancement pace of the planet. How significant will that be? We’re very optimisitic.</li>
          </ul>
        </div>

        <div className="bg-bgPrimary lg:px-52 md:px-24 px-8 lg:pt-16 lg:pb-32 pt-12 pb-24">
          <h2 className="text-secondary text-3xl lg:text-4xl pb-4">
            Who's building it?
          </h2>
          <p className="list-disc text-tertiary text-md md:text-lg">
            Currently, <OpenInNew href="https://libkakashi.repl.co/">Apoorv</OpenInNew>is the only one working on Venlo. Though, Venlo is completely decentralized and owned by no one; it will be 100% open-source and entirely community managed right from the day 1 of launch.  
          </p>
        </div>

        <div className="bg-bgSecondary lg:px-52 md:px-24 px-8 py-32" id="waitlist">
          <h2 className="text-center text-5xl text-secondary pb-8">
            Waitlist
          </h2>
          <WaitlistForm />
        </div>

        <div className="bg-bgPrimary lg:px-52 md:px-24 px-8 lg:py-16 py-12 w-42" id="contact">  
          <div className="text-secondary text-xl pb-6">
            Follow us on:
          </div>
          <SocialLinks className="imp:justify-start"/>
        </div>

        <div className="bg-primary px-2 md:px-5 py-2 text-center">
          <p className="text-secondary text-sm p-1">Copyright © 2021 Venlo. All rights reserved. <br className="sm:hidden block"/> Venlo is bigger than just open-source. Stay tuned XD</p>
        </div>
      </div>
    </>
  );
};
