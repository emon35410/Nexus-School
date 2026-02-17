import React from 'react';
import Hero from './Hero/Hero';
import AcademicPrograms from '../../components/Home/AcademicPrograms';
import NoticeBoard from '../../components/Home/NoticeBoard';
import SecureCloudSystem from '../../components/Home/SecureCloudSystem';
import Testimonials from '../../components/Home/Testimonials';
import Container from '../../Layouts/Container';

const Home = () => {
  return (
    <>
      <Hero />
      <AcademicPrograms />
      <NoticeBoard />
      <SecureCloudSystem></SecureCloudSystem>
      <Testimonials></Testimonials>
    </>
  );
};

export default Home;
