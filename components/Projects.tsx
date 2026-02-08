import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Server, Database, Shield, Cloud, LucideIcon } from 'lucide-react';

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
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              Icon={Icon} 
            />
          );
        })}
      </div>
    </div>
  );
};

// --- Spotlight Card Component ---
interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  Icon: LucideIcon;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, Icon }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
    >
      {/* Spotlight Gradient Layer */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{ 
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)` 
        }}
      />
      
      {/* Decorative Glow (Original) - Reduced opacity to blend with spotlight */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-500" />

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
            <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-black/30 text-gray-300 border border-white/5 group-hover:border-white/20 transition-colors">
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
};

export default Projects;