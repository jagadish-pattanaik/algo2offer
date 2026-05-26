import React from 'react';

export default function Spinner({ size = 48 }) {
  const radius = size / 2;
  const dotSize = Math.max(5, Math.round(size * 0.11));
  const dotOffset = -(dotSize / 2);

  return (
    <>
      <style>{`
        @keyframes sp-orbit {
          from { transform: rotate(0deg) translateX(${radius}px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(${radius}px) rotate(-360deg); }
        }
        @keyframes sp-glow {
          0%, 100% { box-shadow: 0 0 14px rgba(255,255,255,0.2), 0 0 28px rgba(255,255,255,0.06); }
          50%       { box-shadow: 0 0 22px rgba(255,255,255,0.35), 0 0 44px rgba(255,255,255,0.1); }
        }
      `}</style>

      <div
        className="relative flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute top-1/2 left-1/2 rounded-full bg-white/95 origin-center [box-shadow:0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            width: dotSize,
            height: dotSize,
            marginTop: dotOffset,
            marginLeft: dotOffset,
            animation: 'sp-orbit 2.2s linear infinite',
          }}
        />
        <div className="w-full h-full rounded-full border-[2.5px] border-white bg-transparent [animation:sp-glow_2.5s_ease-in-out_infinite]" />
      </div>
    </>
  );
}
