import React from 'react';
import Hero from './Hero/Hero';
import AcademicPrograms from '../../components/Home/AcademicPrograms';
import NoticeBoard from '../../components/Home/NoticeBoard';

const Home = () => {
    return (
        <>
            <Hero />
            <AcademicPrograms />
            <NoticeBoard />
        </>
    );
};

export default Home;