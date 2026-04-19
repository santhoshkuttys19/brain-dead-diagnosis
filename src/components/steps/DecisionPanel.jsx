import React from 'react';
import useStore from '../../store/useStore';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function DecisionPanel() {
  const { diagnosis, setDiagnosis, nextStep } = useStore();

  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto my-auto p-10 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl text-center overflow-y-auto max-h-[85vh]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8"
      >
        <Brain className="w-12 h-12 text-primary" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Diagnosis Decision</h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Based on the clinical examination, absent brainstem reflexes, and the positive apnea test, what is your official diagnosis?
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12"
      >
        <button
          onClick={() => setDiagnosis('yes')}
          className={cn(
            "p-8 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-4 group",
            diagnosis === 'yes'
              ? "bg-danger/20 border-danger scale-[1.02]"
              : "bg-slate-800 border-slate-700 hover:border-danger/50 hover:bg-slate-800/80"
          )}
        >
          <AlertTriangle className={cn(
            "w-10 h-10 transition-colors",
            diagnosis === 'yes' ? "text-danger" : "text-slate-400 group-hover:text-danger/70"
          )} />
          <div className="text-2xl font-bold">Brain Death</div>
          <div className="text-slate-400 text-sm">Irreversible cessation of all brain function</div>
        </button>

        <button
          onClick={() => setDiagnosis('no')}
          className={cn(
            "p-8 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-4 group",
            diagnosis === 'no'
              ? "bg-primary/20 border-primary scale-[1.02]"
              : "bg-slate-800 border-slate-700 hover:border-primary/50 hover:bg-slate-800/80"
          )}
        >
          <Activity className={cn(
            "w-10 h-10 transition-colors",
            diagnosis === 'no' ? "text-primary" : "text-slate-400 group-hover:text-primary/70"
          )} />
          <div className="text-2xl font-bold">Not Brain Dead</div>
          <div className="text-slate-400 text-sm">Patient shows signs of neurological activity</div>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: diagnosis ? 1 : 0 }}
      >
        <button
          disabled={!diagnosis}
          onClick={nextStep}
          className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:bg-slate-200 disabled:opacity-50 hover:scale-105"
        >
          Confirm & Proceed
        </button>
      </motion.div>
    </div>
  );
}
