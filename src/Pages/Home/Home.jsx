import React from 'react';
import Hero from './Hero/Hero';
import AcademicPrograms from '../../components/Home/AcademicPrograms';
import NoticeBoard from '../../components/Home/NoticeBoard';
import SecureCloudSystem from '../../components/Home/SecureCloudSystem';

const Home = () => {
  return (
    <>
      <Hero />
      <AcademicPrograms />
      <NoticeBoard />
      <SecureCloudSystem></SecureCloudSystem>
    </>
  );
};

export default Home;
