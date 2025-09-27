import React, { useMemo } from 'react';

const GraduationCapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 11.5V17.5L12 21L5 17.5V11.5" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 9L19 11.5" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GlowingOrbs: React.FC = () => {
    const orbs = useMemo(() => {
        return Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 100 + 50}px`,
            animationDuration: `${Math.random() * 20 + 15}s`,
            animationDelay: `${Math.random() * 10}s`,
        }));
    }, []);

    return (
        <>
            {orbs.map(orb => (
                <div
                    key={orb.id}
                    className="absolute rounded-full bg-yellow-400/50"
                    style={{
                        top: orb.top,
                        left: orb.left,
                        width: orb.size,
                        height: orb.size,
                        filter: 'blur(40px)',
                        animation: `orb-float ${orb.animationDuration} ${orb.animationDelay} ease-in-out infinite`,
                    }}
                />
            ))}
        </>
    )
}

export const BackgroundEffects: React.FC = () => {
  const caps = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 15}s`,
      size: `${Math.random() * 30 + 15}px`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <GlowingOrbs />
      {caps.map(cap => (
        <div
          key={cap.id}
          className="absolute text-yellow-400/30"
          style={{
            left: cap.left,
            width: cap.size,
            height: cap.size,
            animation: `fall ${cap.animationDuration} ${cap.animationDelay} linear infinite`,
          }}
        >
          <GraduationCapIcon />
        </div>
      ))}
    </div>
  );
};