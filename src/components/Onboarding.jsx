import { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'Maintenance',
    activityLevel: 'sedentary'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, weight, height, goal, activityLevel } = formData;
    
    if (!name || !age || !weight || !height) return;

    // BMR (Mifflin-St Jeor)
    const bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    const activityMultiplier = { sedentary: 1.2, moderate: 1.55, active: 1.725 };
    const tdee = Math.round(bmr * activityMultiplier[activityLevel]);

    const userProfile = { 
      name, 
      age: Number(age), 
      weight: Number(weight), 
      height: Number(height), 
      goal, 
      activityLevel, 
      tdee 
    };
    
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    onComplete(userProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 md:p-12 relative overflow-hidden">
      {/* Decorative background blobs for desktop */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl z-10 border border-slate-100">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-10 md:p-16 md:w-5/12 flex flex-col justify-center text-center md:text-left text-white relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="relative z-10">
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 backdrop-blur-sm border border-white/30">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
             </div>
             <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Welcome to NutriSense</h1>
             <p className="text-emerald-50 text-lg font-medium opacity-90 leading-relaxed">
               Calculate your exact caloric baseline and start hitting your nutritional goals with intelligent tracking.
             </p>
          </div>
        </div>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 md:p-12 md:w-7/12 space-y-6 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Your Profile</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Let's calculate your unique TDEE</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">First Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg placeholder-slate-300" placeholder="e.g., Alex" />
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg text-center placeholder-slate-300" placeholder="25" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Weight <span className="text-slate-400 normal-case font-medium">(kg)</span></label>
              <input required type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg text-center placeholder-slate-300" placeholder="70" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Height <span className="text-slate-400 normal-case font-medium">(cm)</span></label>
              <input required type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg text-center placeholder-slate-300" placeholder="175" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Primary Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-base">
                <option value="Weight Loss">Weight Loss</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Muscle Gain">Muscle Gain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Activity</label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-base">
                <option value="sedentary">Sedentary (No exercise)</option>
                <option value="moderate">Moderate (3-5 days/wk)</option>
                <option value="active">Active (6-7 days/wk)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-600/30 transition-all active:scale-95 border border-emerald-500/50">
            Calculate Target & Start
          </button>
        </form>
      </div>
    </div>
  );
}
