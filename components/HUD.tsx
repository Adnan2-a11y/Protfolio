import React from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Terminal, Database, GitBranch, Box, Cloud, Cpu, LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  icon: LucideIcon;
  color: string;
}

const SKILLS: Skill[] = [
  { name: "Initiate", level: "Junior Dev", icon: Cpu, color: "text-gray-400" },
  { name: "Full Stack", level: "MERN Dev", icon: Database, color: "text-accent" },
  { name: "Versioning", level: "Git Master", icon: GitBranch, color: "text-purple-400" },
  { name: "SysAdmin", level: "Linux User", icon: Terminal, color: "text-green-400" },
  { name: "DevOps", level: "Docker Pro", icon: Box, color: "text-blue-400" },
  { name: "Architect", level: "Cloud Native", icon: Cloud, color: "text-white" },
];

const HUD: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Map progress to active index (0 to 5)
  // Ranges match ExperienceCanvas roughly:
  // 0-0.15 (0), 0.15-0.3 (1), 0.3-0.45 (2), 0.45-0.6 (3), 0.6-0.75 (4), 0.75+ (5)
  const activeIndex = useTransform(smoothProgress, 
    [0, 0.15, 0.3, 0.45, 0.6, 0.75], 
    [0, 1, 2, 3, 4, 5]
  );

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl w-64">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
          <span className="text-xs font-mono text-gray-500">SYSTEM STATUS</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-green-500">ONLINE</span>
          </div>
        </div>

        {/* Level Indicator */}
        <div className="mb-6">
           <span className="text-xs text-gray-400 uppercase tracking-wider">Current Clearance</span>
           <motion.div className="text-xl font-bold font-mono mt-1 text-white">
             <SkillText activeIndex={activeIndex} />
           </motion.div>
        </div>

        {/* Progress Bars / Skill Tree */}
        <div className="space-y-3">
          {SKILLS.map((skill, i) => (
             <SkillRow key={i} index={i} skill={skill} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SkillRowProps {
  index: number;
  skill: Skill;
  activeIndex: MotionValue<number>;
}

// Sub-component to handle motion value active state for rows
const SkillRow: React.FC<SkillRowProps> = ({ index, skill, activeIndex }) => {
  const [active, setActive] = React.useState(false);
  
  React.useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest: number) => {
       setActive(latest >= index);
    });
    return () => unsubscribe();
  }, [activeIndex, index]);

  return (
    <div className={`flex items-center gap-3 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`p-1.5 rounded-lg bg-white/5 ${active ? skill.color : 'text-gray-600'}`}>
        <skill.icon size={14} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className={active ? "text-white font-semibold" : "text-gray-500"}>{skill.name}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             className={`h-full ${active ? 'bg-current' : 'bg-transparent'} ${skill.color}`}
             initial={{ width: 0 }}
             animate={{ width: active ? '100%' : '0%' }}
             transition={{ duration: 0.5 }}
           />
        </div>
      </div>
    </div>
  );
};

interface SkillTextProps {
  activeIndex: MotionValue<number>;
}

const SkillText: React.FC<SkillTextProps> = ({ activeIndex }) => {
  const [text, setText] = React.useState(SKILLS[0].level);
  
  React.useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest: number) => {
       const index = Math.min(Math.floor(latest), SKILLS.length - 1);
       // Handle case where index might be negative or out of bounds if spring overshoots
       const safeIndex = Math.max(0, index);
       setText(SKILLS[safeIndex]?.level || SKILLS[0].level);
    });
    return () => unsubscribe();
  }, [activeIndex]);

  return <>{text}</>;
};

export default HUD;