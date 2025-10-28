import React from 'react';
import Spline from '@splinetool/react-spline';
import { Activity, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-slate-950/80 via-slate-950/40 to-transparent" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl backdrop-blur-[2px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-xs text-slate-300">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Smarter tracking • Better results
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Track nutrition, workouts, and goals in one place
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              A vibrant health & fitness tracker to plan meals, log exercises, set personal targets, and visualize progress.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#log" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-4 py-2 transition">
                <Target className="h-4 w-4" />
                Start Logging
              </a>
              <a href="#goals" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-medium px-4 py-2 transition">
                Set Goals
              </a>
            </div>
            <div className="mt-6 h-1.5 w-40 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
