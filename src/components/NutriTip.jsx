import { useState, useEffect } from 'react';
import { useMealLog } from '../hooks/useMealLog';

export default function NutriTip({ profile }) {
  const { meals } = useMealLog();
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  // Aggregate macros from today's meals
  const totals = meals.reduce((acc, meal) => {
    acc.calories += meal.calories * meal.quantity;
    acc.protein += meal.protein * meal.quantity;
    acc.carbs += meal.carbs * meal.quantity;
    acc.fat += meal.fat * meal.quantity;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const getMacroSummary = () => {
    return `Calories: ${Math.round(totals.calories)}/${profile.tdee}kcal, Protein: ${Math.round(totals.protein)}g, Carbs: ${Math.round(totals.carbs)}g, Fat: ${Math.round(totals.fat)}g. User goal: ${profile.goal}.`;
  };

  const fetchTip = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === '') {
        setTip("Set your Gemini API Key in .env to get personalized AI tips!");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a nutrition assistant. Based on today's intake: ${getMacroSummary()}, give ONE short actionable tip (2-3 sentences max) to improve nutrition for the rest of the day. Be specific and friendly. Tone should be motivating.`
              }]
            }]
          })
        }
      );
      const data = await response.json();
      if(data.candidates && data.candidates[0]) {
        let textTip = data.candidates[0].content.parts[0].text;
        // strip asterisks if present for cleaner UI
        textTip = textTip.replace(/\*/g, '');
        setTip(textTip);
      } else {
        setTip("Awesome job tracking your meals! Keep it up for consistent progress.");
      }
    } catch(err) {
      setTip("Great start for today! Drink some water to stay hydrated.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTip();
    // eslint-disable-next-line
  }, [meals.length]); // refetch tip when a new meal is logged

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 shadow-lg text-white mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold flex items-center shadow-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI NutriTip
        </h3>
        <button onClick={fetchTip} disabled={loading} className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors font-medium">
          {loading ? 'Thinking...' : 'Refresh'}
        </button>
      </div>
      <p className="text-sm text-indigo-50 leading-relaxed font-medium whitespace-pre-line">
        {loading ? (
          <span className="flex space-x-1 mt-2 mb-2">
            <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          </span>
        ) : tip}
      </p>
    </div>
  );
}
