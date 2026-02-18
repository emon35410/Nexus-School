import React from 'react';
import Hero from './Hero/Hero';
import AcademicPrograms from '../../components/Home/AcademicPrograms';
import NoticeBoard from '../../components/Home/NoticeBoard';
import SecureCloudSystem from '../../components/Home/SecureCloudSystem';
import Testimonials from '../../components/Home/Testimonials';
import Container from '../../Layouts/Container';
import HowItWorks from '../../components/Home/HowItWorks';

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
      {/* created by Peyas */}
      <HowItWorks />
    </>
  );
};

export default Home;
