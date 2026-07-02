import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function LogOutBtn({ isMinimized }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  
  const handleLogout = async () => {
    await logout();
    navigate('/'); 
  };

  return (
    <div className={`relative flex-shrink-0 w-full transition-all duration-300 ${isMinimized ? 'px-0' : 'px-2'}`}>
      <button
        onClick={handleLogout} 
        title="Logout"
        className={`flex flex-row items-center w-full py-3 rounded-xl transition-all group text-[#888] hover:bg-[#1a1a1a] hover:text-white ${isMinimized ? 'pl-[22px] pr-0' : 'pl-4 pr-4'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span className={`transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap overflow-hidden ${isMinimized ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>
          Logout
        </span>
      </button>
    </div>
  );
}