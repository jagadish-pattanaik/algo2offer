import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0E0E0E] flex flex-col items-center justify-center z-[9999] [animation:ls-fadeIn_0.25s_ease-out] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap');

        @keyframes ls-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ls-orbit {
          from { transform: rotate(0deg) translateX(32px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(32px) rotate(-360deg); }
        }
        @keyframes ls-orbit-sm {
          from { transform: rotate(0deg) translateX(26px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(26px) rotate(-360deg); }
        }
        @keyframes ls-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.12; }
          50%       { transform: scale(1.25); opacity: 0.05; }
        }
        @keyframes ls-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes ls-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.07); }
          50%       { box-shadow: 0 0 32px rgba(255,255,255,0.35), 0 0 64px rgba(255,255,255,0.12); }
        }

        @media (max-width: 480px) {
          .ls-orbit-dot { animation-name: ls-orbit-sm !important; }
        }
      `}</style>
      <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none [background:radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] [animation:ls-pulse_3.5s_ease-in-out_infinite]" />
      <div className="ls-logo-group relative w-[52px] h-[52px] sm:w-16 sm:h-16 mb-7">
        <div
          className="ls-orbit-dot absolute top-1/2 left-1/2 w-[7px] h-[7px] -mt-[3.5px] -ml-[3.5px] rounded-full bg-white/95 [box-shadow:0_0_10px_rgba(255,255,255,0.8)] [animation:ls-orbit_2.2s_linear_infinite]"
        />
        <div className="w-full h-full rounded-full border-[3px] border-white bg-transparent [animation:ls-glow_2.5s_ease-in-out_infinite]" />
      </div>
      <h1
        className="m-0 text-[24px] sm:text-[30px] font-extrabold tracking-tight"
        style={{
          background: 'linear-gradient(90deg, #ffffff 0%, #999 50%, #ffffff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'ls-shimmer 2.8s linear infinite',
        }}
      >
        Algo2Offer
      </h1>
    </div>
  );
}
