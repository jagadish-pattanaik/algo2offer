import React, { useState, useEffect, useRef } from 'react';
import { categoriesData } from '../../Data/Aptitude';
import SEO from '../SEO';


const Aptitude = () => {
  // Scroll states for each category to show/hide scroll arrows
  const [scrollState, setScrollState] = useState({});
  const scrollRefs = useRef({});

  const updateScrollState = (categoryName) => {
    const container = scrollRefs.current[categoryName];
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 5;
      const canScrollRight = scrollLeft + clientWidth < scrollWidth - 5;

      setScrollState((prev) => ({
        ...prev,
        [categoryName]: { canScrollLeft, canScrollRight },
      }));
    }
  };

  useEffect(() => {
    // Initial update of scroll states after rendering
    const timer = setTimeout(() => {
      categoriesData.forEach((cat) => {
        updateScrollState(cat.category);
      });
    }, 100);

    const handleResize = () => {
      categoriesData.forEach((cat) => {
        updateScrollState(cat.category);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollContainer = (categoryName, direction) => {
    const container = scrollRefs.current[categoryName];
    if (container) {
      const scrollAmount = 240; 
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out max-w-[1200px] mx-auto p-4 md:p-6 mb-20 md:pt-12 w-full h-full text-white">
      <SEO 
        title="Aptitude & Reasoning" 
        noindex={true} 
      />

      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-xl flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tighter">
            Aptitude & Reasoning
          </h1>
          <p className="text-[#888] text-sm leading-relaxed font-medium mb-6">
            Aptitude tests are a critical gateway in campus placements and competitive exams. We recommend <strong className="text-neutral-300">IndiaBix</strong> — one of the most trusted platforms for aptitude preparation with thousands of practice questions and detailed solutions across all major topics.
          </p>
        </div>
      </div>

      {/* Categories Sections */}
      <div className="flex flex-col gap-8 mt-2">
        {categoriesData.map((cat) => {
          const canLeft = scrollState[cat.category]?.canScrollLeft;
          const canRight = scrollState[cat.category]?.canScrollRight;

          return (
            <div key={cat.category} className="flex flex-col gap-3">
              
              {/* Category Header with Scroll Buttons */}
              <div className="flex justify-between items-center px-1">
                <h2 className="text-base md:text-lg font-extrabold text-white tracking-tight">
                  {cat.category}
                </h2>
                <div className="flex gap-2">
                  {/* Left Arrow Button: Only visible if canScrollLeft is true */}
                  <button
                    onClick={() => scrollContainer(cat.category, 'left')}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1c1d] border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-all active:scale-90 ${
                      canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label="Scroll left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Right Arrow Button: Only visible if canScrollRight is true */}
                  <button
                    onClick={() => scrollContainer(cat.category, 'right')}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1c1d] border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-all active:scale-90 ${
                      canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label="Scroll right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Horizontal Scrollable Row */}
              <div
                ref={(el) => (scrollRefs.current[cat.category] = el)}
                onScroll={() => updateScrollState(cat.category)}
                className="flex gap-4 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {cat.topics.map((topic) => {
                  return (
                    <div
                      key={topic.title}
                      className="snap-start flex flex-col justify-between rounded-xl bg-[#141414] border border-[#262626] p-4 w-[220px] shrink-0 relative"
                    >
                      {/* Title, Left Indicator and Description */}
                      <div className="flex items-stretch gap-2.5 mt-1 mb-2">
                        <div
                          className="w-1 rounded-full shrink-0"
                          style={{ backgroundColor: topic.color }}
                        />
                        <div className="flex flex-col">
                          <h3 className="text-xs font-bold text-white leading-snug pr-1">
                            {topic.title}
                          </h3>
                          <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                            {topic.desc}
                          </p>
                        </div>
                      </div>

                      {/* Divider line */}
                      <div className="border-t border-[#262626] my-2.5" />

                      {/* Bottom row: Action Button */}
                      <div className="flex justify-end w-full">
                        <a
                          href={topic.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-white bg-[#2a2a2a] hover:bg-white hover:text-black px-3 py-1.5 rounded-lg transition-all duration-200 border border-[#3a3a3a] flex items-center gap-1 active:scale-95 w-full justify-center group"
                        >
                          Practice
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
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Aptitude;
