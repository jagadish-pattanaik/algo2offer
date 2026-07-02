import React from 'react';

export default function CardCSFund({ topic }) {
  
  const getResourceIconAndTitle = (link) => {
    // 1. YouTube Redirection
    if (link.type === 'video') {
      return {
        title: link.label || 'One Shot Video',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#FF0000] hover:scale-115 active:scale-95 transition-transform duration-200 shrink-0"
            fill="currentColor"
          >
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )
      };
    }

    // 2. InterviewBit Redirection
    if (link.type === 'question') {
      return {
        title: link.label || 'Interview Questions',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 65 35"
            className="w-5 h-5 hover:scale-115 active:scale-95 transition-transform duration-200 shrink-0 cursor-pointer"
          >
            <path id="Path_15262" data-name="Path 15262" d="M232.889,475.458l-5.638,5.651-5.651-5.651,5.651-5.648Z" transform="translate(-198.488 -469.31)" fill="#61dde1"/>
            <path id="Path_15263" data-name="Path 15263" d="M225.65,480.038l-6.16-6.15,6.16-6.148,6.148,6.148Zm-5.163-6.15,5.163,5.153,5.151-5.153-5.151-5.151Z" transform="translate(-196.888 -467.74)" fill="#606060"/>
            <path id="Path_15264" data-name="Path 15264" d="M209.463,498.851,203.8,504.5l-5.651-5.651L203.8,493.2Z" transform="translate(-180.701 -487.052)" fill="#fff"/>
            <path id="Path_15265" data-name="Path 15265" d="M202.238,503.436l-6.148-6.148,6.148-6.148,6.146,6.148Zm-5.151-6.148,5.151,5.153,5.153-5.153-5.153-5.151Z" transform="translate(-179.138 -485.49)" fill="#606060"/>
            <rect id="Rectangle_3321" data-name="Rectangle 3321" width="7.99" height="7.99" transform="translate(11.801 17.449) rotate(-45)" fill="#ffb94d"/>
            <path id="Path_15266" data-name="Path 15266" d="M178.838,526.836l-6.148-6.148,6.148-6.148,6.15,6.148Zm-5.151-6.148,5.151,5.151,5.153-5.151-5.153-5.151Z" transform="translate(-161.388 -503.238)" fill="#606060"/>
            <rect id="Rectangle_3322" data-name="Rectangle 3322" width="7.99" height="7.99" transform="translate(6.149 23.1) rotate(-45)" fill="#fff"/>
            <path id="Path_15267" data-name="Path 15267" d="M155.44,550.236l-6.15-6.148,6.15-6.148,6.148,6.148Zm-5.153-6.148,5.153,5.151,5.151-5.151-5.151-5.153Z" transform="translate(-143.638 -520.988)" fill="#606060"/>
            <rect id="Rectangle_3323" data-name="Rectangle 3323" width="7.99" height="7.99" transform="translate(28.749 11.801) rotate(-45)" fill="#fff"/>
            <path id="Path_15268" data-name="Path 15268" d="M249.038,503.436l-6.148-6.148,6.148-6.148,6.148,6.148Zm-5.156-6.148,5.153,5.153,5.151-5.153-5.151-5.151Z" transform="translate(-214.636 -485.49)" fill="#606060"/>
            <rect id="Rectangle_3324" data-name="Rectangle 3324" width="7.99" height="7.99" transform="translate(23.102 17.451) rotate(-45)" fill="#ffb94d"/>
            <path id="Path_15269" data-name="Path 15269" d="M225.65,526.836l-6.16-6.148,6.16-6.148,6.136,6.148Zm-5.163-6.148,5.163,5.151,5.139-5.151-5.139-5.151Z" transform="translate(-196.888 -503.238)" fill="#606060"/>
            <rect id="Rectangle_3325" data-name="Rectangle 3325" width="7.99" height="7.99" transform="translate(17.452 23.1) rotate(-45)" fill="#fff"/>
            <path id="Path_15270" data-name="Path 15270" d="M202.238,550.236l-6.148-6.148,6.148-6.148,6.146,6.148Zm-5.151-6.148,5.151,5.151,5.153-5.151-5.153-5.153Z" transform="translate(-179.138 -520.988)" fill="#606060"/>
            <rect id="Rectangle_3326" data-name="Rectangle 3326" width="7.99" height="7.99" transform="translate(34.401 17.451) rotate(-45)" fill="#ffb94d"/>
            <path id="Path_15271" data-name="Path 15271" d="M272.43,526.836l-6.15-6.148,6.15-6.148,6.148,6.148Zm-5.153-6.148,5.153,5.151,5.151-5.151-5.151-5.151Z" transform="translate(-232.378 -503.238)" fill="#606060"/>
            <rect id="Rectangle_3327" data-name="Rectangle 3327" width="7.99" height="7.99" transform="translate(28.749 23.1) rotate(-45)" fill="#fff"/>
            <path id="Path_15272" data-name="Path 15272" d="M249.038,550.236l-6.148-6.148,6.148-6.148,6.148,6.148Zm-5.156-6.148,5.153,5.151,5.151-5.151-5.151-5.153Z" transform="translate(-214.636 -520.988)" fill="#606060"/>
            <rect id="Rectangle_3328" data-name="Rectangle 3328" width="7.99" height="7.99" transform="translate(40.049 23.1) rotate(-45)" fill="#fff"/>
            <path id="Path_15273" data-name="Path 15273" d="M295.828,550.236l-6.148-6.148,6.148-6.148,6.15,6.148Zm-5.151-6.148,5.151,5.151,5.153-5.151-5.153-5.153Z" transform="translate(-250.128 -520.988)" fill="#606060"/>
            <path id="Path_15274" data-name="Path 15274" d="M326.441,569.051l-5.65,5.648-5.651-5.648,5.651-5.651Z" transform="translate(-269.441 -540.301)" fill="#61dde1"/>
            <path id="Path_15275" data-name="Path 15275" d="M319.228,573.628l-6.148-6.148,6.148-6.15,6.148,6.15Zm-5.151-6.148,5.151,5.151,5.153-5.151-5.153-5.153Z" transform="translate(-267.878 -538.73)" fill="#606060"/>
            <rect id="Rectangle_3329" data-name="Rectangle 3329" width="7.99" height="7.99" transform="translate(34.399 28.748) rotate(-45)" fill="#61dde1"/>
            <path id="Path_15276" data-name="Path 15276" d="M272.43,573.628l-6.15-6.148,6.15-6.15,6.148,6.15Zm-5.153-6.148,5.153,5.151,5.151-5.151-5.151-5.153Z" transform="translate(-232.378 -538.73)" fill="#606060"/>
            <rect id="Rectangle_3330" data-name="Rectangle 3330" width="7.99" height="7.99" transform="translate(23.1 28.748) rotate(-45)" fill="#61dde1"/>
            <path id="Path_15277" data-name="Path 15277" d="M225.65,573.628l-6.16-6.148,6.16-6.15,6.148,6.15Zm-5.163-6.148,5.163,5.151,5.151-5.151-5.151-5.153Z" transform="translate(-196.888 -538.73)" fill="#606060"/>
            <rect id="Rectangle_3331" data-name="Rectangle 3331" width="7.99" height="7.99" transform="translate(11.801 28.748) rotate(-45)" fill="#61dde1"/>
            <path id="Path_15278" data-name="Path 15278" d="M178.838,573.628l-6.148-6.148,6.148-6.15,6.15,6.15Zm-5.151-6.148,5.151,5.151,5.153-5.151-5.153-5.153Z" transform="translate(-161.388 -538.73)" fill="#606060"/>
            <rect id="Rectangle_3332" data-name="Rectangle 3332" width="7.99" height="7.99" transform="translate(0.499 28.748) rotate(-45)" fill="#61dde1"/>
            <path id="Path_15279" data-name="Path 15279" d="M132.04,573.628l-6.15-6.148,6.15-6.15,6.148,6.15Zm-5.158-6.148,5.153,5.151,5.151-5.151-5.151-5.153Z" transform="translate(-125.89 -538.73)" fill="#606060"/>
          </svg>
        )
      };
    }

    // 3. Playlist vs Cheat Sheet Redirection
    if (link.type === 'document') {
      if (link.label.toLowerCase().includes('playlist')) {
        return {
          title: link.label || 'Playlist',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#3B82F6] hover:scale-115 active:scale-95 transition-transform duration-200 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="12" x2="9" y2="12" />
              <line x1="21" y1="18" x2="9" y2="18" />
              <polygon points="3 10 3 20 8 15" fill="currentColor" />
            </svg>
          )
        };
      }

      // Default Document/Cheat Sheet
      return {
        title: link.label || 'Cheat Sheet',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-neutral-400 hover:text-white hover:scale-115 active:scale-95 transition-transform duration-200 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        )
      };
    }

    return {
      title: link.label,
      icon: null
    };
  };

  return (
    <div className="flex flex-col justify-between rounded-xl bg-[#141414] border border-[#262626] p-4 h-full relative">
      
      {/* Top Content: Indicator + Titles + Description */}
      <div className="flex items-stretch gap-2.5 mt-1 mb-2">
        {/* Left vertical color indicator bar */}
        <div
          className="w-1 rounded-full shrink-0"
          style={{ backgroundColor: topic.bgColor }}
        />
        <div className="flex flex-col">
          <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
            CS Core
          </span>
          <h3 className="text-xs font-bold text-white leading-snug mt-0.5">
            {topic.title}
          </h3>
          <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed line-clamp-3">
            {topic.desc}
          </p>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t border-[#262626] my-2.5" />

      {/* Resources and Icon Links */}
      <div className="flex items-center justify-between mt-1 px-1">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider shrink-0">
          Resources
        </span>
        <div className="flex gap-3.5 items-center">
          {topic.links.map((link, idx) => {
            const resource = getResourceIconAndTitle(link);
            if (!resource.icon) return null;

            return (
              <a
                key={idx}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                title={resource.title}
                className="flex items-center justify-center"
              >
                {resource.icon}
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
}