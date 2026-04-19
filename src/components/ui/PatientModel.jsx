import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Stethoscope, Hand, Wind } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * hotspots: Array of objects { id, x, y, icon, label, status (default, active, completed) }
 * x and y are percentages (0-100) from the top-left of the image.
 */
export default function PatientModel({ hotspots, onHotspotClick, activeHotspotId }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
      {/* 3D-Style Patient Image */}
      <img 
        src="/patient_model.png" 
        alt="Patient Model" 
        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
      />
      
      {/* Dark gradient overlay to make hotspots pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

      {/* Hotspots */}
      <AnimatePresence>
        {hotspots.map((spot) => {
          const isCompleted = spot.status === 'completed';
          const isActive = activeHotspotId === spot.id;
          
          return (
            <motion.div
              key={spot.id}
              className="absolute z-10 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {/* Pulsing ring for non-completed hotspots */}
              {!isCompleted && !isActive && (
                <div className="absolute w-12 h-12 rounded-full bg-blue-500/30 animate-ping" />
              )}
              
              <button
                onClick={() => onHotspotClick(spot.id)}
                className={cn(
                  "relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border-2 transition-all shadow-lg hover:scale-110",
                  isCompleted 
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                    : isActive 
                      ? "bg-amber-500/40 border-amber-400 text-amber-200 ring-4 ring-amber-500/30"
                      : "bg-blue-500/20 border-blue-400 text-blue-200 cursor-pointer"
                )}
              >
                <spot.icon className={cn("w-6 h-6", isCompleted && "opacity-80")} />
                
                {/* Checkmark for completed */}
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-4 h-4 flex items-center justify-center border border-slate-900">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
              
              {/* Label */}
              <motion.div 
                className={cn(
                  "mt-2 px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap backdrop-blur-md border shadow-lg transition-colors",
                  isCompleted 
                    ? "bg-emerald-900/60 border-emerald-700 text-emerald-200" 
                    : isActive
                      ? "bg-amber-900/80 border-amber-500 text-amber-200"
                      : "bg-slate-900/80 border-slate-600 text-slate-300"
                )}
              >
                {spot.label}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
