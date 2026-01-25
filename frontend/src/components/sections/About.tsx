'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Brain, 
  Database, 
  Cloud, 
  Sparkles,
  GraduationCap,
  Building2,
  Trophy
} from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    { icon: Brain, label: 'Machine Learning', color: 'from-purple-500 to-pink-500' },
    { icon: Code2, label: 'Software Development', color: 'from-blue-500 to-cyan-500' },
    { icon: Database, label: 'Data Engineering', color: 'from-green-500 to-emerald-500' },
    { icon: Cloud, label: 'Cloud & MLOps', color: 'from-orange-500 to-red-500' },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: 'UPES University',
      description: 'B.Tech CSE with Data Science Specialization',
    },
    {
      icon: Building2,
      title: 'Navikenz',
      description: '2+ Years as Software Engineer (Data Scientist)',
    },
    {
      icon: Trophy,
      title: 'Xethon Hackathon',
      description: 'Winner - Innovative Data Solutions',
    },
  ];

  const techStack = [
    'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
    'FastAPI', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
    'Kubernetes', 'Git', 'React', 'TypeScript'
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate about transforming data into actionable insights and building 
            intelligent systems that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 relative group card-hover">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-primary-500" />
                  <h3 className="text-2xl font-bold">My Journey</h3>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  I&apos;m a <span className="text-primary-500 font-semibold">Data Scientist</span> and{' '}
                  <span className="text-secondary-500 font-semibold">Software Engineer</span> with a 
                  passion for leveraging data to drive meaningful solutions. My journey started at 
                  UPES University, where I specialized in Data Science while building a strong 
                  foundation in computer science.
                </p>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  During my academic years, I gained invaluable experience at{' '}
                  <span className="font-semibold">PwC</span> as a data analytics intern and won the{' '}
                  <span className="text-primary-500 font-semibold">Xethon Hackathon</span>, 
                  demonstrating my ability to innovate under pressure.
                </p>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Currently, I&apos;m contributing as a Software Engineer at{' '}
                  <span className="font-semibold">Navikenz</span>, where I develop and deploy 
                  machine learning models, build scalable data pipelines, and collaborate with 
                  cross-functional teams to deliver impactful data-driven solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Skills & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Core Skills */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="glass-card p-4 group card-hover"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    {skill.label}
                  </h4>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-center mb-6">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                className="tech-badge hover:scale-105 transition-transform cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;