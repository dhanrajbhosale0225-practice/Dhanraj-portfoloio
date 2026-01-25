'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  image?: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time analytics platform with ML-driven insights and predictive forecasting.',
      longDescription: 'Built a comprehensive analytics dashboard that processes millions of data points in real-time.',
      techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/yourusername/analytics-dashboard',
      featured: true,
      category: 'data-science'
    },
    {
      id: 2,
      title: 'NLP Pipeline for Text Classification',
      description: 'End-to-end NLP pipeline achieving 94% accuracy on sentiment analysis tasks.',
      techStack: ['Python', 'PyTorch', 'Hugging Face', 'spaCy', 'FastAPI'],
      githubUrl: 'https://github.com/yourusername/nlp-pipeline',
      featured: true,
      category: 'machine-learning'
    },
    {
      id: 3,
      title: 'Xethon Hackathon Winner',
      description: 'Award-winning hackathon project showcasing innovative data-driven solution.',
      techStack: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'Plotly'],
      featured: true,
      category: 'hackathon'
    },
    {
      id: 4,
      title: 'Automated Data Pipeline',
      description: 'Scalable ETL pipeline handling terabytes of data daily with 60% processing time reduction.',
      techStack: ['Python', 'Apache Airflow', 'Spark', 'SQL', 'AWS S3'],
      githubUrl: 'https://github.com/yourusername/data-pipeline',
      featured: false,
      category: 'data-engineering'
    },
    {
      id: 5,
      title: 'Computer Vision QA System',
      description: 'Image recognition system achieving 99.2% accuracy in defect detection.',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'Docker'],
      featured: false,
      category: 'computer-vision'
    },
    {
      id: 6,
      title: 'Recommendation Engine',
      description: 'Hybrid recommendation system improving user engagement by 35%.',
      techStack: ['Python', 'Surprise', 'NumPy', 'FastAPI', 'MongoDB'],
      featured: false,
      category: 'machine-learning'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'data-engineering', label: 'Data Engineering' },
    { id: 'hackathon', label: 'Hackathon' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'data-science': 'from-blue-500 to-cyan-500',
      'machine-learning': 'from-purple-500 to-pink-500',
      'data-engineering': 'from-green-500 to-emerald-500',
      'computer-vision': 'from-orange-500 to-red-500',
      'hackathon': 'from-yellow-500 to-orange-500',
    };
    return colors[category] || 'from-primary-500 to-secondary-500';
  };

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my work in data science, machine learning, and software development
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card p-6 h-full flex flex-col card-hover relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Category indicator */}
                <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} mb-4`} />

                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-badge text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-badge text-xs">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <Github className="mr-2 h-4 w-4" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;