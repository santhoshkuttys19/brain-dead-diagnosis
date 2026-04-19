import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const loadingSteps = [
  "INITIALIZING NEURAL INTERFACE...",
  "CONNECTING VR DEVICE...",
  "SYNCING CLINICAL PARAMETERS...",
  "LOADING ICU ENVIRONMENT...",
  "SETTING UP PROTOCOL...",
  "READY"
];

export default function InitialLoader({ onComplete }) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isStarted) return;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        setTimeout(onComplete, 1000); // Wait a bit after "READY"
        return prev;
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5;
        return next > 100 ? 100 : next;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete, isStarted]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%]" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 flex flex-col items-center"
      >
        {/* Logo Container */}
        <div className="relative mb-12">
          <motion.div
            animate={{ 
              boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 40px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-48 h-48 rounded-full bg-white p-4 flex items-center justify-center overflow-hidden border-4 border-primary/30"
          >
            {/* Assume logo is at /logo.png or src/assets/logo.png */}
            <img 
              src="/logo.png" 
              alt="ASC Softtech" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200?text=ASC+SOFTTECH"; // Fallback
              }}
            />
          </motion.div>
          
          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full"
          />
        </div>

        {/* System Interaction / Progress */}
        <div className="w-80 h-32 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.button
                key="start-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsStarted(true);
                }}
                className="px-8 py-4 bg-primary/20 border border-primary/50 text-primary font-bold tracking-[0.3em] rounded-xl hover:bg-primary/30 transition-all uppercase"
              >
                Initialize System
              </motion.button>
            ) : (
              <motion.div
                key="loading-progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-4"
              >
                <div className="flex justify-between text-xs text-primary/70 mb-1 tracking-widest">
                  <span>SYSTEM_BOOT_SEQUENCE</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,1)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Dynamic Status Text */}
                <div className="h-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-primary font-bold tracking-[0.2em] text-sm uppercase text-center"
                    >
                      {loadingSteps[currentStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Binary/Data Stream Decoration */}
        <div className="mt-12 text-[10px] text-slate-600 grid grid-cols-4 gap-4 opacity-50">
          <div>0XFF44_CORE</div>
          <div>MEM_SYNK_OK</div>
          <div>VR_LINK_UP</div>
          <div>GPU_ACCEL_ON</div>
        </div>
      </motion.div>
    </div>
  );
}
