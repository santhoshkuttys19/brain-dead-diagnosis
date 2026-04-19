import React from 'react';
import { motion } from 'framer-motion';
import { Hand, Wind } from 'lucide-react';

export default function AssessmentAnimation({ type }) {
  if (type === 'pupil') {
    return (
      <div className="relative w-56 h-36 flex items-center justify-center">
        {/* Eye Shape */}
        <div className="relative w-40 h-24 bg-white rounded-[50%_50%] border-2 border-slate-300 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
          {/* Iris */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[radial-gradient(circle,_#3b82f6_0%,_#1d4ed8_70%,_#1e3a8a_100%)] rounded-full border border-blue-900/30 flex items-center justify-center">
            {/* Pupil (Fixed/Dilated) */}
            <div className="w-12 h-12 bg-black rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/20 rounded-full blur-[1px]" />
            </div>
          </div>
          
          {/* Light Sweep (The Test) */}
          <motion.div 
            animate={{ x: [-150, 250] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-40 skew-x-[-25deg] z-10 blur-sm"
          />
        </div>
        
        <div className="absolute -bottom-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
          Fixed & Dilated
        </div>
      </div>
    );
  }

  if (type === 'corneal') {
    return (
      <div className="relative w-56 h-36 flex items-center justify-center">
        {/* Eye Shape */}
        <div className="relative w-40 h-24 bg-white rounded-[50%_50%] border-2 border-slate-300 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[radial-gradient(circle,_#60a5fa_0%,_#2563eb_70%,_#1e40af_100%)] rounded-full border border-blue-900/30 flex items-center justify-center">
            <div className="w-10 h-10 bg-black rounded-full" />
          </div>
        </div>

        {/* Cotton Swab */}
        <motion.div
          animate={{ x: [80, -30, 80], y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          className="absolute z-20 flex items-center"
        >
          <div className="w-24 h-1.5 bg-gradient-to-r from-slate-400 to-slate-200 rounded-full" />
          <div className="w-5 h-5 bg-white rounded-full shadow-md border border-slate-200" />
        </motion.div>

        <div className="absolute -bottom-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
          No Blink Response
        </div>
      </div>
    );
  }

  if (type === 'pain') {
    return (
      <div className="relative w-56 h-36 flex items-center justify-center">
        <div className="w-36 h-28 bg-slate-300/40 rounded-3xl border-2 border-slate-400/30 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Pressure ripples */}
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border-2 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          />
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            className="absolute w-16 h-16 rounded-full border-2 border-red-500/20"
          />
          
          <motion.div
            animate={{ scale: [1, 0.95, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="z-10"
          >
            <Hand className="w-12 h-12 text-slate-700 drop-shadow-lg" />
          </motion.div>
        </div>
        
        <div className="absolute -bottom-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
          No Motor Response
        </div>
      </div>
    );
  }

  if (type === 'gag') {
    return (
      <div className="relative w-56 h-36 flex items-center justify-center">
        {/* Mouth/Throat Representation */}
        <div className="relative w-36 h-28 bg-[#f87171]/20 rounded-full border-2 border-[#f87171]/40 overflow-hidden flex items-center justify-center">
          {/* Uvula/Pharynx */}
          <div className="absolute top-4 w-8 h-10 bg-[#f87171]/60 rounded-b-full shadow-inner" />
          <div className="absolute bottom-[-10px] w-28 h-12 bg-[#f87171]/80 rounded-full" />
          
          {/* Suction Catheter / Depressor */}
          <motion.div
            animate={{ y: [40, -10, 40], x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 flex flex-col items-center"
          >
            <div className="w-2 h-32 bg-slate-300 rounded-full border border-slate-400/50" />
            <div className="w-4 h-2 bg-blue-300/30 rounded-t-full" />
          </motion.div>
        </div>
        
        <div className="absolute -bottom-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
          No Gag/Cough Reflex
        </div>
      </div>
    );
  }

  if (type === 'apnea') {
    return (
      <div className="relative w-56 h-36 flex items-center justify-center">
        {/* Torso/Chest Representation */}
        <div className="relative w-40 h-28 bg-slate-800 rounded-3xl border-2 border-slate-700 overflow-hidden flex flex-col items-center justify-center">
          {/* Static Chest Ribs/Lines */}
          <div className="w-24 h-1 bg-slate-700/50 rounded-full mb-2" />
          <div className="w-28 h-1 bg-slate-700/50 rounded-full mb-2" />
          <div className="w-24 h-1 bg-slate-700/50 rounded-full mb-2" />
          
          <Wind className="w-12 h-12 text-blue-500/30" />
          
          {/* Static Indicator */}
          <div className="absolute inset-0 bg-blue-500/5" />
        </div>
        
        <div className="absolute -bottom-4 text-[11px] font-bold text-blue-400 uppercase tracking-[0.2em] bg-blue-900/40 px-3 py-1 rounded-full border border-blue-800/50">
          No Respiratory Effort
        </div>
      </div>
    );
  }

  return null;
}

