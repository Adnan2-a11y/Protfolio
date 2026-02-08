import React, { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import ExperienceCanvas from './components/ExperienceCanvas';
import StoryText from './components/StoryText';
import Projects from './components/Projects';
import HUD from './components/HUD';
import ScrambleText from './components/ScrambleText';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-background text-primary min-h-screen font-sans selection:bg-accent selection:text-background overflow-x-hidden">
      
      {/* Film Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.07] mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' 
        }}
      />

      {/* Visual Engine: Sticky Background */}
      <ExperienceCanvas scrollProgress={scrollYProgress} />
      
      {/* Heads-Up Display */}
      <HUD />

      {/* Scrollable Content Container */}
      <div ref={containerRef} className="relative z-10">
        
        {/* Stage 0: Hero Intro */}
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
              <ScrambleText text="The Architect" delay={0.8} />
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
              <ScrambleText text="Crafting logic from chaos." delay={2} className="text-accent/80 font-mono text-sm md:text-xl" />
            </p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 opacity-50"
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* Stage 1: MERN */}
        <StoryText align="right">
          <h2 className="text-3xl font-bold text-accent mb-2">The Foundation: MERN</h2>
          <p className="text-gray-300 leading-relaxed">
            My journey began with the full stack. Mastering MongoDB, Express, React, and Node.js allowed me to see the complete picture of data flow, from database schemas to the pixel on the screen.
          </p>
        </StoryText>

        {/* Stage 2: Git */}
        <StoryText align="left">
          <h2 className="text-3xl font-bold text-purple-400 mb-2">Version Control: Git</h2>
          <p className="text-gray-300 leading-relaxed">
            Chaos became order. Learning Git wasn't just about saving code; it was about understanding history, branching realities, and merging complex thoughts into a single source of truth.
          </p>
        </StoryText>

        {/* Stage 3: Linux */}
        <StoryText align="center">
          <h2 className="text-3xl font-bold text-green-400 mb-2">The Command Line: Linux</h2>
          <p className="text-gray-300 leading-relaxed font-mono text-sm md:text-base">
            $ sudo apt-get install power<br/>
            I embraced the terminal. Removing the GUI taught me to speak directly to the machine, managing processes, permissions, and the kernel itself.
          </p>
        </StoryText>

        {/* Stage 4: Docker */}
        <StoryText align="right">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">Containerization: Docker</h2>
          <p className="text-gray-300 leading-relaxed">
            "It works on my machine" became obsolete. Encapsulating environments ensured that my applications could run anywhere—reproducible, isolated, and resilient.
          </p>
        </StoryText>

        {/* Stage 5: VPS/Cloud */}
        <StoryText align="left">
          <h2 className="text-3xl font-bold text-white mb-2">Ascension: Cloud & VPS</h2>
          <p className="text-gray-300 leading-relaxed">
            Deploying to the cloud. Configuring Nginx, setting up firewalls, and managing VPS instances transformed me from a coder into an architect of the internet.
          </p>
        </StoryText>

        {/* Spacer for final transition before projects */}
        <div className="h-[50vh]" />

        {/* Projects Section (Standard Scroll) */}
        <section className="relative min-h-screen w-full bg-background/80 backdrop-blur-xl border-t border-white/10">
           <Projects />
           
           <footer className="w-full py-12 text-center text-gray-500 text-sm border-t border-white/5">
             <p>© {new Date().getFullYear()} Backend Architect. Built with React & Tailwind.</p>
           </footer>
        </section>

      </div>
    </div>
  );
};

export default App;