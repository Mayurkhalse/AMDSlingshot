import { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LogMeal from './components/LogMeal';
import MealHistory from './components/MealHistory';

function App() {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  if (!profile) {
    return <Onboarding onComplete={setProfile} />;
  }

  return (
    <div className="mx-auto min-h-screen flex flex-col md:flex-row shadow-2xl bg-slate-50 overflow-hidden">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 z-40 bg-zinc-50/50">
        <div className="p-6 mb-4 mt-2">
          <h1 className="text-3xl font-extrabold text-emerald-600 flex items-center">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            NutriSense
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1 pl-1">Smart offline tracking</p>
        </div>

        <nav className="flex-1 px-4 space-y-3">
          <button onClick={() => setActiveTab('Home')} className={`w-full flex items-center p-4 rounded-xl font-bold transition-all ${activeTab === 'Home' ? 'text-emerald-700 bg-emerald-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-emerald-600'}`}>
            <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" strokeWidth={activeTab === 'Home' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Dashboard
          </button>
          
          <button onClick={() => setActiveTab('Log')} className={`w-full flex items-center p-4 rounded-xl font-bold transition-all ${activeTab === 'Log' ? 'text-emerald-700 bg-emerald-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-emerald-600'}`}>
            <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" strokeWidth={activeTab === 'Log' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Quick Log Meal
          </button>
          
          <button onClick={() => setActiveTab('History')} className={`w-full flex items-center p-4 rounded-xl font-bold transition-all ${activeTab === 'History' ? 'text-emerald-700 bg-emerald-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-emerald-600'}`}>
            <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" strokeWidth={activeTab === 'History' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Meal History
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto w-full md:pb-0 pb-20 scroll-smooth">
        <div className="max-w-6xl mx-auto w-full h-full p-0">
          {activeTab === 'Home' && <Dashboard profile={profile} />}
          {activeTab === 'Log' && <LogMeal onLogComplete={() => setActiveTab('Home')} />}
          {activeTab === 'History' && <MealHistory />}
        </div>
      </div>
      
      {/* Mobile Tab bar (hidden on desktop) */}
      <div className="md:hidden absolute bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 pb-safe text-sm font-medium z-50 shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('Home')} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'Home' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'}`}>
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={activeTab === 'Home' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Home
        </button>
        <button onClick={() => setActiveTab('Log')} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'Log' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'}`}>
          <div className="relative">
             <div className={`absolute inset-0 bg-emerald-100 rounded-full scale-150 -z-10 transition-opacity ${activeTab === 'Log' ? 'opacity-100' : 'opacity-0'}`}></div>
             <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={activeTab === 'Log' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
          Log Food
        </button>
        <button onClick={() => setActiveTab('History')} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'History' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'}`}>
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={activeTab === 'History' ? 2.5 : 2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          History
        </button>
      </div>
    </div>
  );
}

export default App;
