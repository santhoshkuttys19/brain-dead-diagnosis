import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

// Step Components
import ICUScene from './steps/ICUScene';
import Checklist from './steps/Checklist';
import ReflexTest from './steps/ReflexTest';
import VitalsMonitor from './steps/VitalsMonitor';
import DecisionPanel from './steps/DecisionPanel';
import CommunicationPanel from './steps/CommunicationPanel';
import FeedbackScreen from './steps/FeedbackScreen';

export default function StepManager() {
  const { currentStep } = useStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ICUScene key="step1" />;
      case 2:
        return <Checklist key="step2" />;
      case 3:
        return <ReflexTest key="step3" />;
      case 4:
        return <VitalsMonitor key="step4" />;
      case 5:
        return <DecisionPanel key="step5" />;
      case 6:
        return <CommunicationPanel key="step6" />;
      case 7:
        return <FeedbackScreen key="step7" />;
      default:
        return <ICUScene key="step1" />;
    }
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
