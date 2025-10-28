import React, { useMemo } from 'react';
import { Activity, TrendingUp } from 'lucide-react';

export default function ProgressDashboard() {
  // Static sample weekly data for visual representation
  const weekly = useMemo(() => [
    { day: 'Mon', cals: 2100, steps: 7000 },
    { day: 'Tue', cals: 1900, steps: 8200 },
    { day: 'Wed', cals: 2300, steps: 6200 },
    { day: 'Thu', cals: 2000, steps: 7500 },
    { day: 'Fri', cals: 2400, steps: 9000 },
    { day: 'Sat', cals: 2600, steps: 10000 },
    { day: 'Sun', cals: 1800, steps: 6800 },
  ], []);

  const maxCals = Math.max(...weekly.map(w => w.cals));
  const maxSteps = Math.max(...weekly.map(w => w.steps));

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-sky-400"/> Progress Overview</h2>
          <p className="text-slate-300 text-sm">Your weekly calories and steps at a glance</p>
        </div>
        <div className="flex gap-3 items-center">
          <Legend color="bg-emerald-500" label="Calories" />
          <Legend color="bg-sky-400" label="Steps" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Active Days" value="6/7" sub="Goal: 5 days" color="text-emerald-400" />
        <Stat title="Avg Calories" value={`${Math.round(weekly.reduce((a, b) => a + b.cals, 0)/weekly.length)} kcal`} sub="This week" color="text-sky-300" />
        <Stat title="Best Steps" value={`${Math.max(...weekly.map(w=>w.steps))}`} sub="This week" color="text-emerald-300" />
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-7 gap-3">
          {weekly.map((w) => (
            <div key={w.day} className="flex flex-col items-center">
              <div className="w-full h-36 rounded-lg bg-white/5 p-1 flex items-end gap-1">
                <div
                  className="flex-1 rounded-sm bg-emerald-500"
                  style={{ height: `${Math.max(10, (w.cals / maxCals) * 100)}%` }}
                  title={`${w.cals} kcal`}
                />
                <div
                  className="flex-1 rounded-sm bg-sky-400"
                  style={{ height: `${Math.max(10, (w.steps / maxSteps) * 100)}%` }}
                  title={`${w.steps} steps`}
                />
              </div>
              <div className="mt-2 text-xs text-slate-400">{w.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
        <Activity className="h-4 w-4 text-emerald-400"/>
        Keep your streak alive! Log meals and workouts daily.
      </div>
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span className={`h-3 w-3 rounded ${color}`} />
      {label}
    </div>
  );
}

function Stat({ title, value, sub, color }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
      <div className="text-slate-300 text-sm">{title}</div>
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  );
}
