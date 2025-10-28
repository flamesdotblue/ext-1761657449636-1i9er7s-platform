import React, { useMemo, useState } from 'react';
import { Apple, Flame, Plus } from 'lucide-react';

const macroColors = {
  protein: 'bg-emerald-500',
  carbs: 'bg-sky-400',
  fat: 'bg-amber-400',
};

export default function FoodLogger() {
  const [entry, setEntry] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  const [foods, setFoods] = useState([]);

  const totals = useMemo(() => {
    return foods.reduce(
      (acc, f) => ({
        calories: acc.calories + Number(f.calories || 0),
        protein: acc.protein + Number(f.protein || 0),
        carbs: acc.carbs + Number(f.carbs || 0),
        fat: acc.fat + Number(f.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [foods]);

  function addFood(e) {
    e.preventDefault();
    if (!entry.name) return;
    setFoods((prev) => [
      { id: crypto.randomUUID(), ...entry, calories: Number(entry.calories||0), protein: Number(entry.protein||0), carbs: Number(entry.carbs||0), fat: Number(entry.fat||0) },
      ...prev,
    ]);
    setEntry({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  }

  function removeFood(id) {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  }

  const macroTotal = totals.protein + totals.carbs + totals.fat || 1;
  const macroPct = {
    protein: Math.round((totals.protein / macroTotal) * 100),
    carbs: Math.round((totals.carbs / macroTotal) * 100),
    fat: Math.round((totals.fat / macroTotal) * 100),
  };

  return (
    <section id="log" className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Apple className="h-5 w-5 text-sky-400"/> Food Log</h2>
        <div className="text-sm text-slate-300">Total Calories: <span className="font-semibold text-emerald-400">{totals.calories}</span></div>
      </div>

      <form onSubmit={addFood} className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Food name"
          className="md:col-span-2 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={entry.name}
          onChange={(e) => setEntry({ ...entry, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={entry.calories}
          onChange={(e) => setEntry({ ...entry, calories: e.target.value })}
        />
        <input
          type="number"
          placeholder="Protein (g)"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={entry.protein}
          onChange={(e) => setEntry({ ...entry, protein: e.target.value })}
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={entry.carbs}
          onChange={(e) => setEntry({ ...entry, carbs: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fat (g)"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={entry.fat}
          onChange={(e) => setEntry({ ...entry, fat: e.target.value })}
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-3 py-2 transition">
          <Plus className="h-4 w-4"/> Add
        </button>
      </form>

      <div className="mt-5">
        <div className="text-sm text-slate-300 mb-2 flex items-center gap-2"><Flame className="h-4 w-4 text-amber-300"/> Macro Breakdown</div>
        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
          <div className={`h-full ${macroColors.protein}`} style={{ width: `${macroPct.protein}%` }} />
          <div className={`h-full ${macroColors.carbs}`} style={{ width: `${macroPct.carbs}%` }} />
          <div className={`h-full ${macroColors.fat}`} style={{ width: `${macroPct.fat}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-300 mt-1">
          <span>Protein {macroPct.protein}%</span>
          <span>Carbs {macroPct.carbs}%</span>
          <span>Fat {macroPct.fat}%</span>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-white/5">
        {foods.length === 0 && (
          <li className="text-sm text-slate-400 py-3">No foods logged yet. Add your first meal.</li>
        )}
        {foods.map((f) => (
          <li key={f.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-xs text-slate-400">P {f.protein}g • C {f.carbs}g • F {f.fat}g</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 font-semibold">{f.calories} kcal</span>
              <button onClick={() => removeFood(f.id)} className="text-slate-300 hover:text-red-300 text-sm">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
