import React from 'react';
import Hero from './components/Hero';
import FoodLogger from './components/FoodLogger';
import ExerciseTracker from './components/ExerciseTracker';
import Goals from './components/Goals';
import ProgressDashboard from './components/ProgressDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <ProgressDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <FoodLogger />
            <ExerciseTracker />
          </div>
          <div className="lg:col-span-1">
            <Goals />
          </div>
        </div>
      </main>
      <footer className="mt-16 py-10 text-center text-slate-400">
        <p>Built for your health journey • Stay consistent, stay strong</p>
      </footer>
    </div>
  );
}
