import React, { useEffect } from 'react';
import useStore from '../../store/useStore';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FeedbackScreen() {
  const { score, calculateScore, resetStore, checklist, reflexes, apnea, vitalsInterpretation, diagnosis, communication } = useStore();

  useEffect(() => {
    calculateScore();
  }, [calculateScore]);

  // Max score is 70
  const percentage = Math.round((score / 70) * 100) || 0;

  const FeedbackItem = ({ label, isCorrect }) => (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700">
      <span className="text-slate-300 font-medium">{label}</span>
      {isCorrect ? (
        <CheckCircle2 className="w-6 h-6 text-accent" />
      ) : (
        <XCircle className="w-6 h-6 text-danger" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col max-w-3xl mx-auto my-auto p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center mb-8 pt-8"
      >
        <div className="relative mb-6">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-slate-800"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              className={cn(
                "stroke-current",
                percentage >= 80 ? "text-accent" : percentage >= 50 ? "text-yellow-500" : "text-danger"
              )}
              strokeWidth="12"
              fill="none"
              strokeDasharray="552"
              initial={{ strokeDashoffset: 552 }}
              animate={{ strokeDashoffset: 552 - (552 * percentage) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">{percentage}%</span>
            <span className="text-slate-400 text-sm mt-1">Accuracy</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">Simulation Complete</h2>
        <p className="text-slate-400 text-center max-w-lg">
          {percentage >= 80 
            ? "Excellent work. You followed the brain death diagnosis protocol accurately." 
            : percentage >= 50
            ? "Good effort, but you missed some critical steps in the protocol."
            : "You missed several critical steps. Review the clinical guidelines and try again."}
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4 mb-12"
      >
        <h3 className="text-xl font-semibold mb-4">Protocol Review</h3>
        
        <FeedbackItem label="Initial Assessment (Pupil, Corneal, Pain)" isCorrect={checklist.pupil && checklist.corneal && checklist.pain} />
        <FeedbackItem label="Brainstem Reflexes (All Absent)" isCorrect={reflexes.pupil === 'absent' && reflexes.corneal === 'absent' && reflexes.gag === 'absent'} />
        <FeedbackItem label="Apnea Test Completed" isCorrect={apnea.completed} />
        <FeedbackItem label="Vitals Interpretation (Brain Death Likely)" isCorrect={vitalsInterpretation === 'brain death likely'} />
        <FeedbackItem label="Correct Diagnosis (Yes)" isCorrect={diagnosis === 'yes'} />
        <FeedbackItem label="Appropriate Family Communication" isCorrect={communication === 'explain' || communication === 'empathy'} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center"
      >
        <button
          onClick={resetStore}
          className="flex items-center px-8 py-4 bg-slate-800 text-white rounded-full font-medium transition-all hover:bg-slate-700 hover:scale-105 border border-slate-600"
        >
          <RefreshCw className="mr-2 w-5 h-5" /> Start Over
        </button>
      </motion.div>
    </div>
  );
}
