import React from 'react';
import Hero from './Hero/Hero';
import AcademicPrograms from '../../components/Home/AcademicPrograms';
import NoticeBoard from '../../components/Home/NoticeBoard';
import SecureCloudSystem from '../../components/Home/SecureCloudSystem';
import Testimonials from '../../components/Home/Testimonials';
import Container from '../../Layouts/Container';
import Collaboration from '../../components/Home/Collaboration';
import SocialProof from '../../components/Home/SocialProof';
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/Home/FAQ";
import Contact from '../../components/Home/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <AcademicPrograms />
      <NoticeBoard />
      {/* create by polok */}
      <SecureCloudSystem></SecureCloudSystem>
      {/* create by polok */}
      <Testimonials></Testimonials>
      {/* Create By Emon */}
      <Collaboration></Collaboration>
      {/* Create By Emon */}
      <SocialProof></SocialProof>
      {/* created by Peyas */}
      <HowItWorks />
      {/* created by peyas */}
      <FAQ />
      {/* created by mahialam */}
      <Contact />
    </>
  );
};

export default Home;
