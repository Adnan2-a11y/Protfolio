import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Server, Database, Shield, Cloud } from 'lucide-react';

const icons = [Server, Database, Shield, Cloud];

const Projects: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Architected Systems
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
          Scalable solutions built for performance, security, and reliability.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {/* Decorative Gradient */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-accent">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-black/30 text-gray-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors cursor-pointer">
                  <span>View Case Study</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;