import { NavLink } from "react-router-dom"

export default function DSABtn({ isMinimized }) {
    return (<NavLink to="/DSA" title="DSA" className={({ isActive }) => `flex flex-row items-center w-full py-3 rounded-xl transition-all group ${isActive ? 'bg-[#222] text-white' : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'} ${isMinimized ? 'pl-[22px] pr-0' : 'pl-4 pr-4'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 12 12 17 22 12"></polyline>
            <polyline points="2 17 12 22 22 17"></polyline>
        </svg>
        <span className={`transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap overflow-hidden ${isMinimized ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>DSA</span>
    </NavLink>)
}