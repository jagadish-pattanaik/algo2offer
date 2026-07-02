import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading = false, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          // Increment naturally
          return prev + Math.floor(Math.random() * 8) + 4;
        } else if (!isLoading) {
          // If auth loaded, jump to 100%
          return 100;
        } else {
          // Wait at 95% until auth loads
          return prev < 95 ? prev + 1 : 95;
        }
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading]);

  // If isLoading becomes false, speed up progress to 100%
  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400); // Short delay to let user see the completed bar
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0E0E0E] flex flex-col items-center justify-center z-[9999] [animation:ls-fadeIn_0.25s_ease-out] font-sans select-none">
      <style>{`
        @keyframes ls-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ls-pulse {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50%      { transform: scale(1.15); opacity: 0.05; }
        }
      `}</style>

      {/* Pulsing ambient background glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none [background:radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] [animation:ls-pulse_3s_ease-in-out_infinite]" />

      {/* Main Center Content */}
      <div className="flex flex-col items-center z-10">
        {/* Sleek Logo */}
        <div className="w-16 h-16 rounded-full border-[6px] border-white bg-transparent shadow-[0_0_24px_rgba(255,255,255,0.6)] mb-6 transition-transform duration-500 hover:scale-105" />

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-wider text-white mb-2 font-sans">
          Algo2Offer
        </h1>

        {/* Subtitle */}
        <p className="text-xs text-neutral-500 font-mono tracking-[0.2em] uppercase">
          PRACTICE | GET BETTER | GET BETTER OFFERS
        </p>

        {/* Progress Percent */}
        <div className="mt-8 text-sm font-semibold text-neutral-400 font-mono tracking-wide">
          {progress}%
        </div>
      </div>

      {/* Progress Bar at the very bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[6px] bg-neutral-950 overflow-hidden z-20">
        <div
          className="h-full bg-white transition-all duration-200 ease-out shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
