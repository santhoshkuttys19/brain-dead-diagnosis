import React from 'react';
import useStore from '../../store/useStore';
import { motion } from 'framer-motion';
import { MessageSquare, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function CommunicationPanel() {
  const { communication, setCommunication, nextStep } = useStore();

  const options = [
    {
      id: 'explain',
      title: 'Direct & Clear',
      desc: '"The tests confirm that brain function has irreversibly ceased. This means your loved one has passed away."',
      icon: MessageSquare
    },
    {
      id: 'empathy',
      title: 'Empathetic Approach',
      desc: '"I am so sorry to tell you this. Despite all our efforts, the tests show no brain activity. They have passed away."',
      icon: Users
    },
    {
      id: 'avoid',
      title: 'Avoid Directness',
      desc: '"The situation is very bad. The brain is not working right now. We need to keep them on the ventilator."',
      icon: MessageSquare
    }
  ];

  return (
    <div className="flex flex-col max-w-3xl mx-auto my-auto p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Family Communication</h2>
        <p className="text-slate-400">
          The family is waiting in the consultation room. How will you deliver the news?
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setCommunication(option.id)}
            className={cn(
              "p-6 rounded-2xl border cursor-pointer transition-all flex items-start group",
              communication === option.id
                ? "bg-primary/20 border-primary"
                : "bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-800/80"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0 transition-colors",
              communication === option.id ? "bg-primary text-white" : "bg-slate-700 text-slate-300"
            )}>
              <option.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-slate-300 italic">"{option.desc}"</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: communication ? 1 : 0 }}
        className="mt-8 flex justify-end"
      >
        <button
          disabled={!communication}
          onClick={nextStep}
          className="px-8 py-4 bg-primary text-white rounded-full font-medium transition-all hover:bg-blue-600 disabled:opacity-50 hover:scale-105"
        >
          View Final Report
        </button>
      </motion.div>
    </div>
  );
}
