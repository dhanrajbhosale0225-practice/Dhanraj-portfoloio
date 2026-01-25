import React from 'react';
import Achievements from '../../components/sections/Achievements';

const AchievementsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Achievements</h1>
            <Achievements />
        </div>
    );
};

export default AchievementsPage;