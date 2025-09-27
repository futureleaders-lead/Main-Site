import React, { useState, useEffect, useCallback } from 'react';
import { Presentation } from './components/Presentation';
import { ControlPanel } from './components/ControlPanel';
import { AGENDA_ITEMS } from './constants';

const assetsToPreload = [
  'https://files.catbox.moe/bvw8pn.png', // Logo
  'https://files.catbox.moe/46tzb5.png', // Ceremony Graphic
  ...AGENDA_ITEMS.filter(item => item.photoUrl).map(item => item.photoUrl!)
];

const LoadingScreen: React.FC = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0B1A55] text-white">
    <img src="https://files.catbox.moe/bvw8pn.png" alt="LEAD College Logo" className="w-48 h-48 object-contain mb-8 animate-pulse" />
    <p className="text-xl tracking-wider animate-pulse">Loading Ceremony...</p>
  </div>
);

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControllerHint, setShowControllerHint] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const promises = assetsToPreload.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        await Promise.all(promises);
      } catch (error) {
        console.error("Failed to preload assets:", error);
      }
      setIsLoading(false);
    };

    preloadAssets();
  }, []);


  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % AGENDA_ITEMS.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + AGENDA_ITEMS.length) % AGENDA_ITEMS.length);
  }, []);

  const jumpToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setIsPanelOpen(false);
  };

  useEffect(() => {
    if (showControllerHint && !isLoading) {
      const timer = setTimeout(() => setShowControllerHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showControllerHint, isLoading]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNextSlide();
      } else if (event.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextSlide, handlePrevSlide]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`relative h-screen w-screen overflow-hidden bg-[#0B1A55] ${isPaused ? 'animations-paused' : ''}`}>
      <header className="golden-header"></header>
      
      <Presentation 
        agendaItem={AGENDA_ITEMS[currentSlideIndex]} 
        slideIndex={currentSlideIndex}
      />

      <div 
        className="group absolute bottom-0 right-0 h-24 w-24 z-30"
        onMouseEnter={() => setShowControllerHint(false)}
      >
        {showControllerHint && (
          <div className="absolute bottom-20 right-20 bg-gray-800 bg-opacity-70 text-white text-sm px-3 py-1 rounded-md animate-pulse">
            Hover here for controls
          </div>
        )}
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute bottom-4 right-4 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Open controls"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <ControlPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onNext={handleNextSlide}
        onPrev={handlePrevSlide}
        onJump={jumpToSlide}
        isPaused={isPaused}
        togglePause={() => setIsPaused(!isPaused)}
        agendaItems={AGENDA_ITEMS}
        currentIndex={currentSlideIndex}
      />
      
      <footer className="golden-footer">
        <div className="marquee">
          <span className="marquee-text">PASSING OUT CEREMONY - LEAD COLLEGE (AUTONOMOUS) - MBA 2023 BATCH</span>
        </div>
        <div className="marquee" aria-hidden="true">
          <span className="marquee-text">PASSING OUT CEREMONY - LEAD COLLEGE (AUTONOMOUS) - MBA 2023 BATCH</span>
        </div>
      </footer>
    </div>
  );
};

export default App;