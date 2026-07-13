import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebase';
import SEO from '../SEO';


export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/home';
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google sign in failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0E0E0E] text-white font-sans w-full">
      <SEO 
        title="Sign In" 
        description="Sign in to Algo2Offer to continue your placement preparation." 
        noindex={true} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#48D2A0]/10 blur-[150px] rounded-full pointer-events-none"></div>


      <div className="glass-card w-full max-w-[420px] p-10 sm:p-12 rounded-[40px] relative z-10 flex flex-col items-center text-center shadow-2xl">

        <Link 
          to="/" 
          className="w-16 h-16 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-8 hover:scale-105 transition-transform flex items-center justify-center bg-transparent"
          aria-label="Back to home"
        ></Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-gradient">Welcome Back</h1>
        <p className="text-[#888] text-sm font-medium mb-10">Sign in to continue your journey to mastery.</p>

        <div className="w-full flex flex-col gap-4">

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-4 px-6 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

        </div>

        <p className="mt-10 text-[#555] text-xs font-medium max-w-[260px] leading-relaxed">
          By continuing, you agree to our{' '}
          <button 
            type="button" 
            onClick={() => setShowTerms(true)}
            className="text-[#888] hover:text-white underline decoration-[#444] underline-offset-2 transition-colors font-semibold"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button 
            type="button" 
            onClick={() => setShowPrivacy(true)}
            className="text-[#888] hover:text-white underline decoration-[#444] underline-offset-2 transition-colors font-semibold"
          >
            Privacy Policy
          </button>.
        </p>

      </div>

      {/* TERMS OF SERVICE MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141516] border border-[#2a2a2a] w-full max-w-lg md:max-w-3xl lg:max-w-4xl rounded-3xl p-6 sm:p-8 relative max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-y-visible flex flex-col gap-4 text-left">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-xl font-bold text-white mb-2">Terms of Service</h2>
            <div className="text-neutral-400 text-xs sm:text-sm space-y-4 leading-relaxed">
              <p className="font-semibold text-white">Welcome to Algo2Offer.</p>
              <p>By registering, signing in, or using our services, you agree to comply with and be bound by these Terms of Service. Please read them carefully.</p>
              <h3 className="font-semibold text-white mt-4">1. Acceptance of Terms</h3>
              <p>By logging in via Firebase using Google authentication, you acknowledge that you have read, understood, and agreed to be bound by these terms. If you do not agree, you must not access or use this platform.</p>
              <h3 className="font-semibold text-white mt-4">2. Account Responsibility</h3>
              <p>You are solely responsible for maintaining the confidentiality of your credentials and all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
              <h3 className="font-semibold text-white mt-4">3. User Conduct & Honor Code</h3>
              <p>You agree to use the platform solely for learning and placement preparation. Plagiarism, sharing of premium editorial content, or attempting to disrupt our systems is strictly prohibited.</p>
              <h3 className="font-semibold text-white mt-4">4. Limitation of Liability</h3>
              <p>Algo2Offer and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this platform.</p>
            </div>
            <button 
              onClick={() => setShowTerms(false)}
              className="w-full md:w-32 bg-white text-black py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors mt-4 self-end text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141516] border border-[#2a2a2a] w-full max-w-lg md:max-w-3xl lg:max-w-4xl rounded-3xl p-6 sm:p-8 relative max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-y-visible flex flex-col gap-4 text-left">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-xl font-bold text-white mb-2">Privacy Policy</h2>
            <div className="text-neutral-400 text-xs sm:text-sm space-y-4 leading-relaxed">
              <p className="font-semibold text-white">Your Privacy is our Priority.</p>
              <p>This Privacy Policy describes how Algo2Offer collects, uses, and protects your information when you log in and utilize the platform.</p>
              <h3 className="font-semibold text-white mt-4">1. Information We Collect</h3>
              <p>We use Firebase Authentication to facilitate secure log-in. When you sign in using Google, we retrieve your public profile information (such as your name, email address, and profile picture) to personalize your workspace.</p>
              <h3 className="font-semibold text-white mt-4">2. How We Use Information</h3>
              <p>Your profile data is strictly used to display your learning progress metrics, submit tasks, maintain daily streaks, and manage dashboard custom configurations.</p>
              <h3 className="font-semibold text-white mt-4">3. Data Sharing & Security</h3>
              <p>We do not sell, trade, or share your personal data with third parties. All authentication procedures are handled securely by Google Firebase services.</p>
              <h3 className="font-semibold text-white mt-4">4. Your Consent</h3>
              <p>By logging in and accepting these policies, you consent to the storage and retrieval of your profile data as described herein.</p>
            </div>
            <button 
              onClick={() => setShowPrivacy(false)}
              className="w-full md:w-32 bg-white text-black py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors mt-4 self-end text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}