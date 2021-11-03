
import Image from "next/image";
import openInNewIcon from "../icons/open_in_new.svg";

function OpenInNewIcon(){
  return <Image src={openInNewIcon} alt="open in new" height={28} width={28}/>;
};

function OpenInNew({ href, children, arrowIcon=true }){
  return <a target="_blank" href={href} rel="noopener noreferrer" className="text-primary">{children}{ arrowIcon && <OpenInNewIcon/>}</a>;
};

export default OpenInNew;