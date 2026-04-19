import React, { useState } from 'react';
import useStore from './store/useStore';
import { AnimatePresence } from 'framer-motion';
import EnvironmentSelection from './components/steps/EnvironmentSelection';
import ICULayout from './components/ICULayout';
import InitialLoader from './components/ui/InitialLoader';

function App() {
  const { currentStep } = useStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full bg-black text-slate-100 overflow-hidden font-sans">
      <AnimatePresence>
        {isInitialLoading && (
          <InitialLoader onComplete={() => setIsInitialLoading(false)} />
        )}
      </AnimatePresence>

      {!isInitialLoading && (
        <main className="flex-1 relative flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 ? (
              <EnvironmentSelection key="env" />
            ) : (
              <ICULayout key="icu" />
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}

export default App;

