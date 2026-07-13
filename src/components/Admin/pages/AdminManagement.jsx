import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { useAuth } from '../../../context/AuthContext';
import SEO from '../../SEO';


export default function AdminManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [actioningUserId, setActioningUserId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotice = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(firestore, 'users'));
      const usersList = [];
      snap.forEach(doc => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotice("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = async (userId, currentRole) => {
    if (userId === currentUser.uid) {
      showNotice("You cannot change your own role!", "error");
      return;
    }
    
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setActioningUserId(userId);
    
    try {
      await updateDoc(doc(firestore, 'users', userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      showNotice(`Successfully updated user to ${newRole.toUpperCase()}`, "success");
    } catch (error) {
      console.error("Error updating role:", error);
      showNotice("Failed to update user role", "error");
    } finally {
      setActioningUserId(null);
    }
  };

  // Stats computation
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter(u => u.role === 'admin').length;
    const regularUsers = total - admins;
    return { total, admins, regularUsers };
  }, [users]);

  // Filter and Sort users
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(u => {
        const name = (u.fullName || u.displayName || u.email || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        const id = (u.id || '').toLowerCase();
        const query = searchQuery.toLowerCase();
        
        const matchesSearch = name.includes(query) || email.includes(query) || id.includes(query);
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;

        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const nameA = (a.fullName || a.displayName || a.email || '').toLowerCase();
        const nameB = (b.fullName || b.displayName || b.email || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }, [users, searchQuery, roleFilter]);

  // Helper for dynamic initial avatar background gradient
  const getAvatarGradient = (user) => {
    const name = user.fullName || user.displayName || user.email || 'U';
    const charCode = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-emerald-400 to-cyan-500',
      'from-purple-500 to-indigo-500',
      'from-amber-400 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-blue-500 to-cyan-500',
      'from-violet-500 to-fuchsia-500'
    ];
    return gradients[charCode % gradients.length];
  };

  // Helper for dynamic user initials
  const getInitials = (user) => {
    const name = user.fullName || user.displayName || '';
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    return user.email ? user.email[0].toUpperCase() : 'U';
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <SEO 
        title="Admin Management" 
        noindex={true} 
      />

      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in-95 ${
          notification.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : notification.type === 'error'
            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            : 'bg-[#181818] border-[#333] text-neutral-300'
        }`}>
          {notification.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          )}
          {notification.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          )}
          <span className="text-sm font-semibold tracking-wide">{notification.msg}</span>
        </div>
      )}

      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin Management</h1>
          <p className="text-neutral-400 text-sm mt-1">Configure and manage user accounts and system permissions.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Accounts', value: stats.total, color: 'text-white' },
          { label: 'Administrators', value: stats.admins, color: 'text-white' },
          { label: 'Standard Users', value: stats.regularUsers, color: 'text-white' }
        ].map((s, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{s.label}</span>
            <div className="mt-4 flex items-center gap-3">
              <span className={`text-3.5xl font-bold ${s.color} tracking-tight`}>{loading ? '...' : s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search box */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts by name, email, or ID..."
            className="w-full bg-[#141414] border border-[#262626] hover:border-[#333] focus:border-neutral-500 text-white rounded-xl py-3 pl-10 pr-10 text-sm font-medium focus:outline-none transition-all placeholder-neutral-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          
          {/* Role Filter Tabs */}
          <div className="bg-[#141414] p-1 rounded-xl border border-[#262626] flex gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'admin', label: 'Admins' },
              { id: 'user', label: 'Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  roleFilter === tab.id
                    ? 'bg-[#222] border border-[#333] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-[24px] overflow-hidden border border-[#262626] bg-[#141414]/40 backdrop-blur-md shadow-sm">
        
        {/* Header - Desktop only */}
        <div className="hidden md:grid md:grid-cols-[2.5fr_2fr_1.2fr_1.5fr] px-6 py-4 border-b border-[#262626] bg-[#181818]/60 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <div>User Account</div>
          <div>Email Address</div>
          <div>System Role</div>
          <div className="text-right">Actions</div>
        </div>

        {/* User Rows */}
        <div className="flex flex-col divide-y divide-[#262626]/60">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin"></div>
              <span className="text-sm text-neutral-500 font-semibold">Loading system accounts...</span>
            </div>
          ) : filteredAndSortedUsers.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
              <svg className="w-10 h-10 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span className="text-sm text-neutral-500 font-semibold">No accounts match your criteria</span>
              <span className="text-xs text-neutral-600">Try adjusting your filters or search query</span>
            </div>
          ) : (
            filteredAndSortedUsers.map(u => (
              <div 
                key={u.id} 
                className="flex flex-col md:grid md:grid-cols-[2.5fr_2fr_1.2fr_1.5fr] items-start md:items-center p-5 md:px-6 md:py-4.5 gap-4 md:gap-0"
              >
                
                {/* User Info with Image/Avatar */}
                <div className="flex items-center gap-4 w-full min-w-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${getAvatarGradient(u)} flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0 uppercase`}>
                    {getInitials(u)}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">
                        {u.fullName || u.displayName || (u.email ? u.email.split('@')[0] : 'No Name')}
                      </span>
                      {u.id === currentUser.uid && (
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white/10 text-neutral-300 border border-white/5 uppercase tracking-wide shrink-0">You</span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono tracking-tight truncate mt-0.5 select-all">{u.id}</span>
                  </div>
                  {/* Mobile Role Badge */}
                  <div className="md:hidden shrink-0">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold tracking-wider uppercase ${
                      u.role === 'admin' 
                        ? 'bg-[#48D2A0]/10 text-[#48D2A0] border border-[#48D2A0]/20' 
                        : 'bg-neutral-800 text-neutral-400 border border-neutral-700/50'
                    }`}>
                      {u.role === 'admin' ? 'ADMIN' : 'USER'}
                    </span>
                  </div>
                </div>
                
                {/* Email Column */}
                <div className="text-neutral-300 text-sm flex flex-col md:block w-full min-w-0">
                  <span className="md:hidden text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-0.5">Email Address</span>
                  <span className="truncate">{u.email}</span>
                </div>
                
                {/* Desktop Role Badge */}
                <div className="hidden md:block min-w-0">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${
                    u.role === 'admin' 
                      ? 'bg-[#48D2A0]/10 text-[#48D2A0] border border-[#48D2A0]/20' 
                      : 'bg-neutral-800 text-neutral-400 border border-neutral-700/50'
                  }`}>
                    {u.role === 'admin' ? 'ADMIN' : 'USER'}
                  </span>
                </div>
                
                {/* Actions Button */}
                <div className="w-full md:w-auto flex md:justify-end mt-1 md:mt-0 shrink-0">
                  <button
                    disabled={u.id === currentUser.uid || actioningUserId === u.id}
                    onClick={() => toggleRole(u.id, u.role)}
                    className={`w-full md:w-auto inline-flex justify-center items-center text-[10px] font-bold px-4 py-2.5 rounded-xl border transition-all uppercase tracking-wider active:scale-95 ${
                      u.id === currentUser.uid
                        ? 'border-neutral-800 text-neutral-600 bg-neutral-900 cursor-not-allowed opacity-40'
                        : actioningUserId === u.id
                        ? 'border-neutral-800 text-neutral-500 bg-neutral-900 cursor-wait'
                        : u.role === 'admin'
                        ? 'border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-white'
                        : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-white'
                    }`}
                  >
                    {actioningUserId === u.id ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-500 border-t-neutral-300 animate-spin"></div>
                    ) : u.role === 'admin' ? (
                      'REVOKE ADMIN'
                    ) : (
                      'MAKE ADMIN'
                    )}
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
