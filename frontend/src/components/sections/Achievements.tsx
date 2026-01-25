'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Briefcase, GraduationCap, Star, Award, Target } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: React.ElementType;
  color: string;
}

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Xethon Hackathon Winner',
      description: 'First place winner at Xethon Hackathon, demonstrating innovative problem-solving and technical excellence in building data-driven solutions under pressure.',
      date: '2023',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      title: 'PwC Internship Experience',
      description: 'Completed a prestigious internship at PwC (Big Four), gaining valuable experience in consulting and data analytics while working with enterprise clients.',
      date: '2023',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'UPES University Graduate',
      description: 'Graduated with B.Tech in Computer Science Engineering with specialization in Data Science, building strong foundations in programming, ML, and analytics.',
      date: '2024',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: '2+ Years at Navikenz',
      description: 'Contributing as a Software Engineer (Data Scientist) at Navikenz, working on cutting-edge data science projects and enterprise solutions.',
      date: '2024 - Present',
      icon: Star,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '15+' },
    { label: 'Hackathons Won', value: '1' },
    { label: 'Technologies Mastered', value: '20+' },
  ];

  return (
    <section id="achievements" className="py-24 bg-slate-50/50 dark:bg-slate-900/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Milestones and accomplishments throughout my journey in tech
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              className="group"
            >
              <div className="glass-card p-6 h-full card-hover relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="flex items-start gap-4 relative">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="flex-grow">
                    {/* Date badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full mb-3">
                      {achievement.date}
                    </span>

                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-primary-500 transition-colors">
                      {achievement.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${achievement.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Interested in what I can bring to your team?
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            <Target className="mr-2 h-4 w-4" />
            Let&apos;s Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;