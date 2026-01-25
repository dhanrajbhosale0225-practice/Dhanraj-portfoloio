import React from 'react';

const ExperiencePage: React.FC = () => {
    return (
        <div className="experience-page">
            <h1 className="text-3xl font-bold mb-4">Experience</h1>
            <div className="experience-item mb-6">
                <h2 className="text-2xl font-semibold">Data Scientist at Navikenz</h2>
                <p className="text-gray-700">Duration: 2+ years</p>
                <p className="mt-2">
                    As a Data Scientist, I worked on various projects involving data analysis, machine learning, and software engineering.
                </p>
            </div>
            <div className="experience-item mb-6">
                <h2 className="text-2xl font-semibold">Internship at PwC</h2>
                <p className="text-gray-700">Duration: Internship Period</p>
                <p className="mt-2">
                    Gained valuable experience in data analytics and consulting during my internship at PwC.
                </p>
            </div>
            <div className="experience-item mb-6">
                <h2 className="text-2xl font-semibold">Hackathon Winner</h2>
                <p className="text-gray-700">Event: Xethon</p>
                <p className="mt-2">
                    Participated in a hackathon and won for developing an innovative solution using data science techniques.
                </p>
            </div>
        </div>
    );
};

export default ExperiencePage;