import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Stethoscope, Wind, Check, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import PatientModel from '../ui/PatientModel';
import AssessmentAnimation from '../ui/AssessmentAnimation';

export default function ReflexTest() {
  const { reflexes, apnea, setReflexResult, setApneaCompleted, setApneaO2Level, nextStep } = useStore();
  const [activeTest, setActiveTest] = useState(null);

  const tests = [
    { id: 'pupil', label: 'Pupillary Reflex', icon: Eye, desc: 'Shine light in both eyes', x: 45, y: 35 },
    { id: 'corneal', label: 'Corneal Reflex', icon: Eye, desc: 'Touch cornea with cotton swab', x: 55, y: 35 },
    { id: 'gag', label: 'Gag & Cough Reflex', icon: Stethoscope, desc: 'Stimulate posterior pharynx', x: 50, y: 45 },
  ];

  const allReflexesDone = Object.values(reflexes).every(val => val !== null);
  const allTestsDone = allReflexesDone && apnea.completed;

  const hotspots = tests.map(test => ({
    id: test.id,
    label: test.label,
    icon: test.icon,
    x: test.x,
    y: test.y,
    status: reflexes[test.id] !== null ? 'completed' : 'default'
  }));

  // Simulate Apnea Test
  const handleApneaSlider = (e) => {
    const val = parseInt(e.target.value);
    setApneaO2Level(val);
    if (val < 90 && !apnea.completed) {
      setTimeout(() => setApneaCompleted(true), 1000);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto my-auto p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Brainstem Reflexes</h2>
        <p className="text-slate-400">Interact with the patient model to perform clinical reflex testing.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Interactive Patient Model */}
        <div className="w-full flex justify-center">
          <PatientModel 
            hotspots={hotspots} 
            onHotspotClick={setActiveTest}
            activeHotspotId={activeTest}
          />
        </div>

        {/* Right Column: Interaction Panel & Apnea Test */}
        <div className="flex flex-col justify-between space-y-6">
          
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTest ? (
                <motion.div
                  key={activeTest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full flex flex-col items-center justify-center text-center space-y-8 z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                    <AssessmentAnimation type={activeTest} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tests.find(t => t.id === activeTest)?.label}</h3>
                    <p className="text-slate-300">{tests.find(t => t.id === activeTest)?.desc}</p>
                  </div>
                  
                  <div className="flex gap-4 w-full mt-4">
                    <button
                      onClick={() => {
                        setReflexResult(activeTest, 'absent');
                        setActiveTest(null);
                      }}
                      className={cn(
                        "flex-1 py-4 rounded-xl border-2 transition-all font-bold tracking-wide uppercase text-sm",
                        reflexes[activeTest] === 'absent' 
                          ? "bg-danger/20 border-danger text-danger shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                          : "bg-slate-800/80 border-slate-600 text-slate-400 hover:border-danger/50 hover:bg-slate-800"
                      )}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => {
                        setReflexResult(activeTest, 'present');
                        setActiveTest(null);
                      }}
                      className={cn(
                        "flex-1 py-4 rounded-xl border-2 transition-all font-bold tracking-wide uppercase text-sm",
                        reflexes[activeTest] === 'present' 
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                          : "bg-slate-800/80 border-slate-600 text-slate-400 hover:border-emerald-500/50 hover:bg-slate-800"
                      )}
                    >
                      Present
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 text-center z-10 space-y-4"
                >
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto opacity-30">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <p className="text-lg max-w-[250px]">Select a reflex marker on the patient model to begin testing.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          </div>


          <div className="bg-black/40 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Reflexes Log</h3>
            <div className="space-y-3">
              {tests.map((test) => (
                <div 
                  key={test.id} 
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all",
                    reflexes[test.id] !== null
                      ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-200" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400"
                  )}
                >
                  <div className="flex items-center">
                    {reflexes[test.id] !== null ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 mr-3" />
                    )}
                    <span className={cn("font-medium", reflexes[test.id] !== null && "text-emerald-400")}>
                      {test.label}
                    </span>
                  </div>
                  {reflexes[test.id] !== null && (
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded",
                      reflexes[test.id] === 'absent' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {reflexes[test.id]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Apnea Test Section */}
          <AnimatePresence>
            {allReflexesDone && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Wind className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-lg font-bold text-blue-200">Apnea Test (Final Step)</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  Disconnect from ventilator and observe for respiratory effort while supplying oxygen. Slide to simulate oxygenation over time.
                </p>
                
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full" />
                    <AssessmentAnimation type="apnea" />
                  </div>
                  
                  <div className="w-full space-y-4">
                    <input 
                      type="range" 
                      min="60" 
                      max="100" 
                      step="1"
                      value={apnea.o2Level}
                      onChange={handleApneaSlider}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      style={{ direction: 'rtl' }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-200 tracking-wider">SpO2: {apnea.o2Level}%</span>
                      {apnea.completed && (
                        <span className="text-emerald-400 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                          <Check className="w-3 h-3 mr-1" /> Apnea Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: allTestsDone ? 1 : 0 }}
        className="mt-10 flex justify-end"
      >
        <button
          disabled={!allTestsDone}
          onClick={nextStep}
          className="px-8 py-4 bg-primary text-white rounded-full font-medium transition-all hover:bg-blue-600 disabled:opacity-50 hover:scale-105 flex items-center shadow-lg hover:shadow-primary/25"
        >
          Proceed to Monitor Vitals <Wind className="ml-2 w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
