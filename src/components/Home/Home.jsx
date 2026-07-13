import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useActivityMap } from "../Hooks/useActivityMap";
import { AllTierData } from "../../Data/index";
import SEO from "../SEO";


// --- Icons ---
const Icons = {
    linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
    github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
    leetcode: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></svg>,
    codeforces: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-7.5c0-.828.672-1.5 1.5-1.5h3z" /></svg>,
    vjudge: <img src="https://vjudge.net/static/bundle/11b24ab2156955d8f3fa.ico" alt="Vjudge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    whatsapp: <svg viewBox="3.5 3.5 17 17" fill="none"><path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="currentColor"/></svg>
};

const SocialLink = ({ name, url, icon }) => {
    let displayValue = url || `Add ${name}`;

    if (!url) {
        return (
            <div className="flex items-center gap-3 py-2 px-3 rounded-lg text-neutral-600 cursor-not-allowed">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</div>
                <span className="text-sm font-medium truncate">{displayValue}</span>
            </div>
        );
    }

    let finalUrl = url;
    let displayText = url;

    if (url && !url.startsWith('http')) {
        displayText = url;
        if (name === 'Vjudge') finalUrl = `https://vjudge.net/user/${url}`;
        else if (name === 'LeetCode') finalUrl = `https://leetcode.com/u/${url}`;
        else if (name === 'Codeforces') finalUrl = `https://codeforces.com/profile/${url}`;
        else if (name === 'GitHub') finalUrl = `https://github.com/${url}`;
        else if (name === 'LinkedIn') finalUrl = `https://linkedin.com/in/${url}`;
        else finalUrl = `https://${url}`;
    } else if (url && url.startsWith('http')) {
        try {
            const urlObj = new URL(url);
            let pathParts = urlObj.pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
                displayText = pathParts[pathParts.length - 1];
            } else {
                displayText = name;
            }
        } catch (e) {
            displayText = url;
        }
    }

    return (
        <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-[#222] transition-all group">
            <div className="w-5 h-5 flex items-center justify-center text-neutral-500 group-hover:text-white transition-colors shrink-0">{icon}</div>
            <span className="text-sm font-medium truncate">{displayText}</span>
        </a>
    );
};

