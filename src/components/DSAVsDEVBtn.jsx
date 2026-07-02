import { NavLink } from "react-router-dom"

export default function DSAVsDEVBtn({ isMinimized }) {
    return (<NavLink to="/dsaVsDev" title="DSA vs DEV" className={({ isActive }) => `flex flex-row items-center w-full py-3 rounded-xl transition-all group ${isActive ? 'bg-[#222] border border-[#333] text-white' : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'} ${isMinimized ? 'pl-[22px] pr-0' : 'pl-4 pr-4'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m7 15 3-3-3-3" />
            <path d="M13 15h4" />
        </svg>
        <span className={`transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap overflow-hidden ${isMinimized ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>DSA vs DEV</span>
    </NavLink>)
}
