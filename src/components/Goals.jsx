import React, { useState } from 'react';
import { Target } from 'lucide-react';

export default function Goals() {
  const [goals, setGoals] = useState({
    weight: 70,
    calories: 2200,
    protein: 140,
    carbs: 220,
    fat: 70,
  });

  return (
    <section id="goals" className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sticky top-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Target className="h-5 w-5 text-emerald-400"/> Personalized Goals</h2>

      <div className="space-y-4">
        <Field label="Target Weight (kg)">
          <Number value={goals.weight} onChange={(v) => setGoals({ ...goals, weight: v })} min={30} max={200} />
        </Field>
        <Field label="Daily Calories">
          <Number value={goals.calories} onChange={(v) => setGoals({ ...goals, calories: v })} min={1000} max={5000} step={50} />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Protein (g)">
            <Number value={goals.protein} onChange={(v) => setGoals({ ...goals, protein: v })} min={0} max={400} />
          </Field>
          <Field label="Carbs (g)">
            <Number value={goals.carbs} onChange={(v) => setGoals({ ...goals, carbs: v })} min={0} max={600} />
          </Field>
          <Field label="Fat (g)">
            <Number value={goals.fat} onChange={(v) => setGoals({ ...goals, fat: v })} min={0} max={200} />
          </Field>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-800/60 border border-white/10 p-3 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Macro Calories Guide</span>
          <span className="text-slate-400">Protein 4kcal/g • Carbs 4kcal/g • Fat 9kcal/g</span>
        </div>
        <hr className="my-2 border-white/10" />
        <div className="flex items-center justify-between">
          <span>Estimated Macro Calories</span>
          <span className="text-emerald-400 font-semibold">
            {goals.protein * 4 + goals.carbs * 4 + goals.fat * 9} kcal
          </span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Number({ value, onChange, min = 0, max = 10000, step = 1 }) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  );
}
