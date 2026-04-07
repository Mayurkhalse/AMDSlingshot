import { useMealLog } from '../hooks/useMealLog';

export default function MealHistory() {
  const { meals, removeMeal } = useMealLog();

  const handleRemove = (index) => {
    if(confirm("Are you sure you want to remove this entry?")) {
      removeMeal(index);
    }
  }

  // Format time help
  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="p-6 pb-24 md:p-10 md:pb-12 md:max-w-4xl md:mx-auto">
      <div className="flex justify-between items-center mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Meal History</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1">Everything you logged today.</p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {meals.length === 0 ? (
          <div className="bg-white p-12 md:p-20 rounded-[2rem] text-center shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
               <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl md:text-2xl text-slate-800 font-extrabold mb-2">Clean slate!</h3>
            <p className="text-base text-slate-500">You haven't logged anything today.</p>
          </div>
        ) : (
          meals.slice().reverse().map((meal, index) => {
            const originalIndex = meals.length - 1 - index;
            return (
              <div key={originalIndex} className="bg-white p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center space-x-5 md:space-x-8">
                  <div className="text-center">
                     <div className="text-[10px] md:text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-1">{formatTime(meal.time)}</div>
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/50 text-emerald-600 flex flex-col items-center justify-center font-bold leading-none mx-auto shadow-inner">
                       <span className="text-base md:text-lg font-black">{meal.quantity}</span><span className="text-[9px] md:text-[10px] font-bold opacity-70 uppercase tracking-widest mt-0.5">qty</span>
                     </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg md:text-xl mb-1">{meal.name}</h3>
                    <div className="flex items-center space-x-2 text-xs md:text-sm font-bold text-slate-400">
                      <span>{Math.round(meal.protein * meal.quantity)}g P</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{Math.round(meal.carbs * meal.quantity)}g C</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{Math.round(meal.fat * meal.quantity)}g F</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                   <div className="text-emerald-600 font-black text-xl md:text-2xl mb-2">{Math.round(meal.calories * meal.quantity)} <span className="text-[10px] md:text-xs uppercase text-emerald-500 font-bold tracking-widest">kcal</span></div>
                   <button onClick={() => handleRemove(originalIndex)} className="text-xs md:text-sm text-rose-400 hover:text-rose-600 font-bold py-1.5 px-3 -mr-2 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 lg:opacity-100 focus:opacity-100">
                      Delete Entry
                   </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
