import React from 'react';
import type { AgendaItem } from '../types';

interface SlideRendererProps {
  agendaItem: AgendaItem;
}

const renderContent = (item: AgendaItem) => {
  // Use consistent, reliable animations to prevent runtime errors.
  const textAnim = 'animate-minimal-slide-in';
  const photoAnim = 'animate-float-rise';
  const headerAnim = 'animate-mask-reveal';
  
  switch (item.id) {
    case 1: // Welcome & Registration
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="https://files.catbox.moe/bvw8pn.png" alt="LEAD College Logo" className="w-48 h-48 object-contain mb-8 animate-in animate-drop-in-shadow" />
          <img src="https://files.catbox.moe/46tzb5.png" alt="Passing Out Ceremony" className="w-full max-w-4xl animate-in animate-float-rise" style={{ animation: 'float 6s ease-in-out infinite 1.2s', animationDelay: '0.2s' }} />
          <h2 className={`text-6xl mt-8 font-bold tracking-wider animate-in ${textAnim} golden-text`} style={{ animationDelay: '0.4s' }}>MBA</h2>
        </div>
      );
    
    case 5: case 6: case 7: case 10: // Speaker Slides
      return (
        <div className="w-full h-full flex items-center justify-start overflow-hidden">
            {/* Text content */}
            <div className="pl-12 md:pl-24 z-20 flex-shrink-0">
                <h1 className={`text-6xl lg:text-7xl font-black golden-text font-helvetica max-w-2xl animate-in ${headerAnim} pb-4`}>
                    {item.title}
                </h1>
                <p className={`text-4xl lg:text-5xl mt-4 text-white animate-in ${textAnim}`} style={{ animationDelay: '0.6s' }}>{item.speaker}</p>
                {item.id === 7 && (
                    <p className={`text-xl lg:text-2xl mt-2 text-gray-300 animate-in ${textAnim}`} style={{ animationDelay: '0.8s' }}>
                        Former Vice Chancellor, Anna University
                    </p>
                )}
            </div>
            
            {/* Photo content */}
            <div className="flex-1 h-full flex items-end justify-center">
                <div className={`relative bottom-[-1.5rem] h-[90%] w-auto animate-in ${photoAnim}`}>
                    <img 
                        src={item.photoUrl} 
                        alt={item.speaker} 
                        className={`
                            h-full w-auto object-contain object-bottom
                            drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                            ${item.id === 7 ? 'animate-pulse-glow' : ''}
                        `}
                    />
                </div>
            </div>
        </div>
      );
    
    case 11: // National Anthem
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className={`text-8xl font-black golden-text font-helvetica animate-in ${headerAnim} pb-4`}>
                National Anthem
            </h1>
        </div>
      );

    case 13: // Lunch
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className={`text-8xl font-black golden-text font-helvetica animate-in ${headerAnim} pb-4`} style={{ animationDelay: '0.1s' }}>
                Congratulations!
            </h1>
            <p className={`text-4xl mt-4 text-white animate-in ${textAnim}`} style={{ animationDelay: '0.6s' }}>MBA Batch 2023</p>
        </div>
      );

    default: // Default layout for other events
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className={`text-8xl font-black golden-text font-helvetica max-w-5xl animate-in ${headerAnim} pb-4`}>
            {item.title}
          </h1>
          {item.speaker && <p className={`text-4xl mt-4 text-white animate-in ${textAnim}`} style={{ animationDelay: '0.6s' }}>{item.speaker}</p>}
        </div>
      );
  }
};


export const SlideRenderer: React.FC<SlideRendererProps> = ({ agendaItem }) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 pt-10 pb-10 relative">
      {agendaItem.id !== 1 && (
        <img
          src="https://files.catbox.moe/bvw8pn.png"
          alt="LEAD College Logo"
          className="absolute top-8 right-8 w-24 h-auto z-30 animate-in animate-smooth-fade-in"
        />
      )}
      {renderContent(agendaItem)}
    </div>
  );
};