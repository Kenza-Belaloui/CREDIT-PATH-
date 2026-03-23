import React from 'react';

function getProfileLevel(score) {
  if (score >= 85) return { label: "Premium", color: "text-emerald-400" };
  if (score >= 70) return { label: "Solide", color: "text-green-400" };
  if (score >= 55) return { label: "Correct", color: "text-blue-400" };
  if (score >= 40) return { label: "Fragile", color: "text-yellow-400" };
  return { label: "Risque élevé", color: "text-rose-400" };
}

export default function BorrowerProfile({ data, result }) {
  if (!data || !result) return null;

  const revenu = data.revenu_mensuel || 0;
  const dette = data.dette_totale || 0;
  const epargne = data.epargne || 0;
  const anciennete = data.anciennete_emploi || 0;
  const montant = data.montant_demande || 1;

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 0;
  const couverture = (epargne / montant) * 100;

  // Score simplifié (logique pro)
  let score = result.score_confiance;

  if (ratio > 35) score -= 10;
  if (couverture < 10) score -= 5;
  if (anciennete < 2) score -= 5;

  score = Math.max(0, Math.min(100, score));

  const level = getProfileLevel(score);

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
        Profil emprunteur
      </p>

      <div className="flex items-center justify-between mt-3">
        <h2 className="text-xl font-bold text-white">
          Analyse globale du dossier
        </h2>
        <span className={`text-sm font-semibold ${level.color}`}>
          {level.label}
        </span>
      </div>

      {/* Score */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2 text-slate-300">
          <span>Score global</span>
          <span className="font-bold text-white">{score}%</span>
        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Indicateurs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div>
          <p className="text-xs text-slate-500">Endettement</p>
          <p className={`font-bold ${ratio > 33 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {ratio.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Épargne</p>
          <p className="font-bold text-blue-400">
            {couverture.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Ancienneté</p>
          <p className="font-bold text-white">
            {anciennete} ans
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Décision IA</p>
          <p className={`font-bold ${result.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {result.decision}
          </p>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-sm text-slate-300 leading-relaxed">
          {score > 70
            ? "Votre profil est globalement solide. Vous avez de bonnes chances d’obtenir un crédit avec des conditions intéressantes."
            : score > 50
            ? "Votre profil est correct mais peut être amélioré pour maximiser vos chances d’acceptation."
            : "Votre profil présente plusieurs points de risque. Une amélioration est recommandée avant toute demande."}
        </p>
      </div>
    </div>
  );
}