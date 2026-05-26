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
        style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      >
        {/* Orbiting dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: dotSize,
            height: dotSize,
            marginTop: dotOffset,
            marginLeft: dotOffset,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 0 8px rgba(255,255,255,0.8)',
            animation: `sp-orbit 2.2s linear infinite`,
            transformOrigin: 'center center',
          }}
        />
        {/* Circle */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2.5px solid white',
            backgroundColor: 'transparent',
            animation: 'sp-glow 2.5s ease-in-out infinite',
          }}
        />
      </div>
    </>
  );
}
