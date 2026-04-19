import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { Clock, Activity, Droplet, Home, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Step Components
import ICUScene from './steps/ICUScene';
import Checklist from './steps/Checklist';
import ReflexTest from './steps/ReflexTest';
import VitalsMonitor from './steps/VitalsMonitor';
import DecisionPanel from './steps/DecisionPanel';
import CommunicationPanel from './steps/CommunicationPanel';
import FeedbackScreen from './steps/FeedbackScreen';

export default function ICULayout() {
  const { currentStep, resetStore } = useStore();
  const [timeStr, setTimeStr] = useState('00:00:00');

  // Simple timer simulator
  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <ICUScene key="step1" />;
      case 2: return <Checklist key="step2" />;
      case 3: return <ReflexTest key="step3" />;
      case 4: return <VitalsMonitor key="step4" />;
      case 5: return <DecisionPanel key="step5" />;
      case 6: return <CommunicationPanel key="step6" />;
      case 7: return <FeedbackScreen key="step7" />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/icu_room.png')` }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Persistent HUD / Top Bar */}
      <div className="absolute top-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-6 z-20 shadow-lg">
        <div className="flex items-center space-x-6">
          <button 
            onClick={resetStore}
            className="p-2 bg-slate-800 hover:bg-primary/20 text-slate-400 hover:text-primary rounded-xl border border-slate-700 transition-all group"
            title="Return to Home"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="h-8 w-[1px] bg-slate-700 hidden md:block" />

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-800 px-4 py-1.5 rounded-full border border-slate-600 shadow-inner">
              <User className="w-4 h-4 text-primary mr-2" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">James</span>
            </div>
            
            <div className="flex items-center bg-slate-800 px-4 py-1.5 rounded-full border border-slate-600 shadow-inner">
              <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-tighter hidden lg:inline">VR Connected</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-tighter lg:hidden">VR</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-700 hidden xl:block" />

          <div className="hidden xl:flex items-center space-x-4">
            <div className="flex items-center bg-slate-800 px-4 py-1.5 rounded-full border border-slate-600">
              <Clock className="w-4 h-4 text-slate-400 mr-2" />
              <span className="font-mono text-xs tracking-wider">{timeStr}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <div className="flex items-center text-primary">
            <Activity className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">SpO2: 94%</span>
            <span className="sm:hidden">94%</span>
          </div>
          <div className="flex items-center text-accent">
            <Activity className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">HR: 120</span>
            <span className="sm:hidden">120</span>
          </div>
          <div className="flex items-center text-purple-400">
            <Droplet className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">BP: 97/115</span>
            <span className="sm:hidden">97/115</span>
          </div>
        </div>
      </div>

      {/* Active Step Content */}
      <div className="relative z-10 w-full h-full pt-16 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-1 w-full flex items-center justify-center overflow-hidden"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

