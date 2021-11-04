import { logEvent } from "@firebase/analytics";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import useAnalytics from "../hooks/useAnalytics";

import discordMark from "../icons/discord.svg";
import githubMark from "../icons/github.svg";
import twitterMark from "../icons/twitter.svg";

function DiscordMark(){
  return <Image src={discordMark} alt="discord" height={28} width={28}/>;
};
function GithubMark(){
  return <Image src={githubMark} alt="github" height={28} width={28}/>;
};
function TwitterMark(){
  return <Image src={twitterMark} alt="twitter" height={28} width={28}/>;
};

function SocialLinks({ className }: { className?: string }) {
  const analytics = useAnalytics();
  const router = useRouter();

  const onClick = (name) => {
    logEvent(analytics, "social_link_click", { name, path: router?.pathname });
  };

  return (
    <div className={`flex space-x-5 pt-12 justify-center ${className}`}>
      <a target="_blank" onClick={() => onClick("discord")} href="/discord"><DiscordMark/></a>
      <a target="_blank" onClick={() => onClick("github")} href="/github"><GithubMark /></a>
      <a target="_blank" onClick={() => onClick("twitter")} href="/twitter"><TwitterMark /></a>
    </div>
  );
};

export default SocialLinks;