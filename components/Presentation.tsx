import React from 'react';
import type { AgendaItem } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { BackgroundEffects } from './BackgroundEffects';

interface PresentationProps {
  agendaItem: AgendaItem;
  slideIndex: number;
}

export const Presentation: React.FC<PresentationProps> = ({ agendaItem, slideIndex }) => {
  return (
    <main className="h-full w-full relative">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#0B1A55] via-[#102068] to-[#0B1A55] bg-[length:200%_200%]"
        style={{ animation: 'slow-pan 15s ease infinite' }}
      />
      <BackgroundEffects />
      <div className="relative z-10 h-full w-full">
         <SlideRenderer key={slideIndex} agendaItem={agendaItem} />
      </div>
    </main>
  );
};