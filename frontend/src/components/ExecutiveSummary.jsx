import React from 'react';

function toneClasses(decision, title) {
  if (decision === 'ACCORDÉ' && title?.toLowerCase().includes('solide')) {
    return {
      wrapper: 'border-emerald-500/20 bg-emerald-500/10',
      badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
      title: 'text-emerald-300',
    };
  }

  if (decision === 'REFUSÉ') {
    return {
      wrapper: 'border-rose-500/20 bg-rose-500/10',
      badge: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
      title: 'text-rose-300',
    };
  }

  return {
    wrapper: 'border-amber-500/20 bg-amber-500/10',
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    title: 'text-amber-300',
  };
}

export default function ExecutiveSummary({ result }) {
  if (!result?.resume_executif) return null;

  const content = result.resume_executif;
  const tone = toneClasses(result.decision, content.titre);

  return (
    <div className={`rounded-[28px] border p-6 shadow-xl ${tone.wrapper}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Résumé exécutif
          </p>
          <h2 className={`mt-2 text-2xl font-bold ${tone.title}`}>
            {content.titre}
          </h2>
        </div>

        <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${tone.badge}`}>
          {result.decision} · {result.score_confiance}%
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Point fort</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.point_fort}</p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Point faible</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.point_faible}</p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Action prioritaire</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.recommandation}</p>
        </div>
      </div>
    </div>
  );
}