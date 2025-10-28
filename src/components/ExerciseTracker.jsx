import React, { useState } from 'react';
import { Dumbbell, Plus } from 'lucide-react';

export default function ExerciseTracker() {
  const [entry, setEntry] = useState({ name: '', duration: '', calories: '' });
  const [list, setList] = useState([]);

  function addExercise(e) {
    e.preventDefault();
    if (!entry.name) return;
    setList((prev) => [
      { id: crypto.randomUUID(), ...entry, duration: Number(entry.duration||0), calories: Number(entry.calories||0) },
      ...prev,
    ]);
    setEntry({ name: '', duration: '', calories: '' });
  }

  const totalMins = list.reduce((a, b) => a + Number(b.duration || 0), 0);
  const totalCal = list.reduce((a, b) => a + Number(b.calories || 0), 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Dumbbell className="h-5 w-5 text-emerald-400"/> Exercise</h2>
        <div className="text-sm text-slate-300">{totalMins} min • <span className="text-sky-300 font-semibold">{totalCal} kcal</span></div>
      </div>

      <form onSubmit={addExercise} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Exercise name"
          className="md:col-span-2 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={entry.name}
          onChange={(e) => setEntry({ ...entry, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={entry.duration}
          onChange={(e) => setEntry({ ...entry, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories"
          className="rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={entry.calories}
          onChange={(e) => setEntry({ ...entry, calories: e.target.value })}
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-medium px-3 py-2 transition md:col-span-1">
          <Plus className="h-4 w-4"/> Add
        </button>
      </form>

      <ul className="mt-5 divide-y divide-white/5">
        {list.length === 0 && (
          <li className="text-sm text-slate-400 py-3">No exercises logged yet. Add your first activity.</li>
        )}
        {list.map((ex) => (
          <li key={ex.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{ex.name}</div>
              <div className="text-xs text-slate-400">{ex.duration} min</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sky-300 font-semibold">{ex.calories} kcal</span>
              <button onClick={() => setList((prev) => prev.filter((i) => i.id !== ex.id))} className="text-slate-300 hover:text-red-300 text-sm">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
