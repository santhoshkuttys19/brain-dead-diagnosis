import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, Eye, Hand } from 'lucide-react';
import { cn } from '../../utils/cn';
import PatientModel from '../ui/PatientModel';
import AssessmentAnimation from '../ui/AssessmentAnimation';

export default function Checklist() {
  const { checklist, updateChecklist, nextStep } = useStore();
  const [activeItem, setActiveItem] = useState(null);

  const isAllChecked = Object.values(checklist).every(Boolean);

  const items = [
    { id: 'pupil', label: 'Pupillary Response', desc: 'Check for fixed and dilated pupils', icon: Eye, x: 45, y: 35 },
    { id: 'corneal', label: 'Corneal Reflex', desc: 'Observe response to corneal stimulation', icon: Eye, x: 55, y: 35 },
    { id: 'pain', label: 'Pain Response', desc: 'Apply supraorbital or sternal pressure', icon: Hand, x: 50, y: 65 },
  ];

  const hotspots = items.map(item => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    x: item.x,
    y: item.y,
    status: checklist[item.id] ? 'completed' : 'default'
  }));

  const handleHotspotClick = (id) => {
    setActiveItem(id);
  };

  const completeAction = () => {
    if (activeItem) {
      if (!checklist[activeItem]) updateChecklist(activeItem);
      setActiveItem(null);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto my-auto p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-white">Initial Assessment Checklist</h2>
        <p className="text-slate-400">Perform the initial clinical examinations by interacting with the patient.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Interactive Patient Model */}
        <div className="w-full flex justify-center">
          <PatientModel 
            hotspots={hotspots} 
            onHotspotClick={handleHotspotClick}
            activeHotspotId={activeItem}
          />
        </div>

        {/* Right Column: Interaction Panel & Checklist */}
        <div className="flex flex-col justify-between space-y-6">
          
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeItem}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full flex flex-col items-center justify-center text-center space-y-8 z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                    <AssessmentAnimation type={activeItem} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{items.find(i => i.id === activeItem)?.label}</h3>
                    <p className="text-slate-300">{items.find(i => i.id === activeItem)?.desc}</p>
                  </div>
                  
                  <button
                    onClick={completeAction}
                    className="mt-4 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/50 flex items-center"
                  >
                    Assess Response <CheckCircle2 className="ml-2 w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 text-center z-10 space-y-4"
                >
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto opacity-30">
                    <Hand className="w-8 h-8" />
                  </div>
                  <p className="text-lg max-w-[250px]">Select a hotspot on the patient model to begin clinical assessment.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          </div>


          <div className="bg-black/40 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Assessment Progress</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex items-center p-3 rounded-lg border transition-all",
                    checklist[item.id] 
                      ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-200" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400"
                  )}
                >
                  {checklist[item.id] ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 mr-3" />
                  )}
                  <span className={cn("font-medium", checklist[item.id] && "text-emerald-400")}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAllChecked ? 1 : 0 }}
        className="mt-10 flex justify-end"
      >
        <button
          disabled={!isAllChecked}
          onClick={nextStep}
          className="px-8 py-4 bg-primary text-white rounded-full font-medium transition-all hover:bg-blue-600 disabled:opacity-50 hover:scale-105 flex items-center shadow-lg hover:shadow-primary/25"
        >
          Proceed to Brainstem Reflexes <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
