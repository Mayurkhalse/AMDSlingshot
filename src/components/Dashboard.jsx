import { useMealLog } from '../hooks/useMealLog';
import NutriTip from './NutriTip';

// Helper component for progress bars
const ProgressBar = ({ label, consumed, target, colorClass }) => {
  const percentage = Math.min(100, Math.round((consumed / target) * 100)) || 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1.5 font-bold text-slate-600">
        <span>{label}</span>
        <span>{Math.round(consumed)}g <span className="text-xs font-medium text-slate-400">/ {target}g</span></span>
      </div>
      <div className="w-full bg-slate-200/70 rounded-full h-3">
        <div className={`h-3 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default function Dashboard({ profile }) {
  const { meals, streak } = useMealLog();

  // Aggregate macros from today's meals
  const totals = meals.reduce((acc, meal) => {
    acc.calories += meal.calories * meal.quantity;
    acc.protein += meal.protein * meal.quantity;
    acc.carbs += meal.carbs * meal.quantity;
    acc.fat += meal.fat * meal.quantity;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Macro Targets from constraints
  const proteinTarget = Math.round(0.8 * profile.weight);
  const carbsTarget = Math.round((profile.tdee * 0.5) / 4);
  const fatTarget = Math.round((profile.tdee * 0.25) / 9);

  // Calorie ring math
  const caloriePercentage = Math.min(100, Math.round((totals.calories / profile.tdee) * 100)) || 0;
  // Increase ring size significantly on desktop
  const isMobile = window.innerWidth < 768;
  const radius = isMobile ? 60 : 100;
  const viewBoxSize = isMobile ? 180 : 280;
  const strokeWidth = isMobile ? 14 : 20;
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (caloriePercentage / 100) * circumference;

  return (
    <div className="p-6 md:p-10 pt-8 pb-24 md:pb-12">
      {/* Header & Streak */}
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Welcome back, {profile.name}!</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1">Here's your nutritional progress today.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100 flex items-center space-x-2 shadow-sm transition-transform hover:scale-105">
          <span className="text-orange-500 text-2xl drop-shadow-sm animate-pulse">🔥</span>
          <span className="font-bold text-orange-700 text-sm md:text-base">{streak} Day Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left Column (Main Metrics) */}
        <div className="md:col-span-5 space-y-8">
          
          {/* Main Calories Ring */}
          <div className="flex justify-center relative bg-white round-full md:rounded-[3rem] rounded-[2rem] shadow-xl border border-slate-100/50 p-8 py-10 md:py-14">
            <svg width={viewBoxSize} height={viewBoxSize} className="transform -rotate-90">
              <circle cx={center} cy={center} r={radius} stroke="#f1f5f9" strokeWidth={strokeWidth} fill="transparent" />
              <circle 
                cx={center} cy={center} r={radius} 
                stroke="#10b981" 
                strokeWidth={strokeWidth} 
                fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                className="transition-all duration-1000 ease-out" 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-1">
              <div className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter">{Math.round(totals.calories)}</div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-emerald-500 mt-1">/ {profile.tdee} kcal</div>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="bg-white rounded-3xl p-7 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center">
               <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               Macronutrients
            </h3>
            <ProgressBar label="Protein" consumed={totals.protein} target={proteinTarget} colorClass="bg-blue-500" />
            <ProgressBar label="Carbs" consumed={totals.carbs} target={carbsTarget} colorClass="bg-amber-500" />
            <ProgressBar label="Fat" consumed={totals.fat} target={fatTarget} colorClass="bg-rose-500" />
          </div>

        </div>

        {/* Right Column (Insights & Feeds) */}
        <div className="md:col-span-7 space-y-8">
          
          {/* NutriTip AI Coaching */}
          <NutriTip profile={profile} />

          {/* Quick Summary */}
          <div className="bg-white rounded-3xl p-7 md:p-8 shadow-sm border border-slate-100 h-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-slate-800">Today's Meals</h3>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{meals.length} items logged</span>
            </div>
            
            {meals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 md:py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                 <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                 <p className="text-sm font-semibold text-slate-400 text-center">No meals logged yet.<br/>Log foods to fuel your streak!</p>
              </div>
            ) : (
              <div className="space-y-4">
                 {meals.slice(-4).reverse().map((meal, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50/80 hover:bg-slate-100 p-4 rounded-2xl border border-slate-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 flex items-center justify-center font-extrabold text-lg shadow-sm">
                           {meal.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-md">{meal.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                             <span>Qty: {meal.quantity}</span>
                             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                             <span>{meal.protein * meal.quantity}g P</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-base font-extrabold text-slate-700">
                           {Math.round(meal.calories * meal.quantity)} <span className="text-xs text-slate-400 font-semibold uppercase">kcal</span>
                         </div>
                      </div>
                    </div>
                 ))}
                 {meals.length > 4 && (
                   <div className="text-center mt-4">
                     <p className="text-sm text-emerald-600 font-bold hover:text-emerald-700 cursor-pointer transition-colors inline-flex items-center">
                        View full timeline 
                        <svg className="w-4 h-4 ml-1 relative top-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                     </p>
                   </div>
                 )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
