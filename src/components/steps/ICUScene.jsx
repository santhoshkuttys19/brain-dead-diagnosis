import React from 'react';
import useStore from '../../store/useStore';
import { Activity, ArrowRight, User, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ICUScene() {
  const { nextStep } = useStore();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-2xl w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-center"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 space-y-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl border border-primary/20 mb-2">
            <ClipboardList className="w-10 h-10 text-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              After Entering ICU - Intensive Care Unit
            </h1>
            <div className="h-1 w-20 bg-primary/30 mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed">
              Patient admitted with severe traumatic brain injury. <br className="hidden md:block" />
              Ventilator dependent. No spontaneous movements observed.
            </p>
            
            <p className="text-lg text-slate-400 italic font-light tracking-wide">
              You are now the attending physician.
            </p>
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-primary rounded-2xl overflow-hidden transition-all border border-primary-foreground/20"
            >
              <span className="relative z-10 flex items-center">
                Start Diagnosis Protocol
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
