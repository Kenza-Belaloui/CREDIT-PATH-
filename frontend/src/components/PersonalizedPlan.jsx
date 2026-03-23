import React from 'react';

function toneClasses(period) {
  if (period?.toLowerCase().includes('maintenant')) {
    return 'border-rose-500/20 bg-rose-500/10';
  }
  if (period?.toLowerCase().includes('6')) {
    return 'border-blue-500/20 bg-blue-500/10';
  }
  if (period?.toLowerCase().includes('1 à 3')) {
    return 'border-violet-500/20 bg-violet-500/10';
  }
  return 'border-white/10 bg-white/5';
}

export default function PersonalizedPlan({ result }) {
  if (!result?.plan_personnalise) return null;

  const timeline = result.plan_personnalise;
  const bank = result.orientation_bancaire;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Plan personnalisé
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">
          Stratégie recommandée dans le temps
        </h2>

        <div className="mt-6 space-y-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`rounded-[22px] border p-4 ${toneClasses(item.periode)}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {item.periode}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {item.titre}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bank && (
        <div className="xl:col-span-4 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Orientation bancaire
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Type d’approche conseillé
          </h2>

          <div className="mt-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <h3 className="text-base font-semibold text-white">{bank.categorie}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {bank.description}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Compatibilité : {bank.compatibilite}
            </p>
          </div>

          <div className="mt-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Exemples</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(bank.exemples || []).map((item, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}