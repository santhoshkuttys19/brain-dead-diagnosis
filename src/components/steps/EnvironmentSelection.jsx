import React from 'react';
import useStore from '../../store/useStore';
import { motion } from 'framer-motion';
import { User, Cpu, Volume2, VolumeX } from 'lucide-react';

export default function EnvironmentSelection() {
  const { setStep, isMuted, toggleMute } = useStore();

  const environments = [
    { id: 'ed', label: 'ED', x: -150, y: 50 },
    { id: 'icu', label: 'ICU', x: 150, y: 50 },
    { id: 'or', label: 'OR', x: 0, y: -100 },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/hospital_corridor.png')` }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Top Status Bar (Persistent Info) */}
      <div className="absolute top-0 left-0 w-full h-16 px-8 flex items-center justify-between z-20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <User className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">James</span>
          </div>

          <button 
            onClick={toggleMute}
            className="flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 transition-all"
            title={isMuted ? "Unmute Ambient Music" : "Mute Ambient Music"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5 animate-pulse text-primary" />
            )}
          </button>
        </div>

        <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <div className="flex items-center text-accent">
            <Cpu className="w-5 h-5 mr-3" />
            <span className="text-sm font-bold tracking-widest uppercase">VR Connected</span>
            <div className="ml-3 w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-16">
        <div className="relative w-full max-w-2xl h-96 flex items-center justify-center">
          {environments.map((env, index) => (
            <motion.button
              key={env.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: env.x, y: env.y }}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
              onClick={() => {
                if (env.id === 'icu') setStep(1); // Proceed to ICU scene
              }}
              className={`absolute w-32 h-32 rounded-full flex flex-col items-center justify-center 
                backdrop-blur-md border-2 transition-all group
                ${env.id === 'icu' 
                  ? 'bg-primary/30 border-primary/50 hover:bg-primary/50 hover:scale-110 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                  : 'bg-slate-800/40 border-slate-600/50 cursor-not-allowed opacity-70'}`}
            >
              <span className="text-2xl font-bold text-white tracking-widest">{env.label}</span>
              {env.id === 'icu' && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -bottom-8 text-sm font-medium text-blue-200 whitespace-nowrap bg-black/50 px-3 py-1 rounded-full"
                >
                  Enter Unit
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-2xl font-medium text-white tracking-wide drop-shadow-lg text-center"
        >
          Please select a clinical environment to begin.
        </motion.p>
      </div>
    </div>
  );
}

