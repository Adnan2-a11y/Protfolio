import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { RANDOM_SPHERES } from '../constants';

interface ExperienceCanvasProps {
  scrollProgress: MotionValue<number>;
}

const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({ scrollProgress }) => {
  // 1. Spring Physics for Organic Feel (Stiffness 100, Damping 20)
  const smoothProgress = useSpring(scrollProgress, { damping: 20, stiffness: 100 });

  // 2. Mouse Parallax State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX / window.innerWidth - 0.5,
        y: ev.clientY / window.innerHeight - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth mouse movement
  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  // Parallax transforms
  // Background moves opposite to mouse
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]); 
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
  
  // Main sphere moves slightly with mouse (depth effect)
  const mainX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const mainYParallax = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

  // --- Animation Timeline ---
  // 0.00 - 0.15: Hero (Junior -> Absorb)
  // 0.15 - 0.30: MERN (Growth, Heartbeat)
  // 0.30 - 0.45: Git (Ghost Trails)
  // 0.45 - 0.60: Linux (Terminal Ring)
  // 0.60 - 0.75: Docker (Wireframe Box)
  // 0.75 - 0.90: VPS (Sun & Satellites)
  // 0.90 - 1.00: Exit

  // --- Main Sphere Properties ---
  const sphereScale = useTransform(smoothProgress, 
    [0, 0.1, 0.15, 0.6, 0.75, 0.9], 
    [0.5, 0.5, 1, 1, 0.8, 1.5]
  );
  
  // Color/Glow Bloom Map
  const sphereShadow = useTransform(smoothProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
    [
      "0px 0px 5px rgba(255,255,255,0.1)",     // Junior (Weak)
      "0px 0px 40px rgba(56, 189, 248, 0.6)",  // MERN (Cyan Pulse)
      "0px 0px 30px rgba(168, 85, 247, 0.5)",  // Git (Purple)
      "0px 0px 30px rgba(34, 197, 94, 0.5)",   // Linux (Green)
      "0px 0px 50px rgba(59, 130, 246, 0.6)",  // Docker (Blue)
      "0px 0px 120px rgba(255, 255, 255, 0.9)",// VPS (Sun)
      "0px 0px 0px rgba(0,0,0,0)"              // Exit
    ]
  );
  
  const sphereColor = useTransform(smoothProgress,
    [0, 0.15, 0.75, 0.9],
    ["#333333", "#f8fafc", "#f8fafc", "#ffffff"]
  );

  // Junior Flicker (Opacity noise)
  const juniorFlickerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // MERN Heartbeat Opacity
  const mernOpacity = useTransform(smoothProgress, [0.12, 0.15, 0.28, 0.32], [0, 1, 1, 0]);

  // Git Ghost Trails
  const gitOpacity = useTransform(smoothProgress, [0.28, 0.30, 0.43, 0.47], [0, 1, 1, 0]);

  // Linux Terminal
  const linuxOpacity = useTransform(smoothProgress, [0.43, 0.47, 0.58, 0.62], [0, 1, 1, 0]);
  const linuxRotate = useTransform(smoothProgress, [0.45, 0.6], [0, 45]);

  // Docker Container
  const dockerOpacity = useTransform(smoothProgress, [0.58, 0.62, 0.73, 0.77], [0, 1, 1, 0]);
  const dockerRotate = useTransform(smoothProgress, [0.6, 0.75], [0, 90]);

  // VPS / Satellites
  const vpsOpacity = useTransform(smoothProgress, [0.73, 0.77, 0.88, 0.92], [0, 1, 1, 0]);
  const mainYScroll = useTransform(smoothProgress, [0.75, 0.9], ["0vh", "-15vh"]); // Rise up
  
  // Combine scroll Y and parallax Y
  const mainY = useTransform(() => {
     // We need to parse the scroll 'vh' value and add the parallax 'px' value
     // Simplified: Just use translateY in style for parallax, and 'top' or 'y' for scroll
     return mainYScroll.get();
  }, [mainYScroll]);

  const exitOpacity = useTransform(smoothProgress, [0.9, 0.95], [1, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden perspective-1000 flex items-center justify-center bg-background">
      
      {/* 
         BACKGROUND SATELLITE SPHERES 
         Parallax Wrapper
      */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{ x: bgX, y: bgY }}
      >
        {RANDOM_SPHERES.map((sphere) => {
          const stagger = sphere.id * 0.002;
          
          const xVal = useTransform(smoothProgress, 
            [0, 0.12 + stagger, 0.75, 0.9], 
            [`${sphere.x}vw`, "0vw", "0vw", `${sphere.orbitR * Math.cos(sphere.orbitAngle * Math.PI / 180)}px`]
          );
          
          const yVal = useTransform(smoothProgress, 
            [0, 0.12 + stagger, 0.75, 0.9], 
            [`${sphere.y}vh`, "0vh", "0vh", `${sphere.orbitR * Math.sin(sphere.orbitAngle * Math.PI / 180)}px`]
          );

          const opacityVal = useTransform(smoothProgress,
            [0, 0.12 + stagger, 0.15, 0.75, 0.8],
            [0.6, 0, 0, 0, 0.8]
          );

          const scaleVal = useTransform(smoothProgress,
            [0, 0.12, 0.75, 0.9],
            [sphere.scale, 0, 0, sphere.scale * 0.5]
          );

          return (
            <motion.div
              key={sphere.id}
              className="absolute rounded-full bg-surface border border-gray-800"
              style={{
                x: xVal,
                y: yVal,
                width: '2rem',
                height: '2rem',
                scale: scaleVal,
                opacity: opacityVal,
              }}
            />
          );
        })}

       {/* ROTATING SATELLITE CONTAINER (VPS Phase) */}
       <motion.div 
         className="absolute inset-0 flex items-center justify-center"
         style={{ opacity: vpsOpacity }}
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
       />
      </motion.div>


      {/* --- MAIN CHARACTER SPHERE --- */}
      <motion.div 
        className="relative z-10 flex items-center justify-center"
        style={{ 
          y: mainYScroll, // Base scroll position
          x: mainX, // Parallax X
          translateY: mainYParallax, // Parallax Y addition
          opacity: exitOpacity,
        }}
      >
        {/* The Sphere Itself */}
        <motion.div
          className="relative z-20 rounded-full flex items-center justify-center"
          style={{
            width: '6rem', 
            height: '6rem',
            scale: sphereScale,
            backgroundColor: sphereColor,
            boxShadow: sphereShadow,
          }}
        >
          {/* Phase 1: Junior Flickering Core */}
          <motion.div 
            style={{ opacity: juniorFlickerOpacity }}
            className="absolute inset-0 bg-black/60 rounded-full animate-pulse"
          />
          
          {/* Phase 2: MERN Heartbeat Ring */}
          <motion.div
            style={{ opacity: mernOpacity }}
            className="absolute inset-0 border-2 border-accent rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Phase 3: Git Ghost Trails */}
        <motion.div style={{ opacity: gitOpacity }} className="absolute inset-0 flex items-center justify-center -z-10">
           {[-1, 1].map((dir, i) => (
             <motion.div
                key={i}
                className="absolute w-24 h-24 rounded-full bg-purple-500/20 blur-sm"
                style={{
                   x: useTransform(smoothProgress, [0.3, 0.35, 0.4], [0, dir * 60, 0]),
                   scale: useTransform(smoothProgress, [0.3, 0.35, 0.4], [0.8, 0.9, 0.8])
                }}
             />
           ))}
           {/* Branch Lines */}
           <svg className="absolute w-[300px] h-[100px] overflow-visible opacity-30">
             <motion.path 
               d="M150 50 Q 100 50, 80 50" 
               stroke="white" strokeWidth="2" fill="none"
               style={{ pathLength: useTransform(smoothProgress, [0.3, 0.35], [0, 1]) }}
             />
             <motion.path 
               d="M150 50 Q 200 50, 220 50" 
               stroke="white" strokeWidth="2" fill="none"
               style={{ pathLength: useTransform(smoothProgress, [0.3, 0.35], [0, 1]) }}
             />
           </svg>
        </motion.div>

        {/* Phase 4: Linux Terminal Ring (3D Tilted) */}
        <motion.div 
          style={{ opacity: linuxOpacity, rotateX: 70, rotate: linuxRotate }} 
          className="absolute inset-0 flex items-center justify-center -z-10 transform-style-3d"
        >
           <div className="w-[340px] h-[340px] rounded-full border border-green-500/40 border-dashed animate-[spin_20s_linear_infinite]" />
           <div className="w-[300px] h-[300px] rounded-full border border-green-500/60 flex items-center justify-center animate-[spin_10s_linear_reverse_infinite] absolute">
              <span className="absolute -top-3 bg-background px-2 text-green-400 text-xs font-mono">ROOT ACCESS</span>
              <span className="absolute -bottom-3 bg-background px-2 text-green-400 text-xs font-mono">SYSTEMD</span>
           </div>
        </motion.div>

        {/* Phase 5: Docker 3D Wireframe Box */}
        <motion.div 
           style={{ opacity: dockerOpacity, rotateX: dockerRotate, rotateY: dockerRotate }}
           className="absolute flex items-center justify-center transform-style-3d -z-10"
        >
           <div className="relative w-48 h-48 transform-style-3d">
              {/* Front */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 translate-z-24 backdrop-blur-[1px]" style={{ transform: 'translateZ(96px)' }}>
                <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full" />
                <div className="absolute bottom-2 right-2 w-4 h-1 bg-blue-400/50" />
              </div>
              {/* Back */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 translate-z-[-24]" style={{ transform: 'translateZ(-96px) rotateY(180deg)' }} />
              {/* Right */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 rotate-y-90 translate-z-24" style={{ transform: 'rotateY(90deg) translateZ(96px)' }} />
              {/* Left */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 rotate-y-[-90] translate-z-24" style={{ transform: 'rotateY(-90deg) translateZ(96px)' }} />
              {/* Top */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 rotate-x-90 translate-z-24" style={{ transform: 'rotateX(90deg) translateZ(96px)' }} />
              {/* Bottom */}
              <div className="absolute inset-0 border border-blue-400/30 bg-blue-500/5 rotate-x-[-90] translate-z-24" style={{ transform: 'rotateX(-90deg) translateZ(96px)' }} />
           </div>
        </motion.div>

        {/* Phase 6: VPS Particles & Satellites */}
        <motion.div style={{ opacity: vpsOpacity }} className="absolute inset-0 flex items-center justify-center -z-20">
           {/* Sun Halo */}
           <div className="w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl absolute" />
           <div className="w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl absolute" />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ExperienceCanvas;