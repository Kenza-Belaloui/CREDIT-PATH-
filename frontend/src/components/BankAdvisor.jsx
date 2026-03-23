import React from 'react';

function toneClasses(level) {
  if (level === 'Élevée') {
    return {
      card: 'border-emerald-500/20 bg-emerald-500/10',
      text: 'text-emerald-300',
      soft: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
    };
  }

  if (level === 'Faible') {
    return {
      card: 'border-rose-500/20 bg-rose-500/10',
      text: 'text-rose-300',
      soft: 'bg-rose-500/10 border-rose-500/20 text-rose-200',
    };
  }

  return {
    card: 'border-blue-500/20 bg-blue-500/10',
    text: 'text-blue-300',
    soft: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
  };
}

export default function BankAdvisor({ result }) {
  if (!result?.orientation_bancaire) return null;

  const advice = result.orientation_bancaire;
  const tone = toneClasses(advice.compatibilite);

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Conseiller bancaire
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Orientation recommandée
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Lecture indicative du type d’approche bancaire à privilégier.
          </p>
        </div>

        <div className={`rounded-2xl border px-4 py-3 ${tone.card}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Compatibilité</p>
          <p className={`mt-1 text-sm font-semibold ${tone.text}`}>{advice.compatibilite}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className={`rounded-[24px] border p-5 ${tone.card}`}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Catégorie conseillée
            </p>
            <h3 className={`mt-2 text-xl font-bold ${tone.text}`}>
              {advice.categorie}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              {advice.description}
            </p>
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Exemples indicatifs
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {(advice.exemples || []).map((actor, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white"
                >
                  {actor}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Important</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Cette orientation reste indicative et sert à guider la stratégie de présentation du dossier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}