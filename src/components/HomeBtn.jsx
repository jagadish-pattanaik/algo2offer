import { NavLink } from "react-router-dom"

export default function HomeBtn({ isMinimized }) {
    return (<NavLink to="/Home" title="Home" className={({ isActive }) => `flex flex-row items-center w-full py-3 rounded-xl transition-all group ${isActive ? 'bg-[#222] text-white' : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'} ${isMinimized ? 'pl-[22px] pr-0' : 'pl-4 pr-4'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span className={`transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap overflow-hidden ${isMinimized ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>Home</span>
    </NavLink>)
}