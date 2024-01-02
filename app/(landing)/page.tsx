import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/landing-hero";
import LandingContent from "@/components/landing-content";
import Head from "next/head";

const LandingPage = () => {
  return (
    <div className={"h-full"}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
      </Head>
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  );
}

export default LandingPage

