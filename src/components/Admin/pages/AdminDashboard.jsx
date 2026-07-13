import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import SEO from '../../SEO';


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    contests: 0,
    blogs: 0,
    admins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersSnap = await getDocs(collection(firestore, 'users'));
        let adminCount = 0;
        usersSnap.forEach(doc => {
          if (doc.data().role === 'admin') adminCount++;
        });

        const contestsSnap = await getDocs(collection(firestore, 'contests'));
        const blogsSnap = await getDocs(collection(firestore, 'blogs'));

        setStats({
          users: usersSnap.size,
          admins: adminCount,
          contests: contestsSnap.size,
          blogs: blogsSnap.size
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.users, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500/30',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> 
    },
    { 
      title: 'Total Admins', 
      value: stats.admins, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'hover:border-purple-500/30',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 
    },
    { 
      title: 'Contests', 
      value: stats.contests, 
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'hover:border-emerald-500/30',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> 
    },
    { 
      title: 'Blogs', 
      value: stats.blogs, 
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'hover:border-rose-500/30',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <SEO 
        title="Admin Dashboard" 
        noindex={true} 
      />

      
      {/* Title block */}
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-neutral-400 text-sm mt-1">High-level overview of the Algo2Offer platform metrics.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div 
            key={idx} 
            className={`glass-card p-6 rounded-2xl border border-[#262626] bg-[#141414]/40 backdrop-blur-md flex flex-col items-start gap-4 transition-all duration-300 ${stat.borderColor}`}
          >
            <span className={`${stat.color} ${stat.bgColor} p-3.5 rounded-xl shrink-0`}>
              {stat.icon}
            </span>
            <div>
              <p className="text-neutral-400 font-semibold text-xs uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3.5xl font-bold text-white mt-2 tracking-tight">
                {loading ? '...' : stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
