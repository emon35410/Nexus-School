import React from 'react';
import Container from '../../../Layouts/Container';

const Hero = () => {
    return (
        <section className="py-12 md:py-20 lg:py-28 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Content: Text & CTA */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            Empower Your School with <span className="text-blue-600">Smart Management</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                            Simplify administration, track student progress, and enhance communication—all in one unified platform designed for modern educators.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300">
                                Watch Demo
                            </button>
                        </div>
                        
                        {/* Added a small Trust Badge for School Context */}
                        <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500">
                            <span className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white"></div>
                            </span>
                            <p>Trusted by 500+ Institutions</p>
                        </div>
                    </div>

                    {/* Right Content: Image Placeholder */}
                    <div className="relative">
                        {/* Replace this div with an image of a School Dashboard or Students using Tablets */}
                        <div className="w-full h-[300px] md:h-[450px] bg-blue-50 rounded-2xl shadow-inner flex flex-col items-center justify-center border-2 border-dashed border-blue-200">
                            <svg className="w-16 h-16 text-blue-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="text-blue-400 font-medium px-6 text-center">Dashboard Preview Image (School/LMS Graphics)</p>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default Hero;