const CircularProgress = ({ percentage, size = 120, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#222"
                    strokeWidth={strokeWidth}
                />
                
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#48D2A0" />
                        <stop offset="100%" stopColor="#508EFF" />
                    </linearGradient>
                </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white tracking-tight leading-none">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

// --- Tier config for dropdown labels ---
const tierConfig = [
    { key: 'basic', label: 'Basics - Beginner' },
    { key: 'tier5', label: 'Tier 5 - 3-6 LPA' },
    { key: 'tier4', label: 'Tier 4 - 6-9 LPA' },
    { key: 'tier3', label: 'Tier 3 - 9-12 LPA' },
    { key: 'tier2', label: 'Tier 2 - 12-18 LPA' },
    { key: 'tier1', label: 'Tier 1 - FAANG+' },
    { key: 'master', label: 'Master Set' },
];

export default function Home() {
    const { user, setUser } = useAuth();
    const [TotalSolved, setTotalSolved] = useState(0);
    const { activityMap, currentStreak, highestStreak } = useActivityMap(user);
    const [selectedYear, setSelectedYear] = useState('last365');

    // Extract available past years for the dropdown (strictly < currentYear)
    const yearsOptions = (() => {
        const yearsSet = new Set();
        const currentYear = new Date().getFullYear();
        Object.keys(activityMap || {}).forEach(dateStr => {
            const y = new Date(dateStr).getFullYear();
            if (!isNaN(y) && y < currentYear) {
                yearsSet.add(y);
            }
        });
        return Array.from(yearsSet).sort((a, b) => b - a);
    })();
    const [solvedProblems, setSolvedProblems] = useState({});
    const [selectedTier, setSelectedTier] = useState('basic');
    const [showAllSolved, setShowAllSolved] = useState(false);
    const [dailyTarget, setDailyTarget] = useState(0);
    const [editingTarget, setEditingTarget] = useState(false);
    const [tempTarget, setTempTarget] = useState(3);

    // Responsive CircularProgress size
    const [progressSize, setProgressSize] = useState(() => {
        const w = window.innerWidth;
        return w < 640 ? 110 : w < 1024 ? 130 : 160;
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setProgressSize(w < 640 ? 110 : w < 1024 ? 130 : 160);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Profile Edit States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        github: '',
        vjudge: '',
        leetcode: '',
        codeforces: ''
    });
    const [editFormData, setEditFormData] = useState({ ...socialLinks, whatsapp: '' });
    const [skillsStats, setSkillsStats] = useState([]);



    const monthsInfo = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    useEffect(() => {
        const fetchTotalSolved = async () => {
            if (!user) return;

            try {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const sp = data.solvedProblems || {};
                    setSolvedProblems(sp);

                    const total = Object.values(sp).filter(Boolean).length;
                    setTotalSolved(total);

                    // Load daily target from Firestore
                    if (data.dailyTarget !== undefined) {
                        setDailyTarget(data.dailyTarget);
                        setTempTarget(data.dailyTarget || 3);
                    }

                    // Load selected tier from Firestore
                    if (data.selectedTier !== undefined) {
                        setSelectedTier(data.selectedTier);
                    }

                    // Load Social Links
                    const loadedLinks = data.socialLinks || {
                        linkedin: '',
                        github: '',
                        vjudge: data.vjudgeId || '',
                        leetcode: '',
                        codeforces: ''
                    };
                    setSocialLinks(loadedLinks);
                    setEditFormData({
                        ...loadedLinks,
                        whatsapp: data.whatsapp || ''
                    });

                    // Calculate Skills Stats
                    const topicCounts = {};
                    Object.values(AllTierData).forEach(tier => {
                        (tier.data || []).forEach(p => {
                            if (!topicCounts[p.topic]) {
                                topicCounts[p.topic] = { total: 0, solved: 0 };
                            }
                            topicCounts[p.topic].total += 1;
                            if (sp[p.id]) {
                                topicCounts[p.topic].solved += 1;
                            }
                        });
                    });

                    const skillsArray = Object.entries(topicCounts)
                        .map(([topic, counts]) => ({
                            topic,
                            total: counts.total,
                            solved: counts.solved
                        }))
                        .filter(skill => skill.solved > 0)
                        .sort((a, b) => b.solved - a.solved);

                    setSkillsStats(skillsArray);

                } else {
                    setTotalSolved(0);
                    setSolvedProblems({});
                    setDailyTarget(0);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTotalSolved();
    }, [user]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSavingProfile(true);
        try {
            const userRef = doc(firestore, "users", user.uid);
            
            const updatedSocialLinks = {
                linkedin: editFormData.linkedin || '',
                github: editFormData.github || '',
                vjudge: editFormData.vjudge || '',
                leetcode: editFormData.leetcode || '',
                codeforces: editFormData.codeforces || ''
            };

            await setDoc(userRef, {
                socialLinks: updatedSocialLinks,
                vjudgeId: editFormData.vjudge || '',
                whatsapp: editFormData.whatsapp || ''
            }, { merge: true });

            setSocialLinks(updatedSocialLinks);

            if (setUser) {
                setUser(prev => ({
                    ...prev,
                    socialLinks: updatedSocialLinks,
                    vjudgeId: editFormData.vjudge || '',
                    whatsapp: editFormData.whatsapp || ''
                }));
            }

            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error saving profile", error);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleEditFormChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const tierData = AllTierData[selectedTier]?.data || [];

    const difficultyStats = ['Easy', 'Medium', 'Hard'].map(diff => {
        const total = tierData.filter(p => p.difficulty === diff).length;
        const solved = tierData.filter(p => p.difficulty === diff && !!solvedProblems[p.id]).length;
        const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);
        return { label: diff, total, solved, percentage };
    });

    const totalInTier = tierData.length;
    const solvedInTier = tierData.filter(p => !!solvedProblems[p.id]).length;
    const overallPercentage = totalInTier === 0 ? 0 : Math.round((solvedInTier / totalInTier) * 100);

    const todayStr = new Date().toDateString();
    const rawTodaySolved = Object.values(solvedProblems)
        .filter(val => val && val.solved && val.date && new Date(val.date).toDateString() === todayStr)
        .length;
    const todaySolved = dailyTarget > 0 ? Math.min(rawTodaySolved, dailyTarget) : rawTodaySolved;

    const timeAgo = (dateStr) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diffMs = now - date;
        const minutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMs / 3600000);
        const days = Math.floor(diffMs / 86400000);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return '1 day ago';
        if (days < 7) return `${days} days ago`;
        if (weeks === 1) return '1 week ago';
        if (weeks < 5) return `${weeks} weeks ago`;
        if (months === 1) return '1 month ago';
        return `${months} months ago`;
    };

    const problemLookup = {};
    Object.values(AllTierData).forEach(tier => {
        (tier.data || []).forEach(p => {
            problemLookup[p.id] = p;
        });
    });

    const recentlySolved = Object.entries(solvedProblems)
        .filter(([, val]) => val && val.solved && val.date)
        .map(([id, val]) => {
            const prob = problemLookup[id];
            if (!prob) return null;
            return {
                id,
                title: prob.title,
                topic: prob.topic,
                difficulty: prob.difficulty,
                link: prob.link,
                date: val.date,
                timeAgo: timeAgo(val.date),
            };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const displayedSolved = showAllSolved ? recentlySolved : recentlySolved.slice(0, 4);

    const diffColors = {
        'Easy': { color: '#48D2A0', bg: 'rgba(72,210,160,0.08)', border: 'rgba(72,210,160,0.2)' },
        'Medium': { color: '#F6B846', bg: 'rgba(246,184,70,0.08)', border: 'rgba(246,184,70,0.2)' },
        'Hard': { color: '#FF716C', bg: 'rgba(255,113,108,0.08)', border: 'rgba(255,113,108,0.2)' },
    };

    return (
        <>
            <SEO 
                title="Home" 
                noindex={true} 
            />
            <div className="w-full flex flex-col-reverse xl:flex-row gap-4 sm:gap-6 text-neutral-200 min-h-full pb-8 px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">


            {/* --- LEFT MAIN AREA --- */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0">

                {/* Top Row: Progress & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Progress Tracker */}
                    <div className="bg-[#141414] rounded-xl border border-[#262626] p-4 flex flex-col gap-4 shadow-sm w-full">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-sm font-semibold text-white">Progress Tracker</h2>
                                <span className="text-[11px] text-neutral-500 font-mono mt-0.5">{solvedInTier} / {totalInTier} solved</span>
                            </div>

                            <div className="relative">
                                <select
                                    value={selectedTier}
                                    onChange={(e) => setSelectedTier(e.target.value)}
                                    className="bg-[#111] border border-[#333] hover:border-[#444] text-neutral-200 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-neutral-500 transition-all appearance-none cursor-pointer pr-7"
                                >
                                    {tierConfig.map(t => (
                                        <option key={t.key} value={t.key}>{t.label.split(' - ')[0]}</option>
                                    ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 sm:gap-6 mt-1">
                            <div className="flex-shrink-0 ml-1 sm:ml-2">
                                <CircularProgress percentage={overallPercentage} size={progressSize} strokeWidth={6} />
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                                {difficultyStats.map((diff, i) => {
                                    const colors = diffColors[diff.label];
                                    return (
                                        <div key={i} className="w-full flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.color, boxShadow: `0 0 4px ${colors.color}66` }}></div>
                                                <span className="text-xs font-semibold" style={{ color: colors.color }}>{diff.label}</span>
                                            </div>
                                            <div className="flex items-center gap-3 w-auto justify-end">
                                                <span className="text-[11px] font-mono font-medium text-right w-8" style={{ color: colors.color }}>{diff.solved}/{diff.total}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            { label: 'Total Solved', value: TotalSolved },
                            { label: 'Current Streak', value: currentStreak, sub: 'days' },
                            { label: 'Highest Streak', value: highestStreak, sub: 'days' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#141414] border border-[#262626] rounded-xl p-5 flex flex-col justify-between shadow-sm">
                                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{stat.label}</span>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-3xl font-semibold text-white tracking-tight">{stat.value}</span>
                                    <span className="text-xs text-neutral-500 font-medium">{stat.sub}</span>
                                </div>
                            </div>
                        ))}

                        {/* Daily Target Card */}
                        <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 flex flex-col justify-between shadow-sm relative">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Daily Target</span>
                                {!editingTarget && (
                                    <button
                                        onClick={() => { setTempTarget(dailyTarget || 3); setEditingTarget(true); }}
                                        className="text-neutral-500 hover:text-white transition-colors p-1 rounded hover:bg-[#262626]"
                                        title="Edit target"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {editingTarget ? (
                                <div className="mt-3 flex flex-col gap-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => setTempTarget(prev => Math.max(1, prev - 1))}
                                            className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] hover:border-[#555] text-neutral-300 hover:text-white flex items-center justify-center transition-all text-lg font-medium"
                                        >−</button>
                                        <span className="text-2xl font-bold text-white w-10 text-center tabular-nums">{tempTarget}</span>
                                        <button
                                            onClick={() => setTempTarget(prev => Math.min(50, prev + 1))}
                                            className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] hover:border-[#555] text-neutral-300 hover:text-white flex items-center justify-center transition-all text-lg font-medium"
                                        >+</button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingTarget(false)}
                                            className="flex-1 text-[10px] sm:text-xs font-medium py-1.5 rounded-lg bg-[#222] border border-[#333] text-neutral-400 hover:text-white hover:border-[#444] transition-all"
                                        >Cancel</button>
                                        <button
                                            onClick={async () => {
                                                setDailyTarget(tempTarget);
                                                setEditingTarget(false);
                                                if (user) {
                                                    try {
                                                        await setDoc(doc(firestore, "users", user.uid), { dailyTarget: tempTarget }, { merge: true });
                                                    } catch (e) { console.error("Error saving daily target:", e); }
                                                }
                                            }}
                                            className="flex-1 text-[10px] sm:text-xs font-semibold py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all"
                                        >Save</button>
                                    </div>
                                </div>
                            ) : dailyTarget === 0 ? (
                                <button
                                    onClick={() => { setTempTarget(3); setEditingTarget(true); }}
                                    className="mt-3 text-sm text-neutral-500 hover:text-neutral-300 transition-colors text-left"
                                >
                                    Set your daily target →
                                </button>
                            ) : (
                                <div className="mt-3 flex flex-col gap-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-semibold text-white tracking-tight">{todaySolved}</span>
                                        <span className="text-lg text-neutral-500 font-medium">/ {dailyTarget}</span>
                                    </div>
                                    <span className="text-[11px] font-medium mt-1" style={{ color: todaySolved >= dailyTarget ? '#48D2A0' : '#888' }}>
                                        {todaySolved >= dailyTarget ? 'Target reached!' : `${dailyTarget - todaySolved} more to go`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activity Heatmap */}
                <div className="bg-[#141414] rounded-xl border border-[#262626] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 shadow-sm mt-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">Activity</h2>
                        {yearsOptions.length > 0 && (
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-neutral-400 focus:outline-none focus:text-white cursor-pointer hover:bg-[#262626] px-2 py-1 rounded transition-colors"
                            >
                                <option value="last365">Current</option>
                                {yearsOptions.map(yr => (
                                    <option key={yr} value={yr.toString()}>{yr}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="w-full pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`
                            .w-full.pb-2.overflow-x-auto::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {(() => {
                            const currentDate = new Date();
                            const currentYear = currentDate.getFullYear();
                            const currentMonth = currentDate.getMonth(); // 0-indexed
                            const currentDay = currentDate.getDate(); // 1-indexed

                            let monthsToRender = [];
                            let isLast365 = selectedYear === 'last365';

                            if (isLast365) {
                                // Start date is exactly 364 days ago (365 days including today)
                                const startDate = new Date();
                                startDate.setDate(currentDate.getDate() - 364);
                                startDate.setHours(0, 0, 0, 0);

                                const limitDate = new Date(currentDate);
                                limitDate.setHours(23, 59, 59, 999);

                                // Generate all months that fall in this range
                                let tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                                while (tempDate <= limitDate) {
                                    monthsToRender.push({
                                        monthName: monthsInfo[tempDate.getMonth()],
                                        mIndex: tempDate.getMonth(),
                                        year: tempDate.getFullYear(),
                                        startDayLimit: startDate,
                                        endDayLimit: limitDate
                                    });
                                    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
                                }
                            } else {
                                const yearInt = parseInt(selectedYear);
                                const maxMonthLimit = yearInt === currentYear ? currentMonth : 11;
                                for (let m = 0; m <= maxMonthLimit; m++) {
                                    const limitDate = yearInt === currentYear ? new Date(currentYear, currentMonth, currentDay, 23, 59, 59, 999) : null;
                                    monthsToRender.push({
                                        monthName: monthsInfo[m],
                                        mIndex: m,
                                        year: yearInt,
                                        endDayLimit: limitDate
                                    });
                                }
                            }

                            // Calculate dynamic widths based on the number of months shown
                            const numMonths = monthsToRender.length;
                            const containerStyle = {
                                maxWidth: numMonths < 12 ? `${(numMonths / 12) * 100}%` : '100%',
                                minWidth: numMonths < 12 ? `${Math.round(850 * numMonths / 12)}px` : '850px'
                            };

                            return (
                                <div 
                                    className="flex gap-1.5 sm:gap-2 md:gap-3 justify-between"
                                    style={containerStyle}
                                >
                                    {monthsToRender.map(({ monthName, mIndex, year, startDayLimit, endDayLimit }, i) => {
                                        const daysInMonth = new Date(year, mIndex + 1, 0).getDate();
                                        const firstDayOfWeek = new Date(year, mIndex, 1).getDay();

                                        const weeks = [];
                                        let currentWeek = [];

                                        for (let j = 0; j < firstDayOfWeek; j++) {
                                            currentWeek.push(null);
                                        }

                                        for (let day = 1; day <= daysInMonth; day++) {
                                            const dayDate = new Date(year, mIndex, day);
                                            
                                            let isValid = true;
                                            if (startDayLimit) {
                                                dayDate.setHours(0, 0, 0, 0);
                                                if (dayDate < startDayLimit) isValid = false;
                                            }
                                            if (endDayLimit) {
                                                dayDate.setHours(23, 59, 59, 999);
                                                if (dayDate > endDayLimit) isValid = false;
                                            }

                                            if (isValid) {
                                                currentWeek.push(day);
                                            } else {
                                                currentWeek.push(null);
                                            }

                                            if (currentWeek.length === 7) {
                                                weeks.push(currentWeek);
                                                currentWeek = [];
                                            }
                                        }

                                        if (currentWeek.length > 0) {
                                            while (currentWeek.length < 7) {
                                                currentWeek.push(null);
                                            }
                                            weeks.push(currentWeek);
                                        }

                                        return (
                                            <div key={i} className="flex flex-col gap-1 sm:gap-2" style={{ flex: weeks.length }}>
                                                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-neutral-500 overflow-hidden text-ellipsis">{monthName}</span>
                                                <div className="w-full flex gap-[2px] sm:gap-[3px] justify-between">
                                                    {weeks.map((week, wIndex) => (
                                                        <div key={wIndex} className="flex-1 flex flex-col gap-[2px] sm:gap-[3px]">
                                                            {week.map((day, dIndex) => {
                                                                if (day === null) {
                                                                    return <div key={dIndex} className="w-full aspect-square rounded-[1px] md:rounded-[2px] bg-transparent"></div>;
                                                                }

                                                                const date = new Date(year, mIndex, day);
                                                                const key = date.toDateString();
                                                                const count = activityMap[key] || 0;

                                                                let finalIntensity = 0;
                                                                if (count === 0) finalIntensity = 0;
                                                                else if (count === 1) finalIntensity = 1;
                                                                else if (count === 2) finalIntensity = 2;
                                                                else if (count <= 4) finalIntensity = 3;
                                                                else if (count > 4) finalIntensity = 4;

                                                                const colorClass = [
                                                                    'bg-[#1e1e1e]',
                                                                    'bg-[#0e4429]',
                                                                    'bg-[#006d32]',
                                                                    'bg-[#26a641]',
                                                                    'bg-[#39d353]'
                                                                ][finalIntensity];

                                                                return (
                                                                    <div
                                                                        key={dIndex}
                                                                        className={`w-full aspect-square rounded-[1px] md:rounded-[2px] ${colorClass}`}
                                                                        title={`${count} solved on ${key}`}
                                                                    ></div>
                                                                );
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </div>

                    <div className="flex justify-between items-center mt-1 text-[11px] font-medium text-neutral-500">
                        <div className="flex items-center gap-1.5">
                            <span>Less</span>
                            <div className="w-[11px] h-[11px] rounded-[2px] bg-[#1e1e1e]"></div>
                            <div className="w-[11px] h-[11px] rounded-[2px] bg-[#0e4429]"></div>
                            <div className="w-[11px] h-[11px] rounded-[2px] bg-[#006d32]"></div>
                            <div className="w-[11px] h-[11px] rounded-[2px] bg-[#26a641]"></div>
                            <div className="w-[11px] h-[11px] rounded-[2px] bg-[#39d353]"></div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

                {/* Recently Solved */}
                <div className="bg-[#141414] rounded-xl border border-[#262626] flex flex-col overflow-hidden shadow-sm mt-2">
                    <div className="p-4 sm:p-5 border-b border-[#262626] flex justify-between items-center bg-[#181818]">
                        <h2 className="text-base font-semibold text-white">
                            Recently Solved
                            {recentlySolved.length > 0 && (
                                <span className="text-xs text-neutral-500 font-normal ml-2">({recentlySolved.length})</span>
                            )}
                        </h2>
                        {recentlySolved.length > 4 && (
                            <button
                                onClick={() => setShowAllSolved(prev => !prev)}
                                className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                            >
                                {showAllSolved ? 'Show Less' : 'View All'}
                            </button>
                        )}
                    </div>

                    <div className={`flex flex-col ${showAllSolved ? 'max-h-[420px] overflow-y-auto' : ''}`} style={showAllSolved ? { scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' } : {}}>
                        {displayedSolved.length === 0 ? (
                            <div className="p-8 flex flex-col items-center justify-center gap-2">
                                <svg className="w-10 h-10 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-sm text-neutral-500 font-medium">No problems solved yet</span>
                                <span className="text-xs text-neutral-600">Start solving to see your progress here</span>
                            </div>
                        ) : (
                            displayedSolved.map((item, i) => {
                                const diffStyles = {
                                    "Easy": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                                    "Medium": "text-amber-400 bg-amber-400/10 border-amber-400/20",
                                    "Hard": "text-rose-400 bg-rose-400/10 border-rose-400/20"
                                };
                                return (
                                    <a
                                        key={item.id}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-between p-4 sm:p-5 hover:bg-[#1a1a1a] transition-colors cursor-pointer group ${i !== displayedSolved.length - 1 ? 'border-b border-[#262626]' : ''}`}
                                    >
                                        <div className="flex flex-col gap-1 min-w-0 mr-4">
                                            <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors truncate">{item.title}</span>
                                            <span className="text-xs text-neutral-500 font-mono tracking-tight truncate">{item.topic}</span>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2 py-0.5 text-[11px] font-semibold border rounded ${diffStyles[item.difficulty] || ''}`}>
                                                {item.difficulty}
                                            </span>
                                            <span className="text-xs text-neutral-500 w-20 text-right hidden sm:block">{item.timeAgo}</span>
                                        </div>
                                    </a>
                                )
                            })
                        )}
                    </div>
                </div>

            </div>

            {/* --- RIGHT SIDEBAR AREA --- */}
            <div className="w-full xl:w-[280px] shrink-0 flex flex-col mt-4 xl:mt-0">

                {/* Profile Section */}
                <div className="flex flex-col">
                    <div className="flex items-start gap-3 mb-4 w-full">
                        <div className="w-16 h-16 shrink-0 rounded-2xl border border-[#333] bg-[#222] flex items-center justify-center text-2xl font-medium text-white overflow-hidden shadow-inner">
                            {user?.photoURL ? (<img src={user?.photoURL} alt="profile" className="w-full h-full object-cover" />) : (user?.displayName?.charAt(0).toUpperCase())}
                        </div>
                        <div className="flex flex-col justify-center min-w-0 flex-1 py-0.5">
                            <h2 className="text-base font-bold text-white mb-0.5 truncate">{user?.displayName || 'User'}</h2>
                            {(user?.university || user?.batch) && (
                                <p className="text-xs text-neutral-400 truncate">
                                    {user?.university && <span>{user.university}</span>}
                                    {user?.university && user?.batch && <span> · </span>}
                                    {user?.batch && <span>{user.batch}</span>}
                                </p>
                            )}
                        </div>
                    </div>

                    <button onClick={() => setIsEditModalOpen(true)} className="w-full py-2 bg-[#222] hover:bg-[#2a2a2a] text-white text-sm font-medium rounded-lg transition-colors border border-[#333]">
                        Edit Profile
                    </button>
                </div>

                <hr className="border-[#262626] my-4" />

                {/* Social Links */}
                <div className="flex flex-col gap-0.5">
                    <SocialLink name="LinkedIn" url={socialLinks.linkedin} icon={Icons.linkedin} />
                    <SocialLink name="GitHub" url={socialLinks.github} icon={Icons.github} />
                    <SocialLink name="LeetCode" url={socialLinks.leetcode} icon={Icons.leetcode} />
                    <SocialLink name="Codeforces" url={socialLinks.codeforces} icon={Icons.codeforces} />
                    <SocialLink name="Vjudge" url={socialLinks.vjudge} icon={Icons.vjudge} />
                </div>

                <hr className="border-[#262626] my-4" />

                {/* Skills Section */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">Skills</h3>
                        <span className="text-[10px] text-neutral-500 font-mono">Topics Solved</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skillsStats.map(skill => (
                            <div key={skill.topic} className="flex items-center gap-1.5 bg-[#1e1e1e] border border-[#333] hover:border-[#555] transition-colors px-2.5 py-1.5 rounded-lg cursor-default">
                                <span className="text-[11px] font-medium text-neutral-300">{skill.topic}</span>
                                <span className="text-[10px] bg-[#2a2a2a] text-neutral-400 px-1.5 py-0.5 rounded-md font-mono">{skill.solved}</span>
                            </div>
                        ))}
                        {skillsStats.length === 0 && (
                            <div className="w-full py-4 flex flex-col items-center justify-center text-center gap-1">
                                <span className="text-xs text-neutral-500">No skills to show yet.</span>
                                <span className="text-[10px] text-neutral-600">Solve problems to build your skills profile.</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

        {/* --- EDIT PROFILE OVERLAY MODAL --- */}
        {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#111] border border-[#333] rounded-2xl w-full max-w-[600px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 [animation-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                    <div className="px-6 py-4 border-b border-[#262626] flex justify-between items-center bg-[#141414]">
                        <h2 className="text-lg font-bold text-white">Edit Profile Links</h2>
                        <button onClick={() => setIsEditModalOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSaveProfile} className="p-6 flex flex-col gap-4">
                        <p className="text-xs text-neutral-400 mb-2">Add your usernames or profile details to display or track them on your profile.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
                            {[
                                { name: 'linkedin', label: 'LinkedIn Username / URL', icon: Icons.linkedin, placeholder: 'johndoe' },
                                { name: 'github', label: 'GitHub Username / URL', icon: Icons.github, placeholder: 'johndoe' },
                                { name: 'leetcode', label: 'LeetCode Username', icon: Icons.leetcode, placeholder: 'johndoe' },
                                { name: 'codeforces', label: 'Codeforces Username', icon: Icons.codeforces, placeholder: 'johndoe' },
                                { name: 'vjudge', label: 'Vjudge Username', icon: Icons.vjudge, placeholder: 'johndoe' },
                                { name: 'whatsapp', label: 'WhatsApp Number', icon: Icons.whatsapp, placeholder: '+919876543210' },
                            ].map(field => (
                                <div key={field.name} className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                            <div className="w-4 h-4">{field.icon}</div>
                                        </div>
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={editFormData[field.name]}
                                            onChange={handleEditFormChange}
                                            placeholder={field.placeholder}
                                            className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t border-[#262626]">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-2.5 bg-[#222] hover:bg-[#2a2a2a] border border-[#333] text-white text-sm font-medium rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={isSavingProfile} className="flex-1 py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                                {isSavingProfile ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
    );
}
