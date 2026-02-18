import React from "react";
import Hero from "./Hero/Hero";
import AcademicPrograms from "../../components/Home/AcademicPrograms";
import NoticeBoard from "../../components/Home/NoticeBoard";
import SecureCloudSystem from "../../components/Home/SecureCloudSystem";
import LogoMarquee from "../../components/Home/LogoMarquee";
import Testimonials from "../../components/Home/Testimonials";
import Container from "../../Layouts/Container";
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/Home/FAQ";

const Home = () => {
  return (
    <>
      <Hero />
      <AcademicPrograms />
      <NoticeBoard />
      {/* Koushik - Codes - Start */}
      {/* Marquee section */}
      <div className="mt-0 mb-0 border-0">
        {/* <h2 className="text-center pt-8 text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Paid Sponsors
        </h2> */}
        <LogoMarquee></LogoMarquee>
      </div>
      {/* Koushik - Codes - End */}
      {/* create by polok */}
      <SecureCloudSystem></SecureCloudSystem>
      {/* create by polok */}
      <Testimonials></Testimonials>
      {/* created by Peyas */}
      <HowItWorks />
      {/* created by peyas */}
      <FAQ />
    </>
  );
};

export default Home;
