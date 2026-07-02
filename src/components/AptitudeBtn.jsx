import { NavLink } from "react-router-dom"

export default function AptitudeBtn({ isMinimized }) {
    return (<NavLink to="/aptitude" title="Aptitude" className={({ isActive }) => `flex flex-row items-center w-full py-3 rounded-xl transition-all group ${isActive ? 'bg-[#222]  text-white' : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'} ${isMinimized ? 'pl-[22px] pr-0' : 'pl-4 pr-4'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <span className={`transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap overflow-hidden ${isMinimized ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>Aptitude</span>
    </NavLink>)
}
