'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  type: 'full-time' | 'internship' | 'freelance';
}

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences: ExperienceItem[] = [
    {
      company: 'Navikenz',
      role: 'Software Engineer (Data Scientist)',
      duration: '2024 - Present',
      location: 'India',
      description: 'Working on enterprise-level data science solutions, developing ML models, and building scalable data pipelines.',
      responsibilities: [
        'Developing and deploying machine learning models for predictive analytics',
        'Building automated data pipelines for large-scale data processing',
        'Collaborating with cross-functional teams to deliver data-driven solutions',
        'Implementing MLOps practices for model deployment and monitoring',
        'Conducting data analysis and creating insightful visualizations'
      ],
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS', 'Docker', 'Kubernetes'],
      type: 'full-time'
    },
    {
      company: 'PwC',
      role: 'Data Analytics Intern',
      duration: '2023',
      location: 'India',
      description: 'Contributed to consulting projects involving data analytics and business intelligence solutions.',
      responsibilities: [
        'Analyzed large datasets to extract business insights',
        'Created dashboards and reports for client presentations',
        'Assisted in developing data-driven recommendations',
        'Collaborated with senior consultants on client engagements'
      ],
      techStack: ['Python', 'SQL', 'Power BI', 'Excel', 'Tableau'],
      type: 'internship'
    }
  ];

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'internship':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  return (
    <section id="experience" className="py-24 bg-slate-50/50 dark:bg-slate-900/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey in data science and software engineering
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-8 md:ml-auto md:w-1/2'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-0 ${
                  index % 2 === 0 ? 'left-0 md:-right-3 md:left-auto' : 'left-0 md:-left-3'
                } w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-slate-900 shadow-lg z-10`} />

                {/* Content card */}
                <div className="ml-8 md:ml-0 glass-card p-6 group card-hover">
                  <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTypeBadgeColor(exp.type)}`}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                  </div>

                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <Building2 className="h-5 w-5 text-primary-500" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      {exp.company}
                    </h3>
                  </div>

                  <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                    {exp.role}
                  </h4>

                  <div className={`flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>

                  <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tech-badge text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;