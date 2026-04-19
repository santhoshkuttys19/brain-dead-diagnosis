import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import WaveformMonitor from '../ui/WaveformMonitor';

export default function VitalsMonitor() {
  const { vitalsInterpretation, setVitalsInterpretation, nextStep } = useStore();
  const [hr, setHr] = useState(85);
  const [spo2, setSpo2] = useState(98);
  const [bp, setBp] = useState([110, 70]);
  const [etco2, setEtco2] = useState(35);
  
  // Vent settings
  const vent = { pip: 22, rr: 14, vt: 450, fio2: 40 };

  useEffect(() => {
    const interval = setInterval(() => {
      setHr(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setSpo2(prev => Math.min(100, Math.max(90, prev + (Math.random() > 0.8 ? 1 : -1))));
      setBp(prev => [
        prev[0] + (Math.random() > 0.5 ? 1 : -1),
        prev[1] + (Math.random() > 0.5 ? 1 : -1)
      ]);
      setEtco2(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const options = [
    { id: 'stable', label: 'Stable' },
    { id: 'critical', label: 'Critical' },
    { id: 'brain death likely', label: 'Brain Death Likely' },
  ];

  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto my-auto p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h2 className="text-2xl font-bold mb-1">Live Patient Status</h2>
        <p className="text-sm text-slate-400">Review the real-time vitals and ventilator status.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Left Column: Realtime Waveforms (takes 2/3 width) */}
        <div className="lg:col-span-2 bg-black border border-slate-700 rounded-xl overflow-hidden shadow-inner flex flex-col p-2 space-y-1">
          <WaveformMonitor type="ecg" color="#10b981" rate={hr} label="HR" value={hr} height={70} />
          <WaveformMonitor type="spo2" color="#06b6d4" rate={hr} label="SpO2" value={spo2} height={70} />
          <WaveformMonitor type="vent" color="#3b82f6" rate={vent.rr} label="PIP" value={vent.pip} height={70} />
          <WaveformMonitor type="etco2" color="#f8fafc" rate={vent.rr} label="etCO2" value={etco2} height={70} />
        </div>

        {/* Right Column: Other Vitals & Vent Settings */}
        <div className="space-y-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <h3 className="text-slate-400 text-xs font-bold tracking-wider mb-2">NIBP</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-bold text-red-400">{bp[0]}</span>
              <span className="text-2xl text-slate-500">/</span>
              <span className="text-3xl font-bold text-red-400">{bp[1]}</span>
              <span className="ml-2 text-sm text-slate-400">({Math.round((bp[0] + 2*bp[1])/3)})</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <h3 className="text-slate-400 text-xs font-bold tracking-wider mb-3">VENTILATOR SETTINGS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-500 text-xs mb-1">Mode</div>
                <div className="text-white font-medium">SIMV-VC</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Rate</div>
                <div className="text-white font-medium">{vent.rr} <span className="text-slate-500 text-xs font-normal">bpm</span></div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Tidal Vol (Vt)</div>
                <div className="text-white font-medium">{vent.vt} <span className="text-slate-500 text-xs font-normal">mL</span></div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">FiO2</div>
                <div className="text-white font-medium">{vent.fio2}%</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">PEEP</div>
                <div className="text-white font-medium">5 <span className="text-slate-500 text-xs font-normal">cmH2O</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Interpretation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4 text-center">Interpretation of Patient Status</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setVitalsInterpretation(option.id)}
              className={cn(
                "p-3 rounded-xl border text-base font-medium transition-all",
                vitalsInterpretation === option.id
                  ? "bg-primary/20 border-primary text-white scale-[1.02]"
                  : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-700"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: vitalsInterpretation ? 1 : 0 }}
        className="mt-6 flex justify-end"
      >
        <button
          disabled={!vitalsInterpretation}
          onClick={nextStep}
          className="px-8 py-3 bg-primary text-white rounded-full font-medium transition-all hover:bg-blue-600 disabled:opacity-50 hover:scale-105"
        >
          Proceed to Diagnosis Decision
        </button>
      </motion.div>
    </div>
  );
}
