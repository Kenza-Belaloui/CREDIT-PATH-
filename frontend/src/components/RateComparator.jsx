import React from 'react';

export default function RateComparator({ finance }) {
  const tauxObtenu = Number(finance?.taux_obtenu || 0);
  const tauxMarche = Number(finance?.taux_marche || 0);
  const economie = Number(finance?.economie || 0);

  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-xl animate-fade-in">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Comparaison</p>
        <h3 className="mt-2 text-xl font-bold text-white">Comparateur de taux</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Positionnement du taux simulé par rapport à une moyenne de référence utilisée comme benchmark.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/8 p-4">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Votre taux estimé</span>
            <span className="font-bold text-emerald-400">{tauxObtenu.toFixed(2)}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${Math.min((tauxObtenu / 6) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Moyenne de référence</span>
            <span className="font-bold text-slate-300">{tauxMarche.toFixed(2)}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-slate-500 transition-all"
              style={{ width: `${Math.min((tauxMarche / 6) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 text-center">
          <p className="text-sm leading-7 text-blue-100">
            Votre profil permet d’estimer une économie d’environ{' '}
            <span className="text-lg font-bold text-white">
              {economie.toLocaleString('fr-FR')} €
            </span>{' '}
            d’intérêts par rapport à la référence affichée.
          </p>
        </div>
      </div>
    </div>
  );
}