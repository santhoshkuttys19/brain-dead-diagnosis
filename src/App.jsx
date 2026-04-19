import React, { useState } from 'react';
import useStore from './store/useStore';
import { AnimatePresence } from 'framer-motion';
import EnvironmentSelection from './components/steps/EnvironmentSelection';
import ICULayout from './components/ICULayout';
import InitialLoader from './components/ui/InitialLoader';

function App() {
  const { currentStep, isMuted } = useStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = 0.75;
        audioRef.current.play().catch(() => {});
      }
    };

    const playClickSfx = (volume = 0.4) => {
      if (!isMuted) {
        const sfx = new Audio('/click.mp3');
        sfx.volume = volume;
        sfx.play().catch(() => {});
      }
    };

    const handleGlobalClick = (e) => {
      if (e.target.closest('button')) {
        playClickSfx(0.6);
      }
      playAudio(); // Still handle the first interaction for background music
    };

    window.addEventListener('click', handleGlobalClick);
    
    if (isMuted) {
      if (audioRef.current) audioRef.current.pause();
    } else {
      playAudio();
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [isMuted]);

  return (
    <div className="flex flex-col h-screen w-full bg-black text-slate-100 overflow-hidden font-sans">
      <audio ref={audioRef} src="/loading.mp3" loop />

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

