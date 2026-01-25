'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart, Code2, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">DJ</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-xs">
              Data Scientist & Software Engineer passionate about building intelligent solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              your.email@gmail.com
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              India
            </p>
            <a href="#contact" className="btn-primary text-sm inline-flex">
              Contact Me
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            © {currentYear} DJ. Built with <Heart className="h-4 w-4 text-red-500 inline" /> using Next.js & FastAPI
          </p>
          
          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-500 hover:text-white transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;