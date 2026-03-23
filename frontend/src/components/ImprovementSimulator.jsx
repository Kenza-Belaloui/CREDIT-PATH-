import React, { useMemo, useState } from 'react';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function computeProjectedProfile(data, result, adjustments) {
  const revenu = Number(data?.revenu_mensuel || 0) + Number(adjustments.revenuPlus || 0);
  const dette = Math.max(0, Number(data?.dette_totale || 0) - Number(adjustments.detteMoins || 0));
  const epargne = Number(data?.epargne || 0) + Number(adjustments.epargnePlus || 0);
  const anciennete = Number(data?.anciennete_emploi || 0) + Number(adjustments.anciennetePlus || 0);
  const montant = Number(data?.montant_demande || 0);

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 100;
  const apport = montant > 0 ? (epargne / montant) * 100 : 0;

  let projectedScore = Number(result?.score_confiance || 0);

  if (ratio <= 33) projectedScore += 10;
  else if (ratio <= 40) projectedScore += 3;
  else projectedScore -= 8;

  if (apport >= 20) projectedScore += 8;
  else if (apport >= 10) projectedScore += 5;
  else if (apport < 5) projectedScore -= 4;

  if (anciennete >= 5) projectedScore += 6;
  else if (anciennete >= 2) projectedScore += 3;
  else projectedScore -= 3;

  if (revenu >= 3500) projectedScore += 5;
  else if (revenu >= 2500) projectedScore += 2;

  projectedScore = clamp(Math.round(projectedScore), 0, 100);

  const decision = projectedScore >= 55 ? 'ACCORDÉ' : 'REFUSÉ';
  const taux = Math.max(2.5, 6.0 - projectedScore / 20).toFixed(2);

  return {
    revenu,
    dette,
    epargne,
    anciennete,
    ratio,
    apport,
    projectedScore,
    decision,
    taux,
    gainScore: projectedScore - Number(result?.score_confiance || 0),
  };
}

export default function ImprovementSimulator({ data, result }) {
  const [adjustments, setAdjustments] = useState({
    revenuPlus: 300,
    detteMoins: 1000,
    epargnePlus: 3000,
    anciennetePlus: 1,
  });

  const projected = useMemo(
    () => computeProjectedProfile(data, result, adjustments),
    [data, result, adjustments]
  );

  if (!data || !result) return null;

  const updateAdjustment = (name, value) => {
    setAdjustments((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Simulation d’amélioration
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Et si votre profil s’améliorait ?
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Ajustez quelques paramètres pour estimer l’impact sur votre score, votre décision et votre taux.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Projection</p>
          <p className="mt-1 text-sm font-semibold text-white">
            Gain estimé : {projected.gainScore >= 0 ? '+' : ''}{projected.gainScore} points
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Augmenter le revenu mensuel
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={adjustments.revenuPlus}
              onChange={(e) => updateAdjustment('revenuPlus', e.target.value)}
              className="w-full"
            />
            <p className="mt-2 text-sm text-slate-300">+ {adjustments.revenuPlus} €</p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Réduire les dettes
            </label>
            <input
              type="range"
              min="0"
              max={Math.max(5000, Number(data?.dette_totale || 0))}
              step="500"
              value={adjustments.detteMoins}
              onChange={(e) => updateAdjustment('detteMoins', e.target.value)}
              className="w-full"
            />
            <p className="mt-2 text-sm text-slate-300">- {adjustments.detteMoins} €</p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Ajouter de l’épargne
            </label>
            <input
              type="range"
              min="0"
              max="30000"
              step="1000"
              value={adjustments.epargnePlus}
              onChange={(e) => updateAdjustment('epargnePlus', e.target.value)}
              className="w-full"
            />
            <p className="mt-2 text-sm text-slate-300">+ {adjustments.epargnePlus} €</p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Attendre / gagner en ancienneté
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={adjustments.anciennetePlus}
              onChange={(e) => updateAdjustment('anciennetePlus', e.target.value)}
              className="w-full"
            />
            <p className="mt-2 text-sm text-slate-300">+ {adjustments.anciennetePlus} an(s)</p>
          </div>
        </div>

        <div className="xl:col-span-5 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Avant / Après</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">Score actuel</p>
                <p className="mt-2 text-xl font-bold text-white">{result.score_confiance}%</p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="text-xs text-slate-400">Score projeté</p>
                <p className="mt-2 text-xl font-bold text-blue-300">{projected.projectedScore}%</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">Décision actuelle</p>
                <p className={`mt-2 text-lg font-bold ${result.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.decision}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">Décision projetée</p>
                <p className={`mt-2 text-lg font-bold ${projected.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {projected.decision}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">Taux actuel</p>
                <p className="mt-2 text-lg font-bold text-white">
                  {Number(result.finance?.taux_obtenu || 0).toFixed(2)}%
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-xs text-slate-400">Taux projeté</p>
                <p className="mt-2 text-lg font-bold text-emerald-300">
                  {projected.taux}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Lecture projetée</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {projected.projectedScore >= 75
                ? "Avec ces améliorations, le dossier deviendrait nettement plus solide et mieux positionné."
                : projected.projectedScore >= 55
                ? "Avec ces ajustements, le dossier deviendrait plus crédible et pourrait basculer vers une décision favorable."
                : "Même après amélioration, le dossier resterait encore fragile. Une progression supplémentaire serait utile."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}