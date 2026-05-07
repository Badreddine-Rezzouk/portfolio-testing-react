'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

const SIMS = 50000;

export default function GachaCalcPage() {
  const t = useTranslations('Tools.GachaCalc');

  const [oro, setOro] = useState<number | ''>('');
  const [ori, setOri] = useState<number | ''>('');
  const [permits, setPermits] = useState<number | ''>('');
  const [pity, setPity] = useState(0);
  const [sparkAvailable, setSparkAvailable] = useState(true);
  const [owned, setOwned] = useState(0);
  const [results, setResults] = useState<{ labels: string[], totalNeeded: number[], probs: number[] } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const totalPulls = useMemo(() => {
    const nOro = Number(oro) || 0;
    const nOri = Number(ori) || 0;
    const nPermits = Number(permits) || 0;
    const totalOro = nOro + nOri * 75;
    const pullsFromCurrency = Math.floor(totalOro / 500);
    return pullsFromCurrency + nPermits;
  }, [oro, ori, permits]);

  const sparkPct = useMemo(() => {
    if (totalPulls === 0) return 0;
    return Math.min(Math.round((totalPulls / 120) * 100), 999);
  }, [totalPulls]);

  const calculate = () => {
    if (totalPulls === 0) return;
    setIsSimulating(true);

    // Use setTimeout to allow UI to update before heavy calculation
    setTimeout(() => {
      const counts = new Int32Array(8);
      const startPity = pity;
      const sparkAv = sparkAvailable;

      for (let s = 0; s < SIMS; s++) {
        let copies = 0;
        let currentPity = startPity;
        let sparkDone = !sparkAv;
        let bannerPulls = 0;

        for (let p = 0; p < totalPulls; p++) {
          currentPity++;
          bannerPulls++;
          const forced = !sparkDone && bannerPulls === 120;
          let rate = 0.008;
          if (currentPity >= 65) rate = 0.008 + (currentPity - 64) * 0.05;
          const got6 = forced || Math.random() < rate || currentPity >= 80;

          if (got6) {
            currentPity = 0;
            if (forced) {
              copies++;
              sparkDone = true;
            } else {
              if (Math.random() < 0.5) {
                copies++;
                if (!sparkDone) sparkDone = true;
              }
            }
          }
        }
        counts[Math.min(copies, 7)]++;
      }

      let cumulative = SIMS;
      const probs: number[] = [];
      for (let i = 0; i <= 7; i++) {
        probs.push((cumulative / SIMS) * 100);
        cumulative -= counts[i];
      }

      setResults({
        labels: ['P0', 'P1', 'P2', 'P3', 'P4', 'P5'],
        totalNeeded: [1, 2, 3, 4, 5, 6],
        probs
      });
      setIsSimulating(false);
    }, 30);
  };

  const colors = ['#7F77DD', '#1D9E75', '#378ADD', '#BA7517', '#D4537E', '#D85A30'];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50 border-b-4 border-zinc-900 dark:border-zinc-50 pb-2">
        {t('title')}
      </h1>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Currency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('oro')}
            </label>
            <input
              type="number"
              value={oro}
              onChange={(e) => setOro(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('ori')}
            </label>
            <input
              type="number"
              value={ori}
              onChange={(e) => setOri(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('permits')}
            </label>
            <input
              type="number"
              value={permits}
              onChange={(e) => setPermits(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
            />
          </div>
        </div>

        {/* Pity and Spark */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('currentPity')} ({pity})
            </label>
            <input
              type="range"
              min="0"
              max="79"
              value={pity}
              onChange={(e) => setPity(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('sparkGuarantee')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSparkAvailable(true)}
                className={`flex-1 py-2 text-xs font-bold rounded border transition-colors ${
                  sparkAvailable
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
                    : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500'
                }`}
              >
                {t('available')}
              </button>
              <button
                onClick={() => setSparkAvailable(false)}
                className={`flex-1 py-2 text-xs font-bold rounded border transition-colors ${
                  !sparkAvailable
                    ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300'
                    : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500'
                }`}
              >
                {t('used')}
              </button>
            </div>
          </div>
        </div>

        {/* Owned Select */}
        <div className="flex flex-col gap-1 max-w-xs">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {t('owned')}
          </label>
          <select
            value={owned}
            onChange={(e) => setOwned(Number(e.target.value))}
            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
          >
            <option value="0" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.0')}</option>
            <option value="1" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.1')}</option>
            <option value="2" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.2')}</option>
            <option value="3" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.3')}</option>
            <option value="4" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.4')}</option>
            <option value="5" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">{t('ownedOptions.5')}</option>
          </select>
        </div>

        {/* Summary */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded flex justify-between items-center text-sm">
          <div>
            {t('totalPulls')}: <span className="font-bold text-lg">{totalPulls.toLocaleString()}</span>
          </div>
          {totalPulls > 0 && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              ≈ {sparkPct}% {t('ofSpark')}
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          disabled={totalPulls === 0 || isSimulating}
          className="w-full py-3 rounded-lg font-bold transition-all shadow-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSimulating ? t('simulating') : t('calculate')}
        </button>

        {/* Results */}
        {results && (
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {results.labels.map((label, i) => {
              const totalNeeded = results.totalNeeded[i];
              const additionalNeeded = Math.max(0, totalNeeded - owned);
              const probIdx = totalNeeded - owned;
              const prob = probIdx <= 0 ? 100 : (results.probs[probIdx] || 0);
              const alreadyHave = owned >= totalNeeded;

              return (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <div className="flex gap-2 items-baseline">
                      <span className="font-bold">{label}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {totalNeeded} {totalNeeded === 1 ? t('copy') : t('copies')} total
                        {alreadyHave 
                          ? ` — ${t('alreadyUnlocked')}` 
                          : additionalNeeded > 0 ? ` · ${t('needMore', { count: additionalNeeded })}` : ''}
                      </span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: alreadyHave ? '#10b981' : colors[i] }}>
                      {prob.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${prob}%`,
                        backgroundColor: alreadyHave ? '#10b981' : colors[i]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
