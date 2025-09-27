import React, { useEffect, useRef } from 'react';
import type { AgendaItem } from '../types';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJump: (index: number) => void;
  isPaused: boolean;
  togglePause: () => void;
  agendaItems: AgendaItem[];
  currentIndex: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isOpen,
  onClose,
  onNext,
  onPrev,
  onJump,
  isPaused,
  togglePause,
  agendaItems,
  currentIndex,
}) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-96 bg-white/5 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-yellow-400">Controls</h2>
            <button onClick={onClose} className="p-2 text-white hover:text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center justify-around my-4">
            <ControlButton onClick={onPrev} label="Previous">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </ControlButton>
            <ControlButton onClick={togglePause} label={isPaused ? 'Play' : 'Pause'}>
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
            </ControlButton>
            <ControlButton onClick={onNext} label="Next">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </ControlButton>
          </div>

          <div className="flex-grow overflow-y-auto mt-4 pr-2">
            <p className="text-yellow-400 font-semibold mb-2">Agenda</p>
            <ul>
              {agendaItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => onJump(index)}
                    className={`w-full text-left p-2 rounded-md text-sm transition-colors duration-200 ${
                      currentIndex === index ? 'bg-yellow-400/20 text-yellow-300' : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-bold">{item.id}.</span> {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

interface ControlButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    label: string;
}
const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, label }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="h-14 w-14 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-yellow-400/20 hover:text-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
        {children}
    </button>
);