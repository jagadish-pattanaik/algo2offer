import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cardInfo } from '../../Data/data';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export default function DSA() {
  const { user, setUser } = useAuth();
  const [trackedTier, setTrackedTier] = useState('basic');
  const [isUpdating, setIsUpdating] = useState(null);

  useEffect(() => {
    if (user?.selectedTier) {
      setTrackedTier(user.selectedTier);
    }
  }, [user?.selectedTier]);

  const handleTrackTier = async (path) => {
    if (!user) return;
    setIsUpdating(path);
    try {
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, { selectedTier: path }, { merge: true });
      
      setUser((prev) => ({
        ...prev,
        selectedTier: path
      }));
      setTrackedTier(path);
    } catch (error) {
      console.error('Error setting tracked tier:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out max-w-[1200px] mx-auto p-4 md:p-6 mb-20 md:pt-12 w-full h-full text-white">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-xl flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tighter">
            Data Structures & Algorithms
          </h1>
          <p className="text-[#888] text-sm leading-relaxed font-medium mb-6">
            Embark on a structured journey through DSA. From basic coding paradigms up to advanced graph theory and competitive level problems, choose a track that fits your career goals and start solving.
          </p>
        </div>
      </div>

      {/* Grid Layout of Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 md:gap-6 mt-2">
        {cardInfo.map((card) => {
          const isCurrentlyTracked = trackedTier === card.path;
          const isThisUpdating = isUpdating === card.path;

          return (
            <div
              key={card.path}
              className="flex flex-col justify-between rounded-xl bg-[#141414] border border-[#262626] p-4 h-full relative"
            >
              {/* Top content: Indicator + Title + Description */}
              <div className="flex items-stretch gap-2.5 mt-1 mb-2">
                <div
                  className="w-1 rounded-full shrink-0"
                  style={{ backgroundColor: card.bgColor }}
                />
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
                    {card.subtitle}
                  </span>
                  <h3 className="text-xs font-bold text-white leading-snug mt-0.5">
                    {card.title}
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Divider line */}
              <div className="border-t border-[#262626] my-2.5" />

              {/* Bottom row: Action Buttons */}
              <div className="flex gap-2 w-full mt-auto">
                {/* Track Button */}
                {isCurrentlyTracked ? (
                  <button
                    disabled
                    className="text-[10px] font-bold text-[#48D2A0] bg-[#48D2A0]/5 border border-[#48D2A0]/20 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 flex-1 cursor-default"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Tracking
                  </button>
                ) : (
                  <button
                    onClick={() => handleTrackTier(card.path)}
                    disabled={isUpdating !== null}
                    className="text-[10px] font-bold text-neutral-400 bg-[#1a1c1d] border border-[#2a2a2a] hover:text-white hover:border-[#48D2A0] px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 flex-1 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isThisUpdating ? 'Saving...' : 'Track'}
                  </button>
                )}

                {/* Explore Button */}
                <Link
                  to={card.path || '#'}
                  className="text-[10px] font-bold text-white bg-[#2a2a2a] hover:bg-white hover:text-black px-3 py-1.5 rounded-lg transition-all duration-200 border border-[#3a3a3a] flex items-center justify-center gap-1 active:scale-95 flex-1 text-center no-underline group"
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}