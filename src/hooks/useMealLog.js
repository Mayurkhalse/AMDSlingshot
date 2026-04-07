import { useState, useEffect } from 'react';

export function useMealLog() {
  const [meals, setMeals] = useState([]);
  const [streak, setStreak] = useState(0);

  const getLocalDate = () => {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffset).toISOString().split("T")[0];
  }

  const getTodayKey = () => `mealLog_${getLocalDate()}`;

  useEffect(() => {
    // Load today's meals
    const saved = localStorage.getItem(getTodayKey());
    if (saved) {
      setMeals(JSON.parse(saved));
    }

    // Load streak Data
    const streakData = JSON.parse(localStorage.getItem("streakData") || '{"lastDate": "", "count": 0}');
    setStreak(streakData.count);
  }, []);

  const addMeal = (meal) => {
    const todayKey = getTodayKey();
    const newMeals = [...meals, { ...meal, time: new Date().toISOString() }];
    setMeals(newMeals);
    localStorage.setItem(todayKey, JSON.stringify(newMeals));

    // Update streak logic
    const today = getLocalDate();
    const streakData = JSON.parse(localStorage.getItem("streakData") || '{"lastDate": "", "count": 0}');
    
    // Correctly get yesterday factoring in timezone
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const yesterday = new Date(Date.now() - 86400000 - tzOffset).toISOString().split("T")[0];

    if (streakData.lastDate === today) {
      // already logged today, don't change streak
    } else if (streakData.lastDate === yesterday) {
      streakData.count += 1;
      streakData.lastDate = today;
    } else {
      streakData.count = 1;
      streakData.lastDate = today;
    }
    localStorage.setItem("streakData", JSON.stringify(streakData));
    setStreak(streakData.count);
  };

  const removeMeal = (index) => {
    const newMeals = meals.filter((_, i) => i !== index);
    setMeals(newMeals);
    localStorage.setItem(getTodayKey(), JSON.stringify(newMeals));
  };

  return { meals, addMeal, removeMeal, streak };
}
