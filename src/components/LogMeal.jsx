import { useState } from 'react';
import { foods } from '../data/foods';
import { useMealLog } from '../hooks/useMealLog';

export default function LogMeal({ onLogComplete }) {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addMeal } = useMealLog();

  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleLog = () => {
    if (!selectedFood) return;
    addMeal({ ...selectedFood, quantity: Number(quantity) });
    setSearch("");
    setSelectedFood(null);
    setQuantity(1);
    onLogComplete(); // Return to home tab
  };

  return (
    <div className="p-6 pb-24 md:p-10 md:pb-12 h-full flex flex-col md:max-w-4xl md:mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 md:mb-8 tracking-tight">Log a Meal</h2>
      
      {!selectedFood ? (
        <div className="flex-1 flex flex-col rounded-3xl md:bg-white md:shadow-lg md:border border-slate-100 md:p-8 md:min-h-[500px]">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-4 bg-white md:bg-slate-50 border-2 border-slate-100 md:border-transparent rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none shadow-sm transition-all text-slate-800 font-medium placeholder-slate-400 text-lg" 
              placeholder="Search foods (e.g. Dal Tadka)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {filteredFoods.slice(0, 15).map(food => (
               <button 
                 key={food.id}
                 onClick={() => setSelectedFood(food)}
                 className="w-full text-left bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-emerald-400 hover:shadow-md transition-all active:scale-[0.98] group"
               >
                 <div className="flex items-center space-x-4">
                   <div className="hidden md:flex w-12 h-12 mt-1 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 items-center justify-center font-bold text-lg transition-colors">
                     {food.name.charAt(0)}
                   </div>
                   <div>
                     <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-emerald-700 transition-colors">{food.name}</h3>
                     <p className="text-sm font-medium text-slate-500">{food.serving}</p>
                   </div>
                 </div>
                 <div className="text-emerald-600 font-extrabold text-lg flex items-center">
                   {food.calories} <span className="text-xs font-semibold uppercase text-slate-400 ml-1 leading-none mt-1">kcal</span>
                 </div>
               </button>
            ))}
            {filteredFoods.length === 0 && (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                 <div className="text-6xl mb-4">🔍</div>
                 <p className="text-xl font-bold text-slate-400">No foods found.</p>
                 <p className="text-slate-400 mt-2 font-medium">Try searching for simple ingredients.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center -mt-10 md:-mt-0 animate-in fade-in zoom-in duration-300">
           <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 w-full max-w-lg text-center transform transition-all">
             <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-inner">
               {selectedFood.name.charAt(0)}
             </div>
             <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">{selectedFood.name}</h3>
             <p className="text-slate-500 font-medium text-base mb-8">Base serving: <span className="text-slate-800 font-bold">{selectedFood.serving}</span></p>
             
             <div className="bg-slate-50 p-6 rounded-3xl mb-8 border border-slate-100 shadow-inner">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-slate-600 font-bold text-lg">Quantity</span>
                 <div className="flex items-center space-x-6">
                   <button onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))} className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 text-slate-600 shadow-sm flex items-center justify-center font-black text-2xl hover:border-emerald-500 hover:text-emerald-600 active:bg-slate-100 transition-all">-</button>
                   <span className="text-3xl font-black text-slate-800 w-12 text-center">{quantity}</span>
                   <button onClick={() => setQuantity(quantity + 0.5)} className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 text-slate-600 shadow-sm flex items-center justify-center font-black text-2xl hover:border-emerald-500 hover:text-emerald-600 active:bg-slate-100 transition-all">+</button>
                 </div>
               </div>
               <div className="flex justify-between items-center mt-6 pt-6 border-t-2 border-slate-200/60">
                 <span className="text-slate-600 font-bold text-lg">Total Energy</span>
                 <div className="text-right">
                    <span className="block text-emerald-600 font-black text-3xl">{Math.round(selectedFood.calories * quantity)} <span className="text-base text-emerald-500">kcal</span></span>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{Math.round(selectedFood.protein * quantity)}g P • {Math.round(selectedFood.carbs * quantity)}g C • {Math.round(selectedFood.fat * quantity)}g F</span>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <button onClick={() => setSelectedFood(null)} className="py-4 rounded-2xl font-bold text-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                 Cancel
               </button>
               <button onClick={handleLog} className="py-4 rounded-2xl font-bold text-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl hover:shadow-emerald-600/30 transition-all active:scale-95">
                 Add to Log
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
