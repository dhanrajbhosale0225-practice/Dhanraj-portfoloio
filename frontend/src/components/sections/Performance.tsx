'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, User, ThumbsUp, Activity } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const FEEDBACK = [
  {
    year: '2025',
    manager: 'Naveen Kumar',
    role: 'Technical Architect',
    comments: [
      'Demonstrated strong adaptability, professionalism, and a clear commitment to delivering quality work.',
      'Integrated well into the J&J environment, continuously learning and shaping his capabilities.',
      'Ownership of tasks, reliability in delivery, and positive attitude.',
      'Collaborates well, communicates and consistently puts in the effort to improve.',
      'Performed strongly this year showing growth, maturity, and the potential for even greater contributions.'
    ]
  },
  {
    year: '2025',
    manager: 'Gudimetla Raghava',
    role: 'Review Manager',
    comments: [
      'Able to deliver the expected output.',
      'Did a good job in delivering the output adhering to the timelines.',
      'Met the expectations.'
    ]
  },
  {
    year: '2025',
    manager: 'Nandakumar Ramaiya Ramakrishna',
    role: 'Scrum Master',
    comments: [
      'Proactively seeking project during the joining offsite.',
      'Demonstrated very contribution during the AI on AMP solution building.'
    ]
  },
  {
    year: '2024',
    manager: 'Shivappa Gundlur',
    role: 'Lead Data Scientist',
    comments: [
      'Shown a fair ability to manage his workload and meet the set goals.',
      'Complete assigned tasks and contribute to team deliverables.',
      'Works well within the team and maintains a positive attitude.',
      'Shown interest to learn new technology and positive attitude to work in a team.'
    ]
  }
];

const Performance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="performance" className="py-20 relative bg-slate-50 dark:bg-dark-200/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Performance Dashboard</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Positive feedback and recognition from managers and team leads throughout my career.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEEDBACK.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 h-full glow-box group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {item.manager}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.role}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">
                  {item.year}
                </div>
              </div>

              <div className="space-y-4">
                {item.comments.map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <Quote className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5 opacity-50" />
                    <p className="text-slate-600 dark:text-slate-300 italic">
                      "{comment}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Performance;
