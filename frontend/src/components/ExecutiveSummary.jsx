import React from 'react';

function buildExecutiveSummary(data, result) {
  const revenu = Number(data?.revenu_mensuel || 0);
  const dette = Number(data?.dette_totale || 0);
  const epargne = Number(data?.epargne || 0);
  const anciennete = Number(data?.anciennete_emploi || 0);
  const montant = Number(data?.montant_demande || 0);
  const score = Number(result?.score_confiance || 0);

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 100;
  const apport = montant > 0 ? (epargne / montant) * 100 : 0;

  let tone = 'info';
  let headline = 'Dossier à consolider';
  let summary =
    "Le profil présente une base exploitable mais nécessite encore quelques ajustements pour devenir plus compétitif.";
  let strength = 'La demande reste analysable avec des éléments déjà exploitables.';
  let weakness = 'Le dossier manque encore de solidité sur certains indicateurs clés.';
  let recommendation = 'Consolider l’épargne, réduire les charges et re-simuler à court terme.';

  if (result?.decision === 'ACCORDÉ' && score >= 75 && ratio <= 33 && apport >= 10 && anciennete >= 2) {
    tone = 'success';
    headline = 'Dossier solide et bien positionné';
    summary =
      "Le profil paraît crédible pour une demande de crédit et peut viser une présentation plus confiante auprès d’un établissement bancaire.";
    strength = 'Le dossier combine une décision favorable, un score élevé et un niveau de risque maîtrisé.';
    weakness = 'Le principal enjeu n’est plus l’acceptation mais l’optimisation des conditions.';
    recommendation = 'Comparer plusieurs offres et négocier le taux ou les frais.';
  } else if (ratio > 35 || score < 55) {
    tone = 'danger';
    headline = 'Dossier encore trop fragile';
    summary =
      "Le profil présente plusieurs signaux de risque qui rendent une demande immédiate moins pertinente dans cette simulation.";
    strength = 'La situation peut encore évoluer positivement avec une stratégie d’amélioration.';
    weakness = 'Le niveau d’endettement, le score global ou l’apport limitent fortement la qualité du dossier.';
    recommendation = 'Attendre, réduire les dettes, renforcer l’épargne puis relancer une simulation.';
  } else if (anciennete < 2 || apport < 10) {
    tone = 'warning';
    headline = 'Dossier correct mais prématuré';
    summary =
      "Le profil n’est pas bloqué, mais il gagnerait en crédibilité avec davantage de stabilité ou un meilleur apport.";
    strength = 'Le dossier possède un potentiel réel d’amélioration à court ou moyen terme.';
    weakness = 'La stabilité professionnelle ou la couverture par l’épargne restent encore trop limitées.';
    recommendation = 'Attendre quelques mois à quelques années selon le cas et améliorer les indicateurs faibles.';
  }

  return { tone, headline, summary, strength, weakness, recommendation };
}

function toneClasses(tone) {
  switch (tone) {
    case 'success':
      return {
        wrapper: 'border-emerald-500/20 bg-emerald-500/10',
        badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
        title: 'text-emerald-300',
      };
    case 'danger':
      return {
        wrapper: 'border-rose-500/20 bg-rose-500/10',
        badge: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
        title: 'text-rose-300',
      };
    case 'warning':
      return {
        wrapper: 'border-amber-500/20 bg-amber-500/10',
        badge: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
        title: 'text-amber-300',
      };
    default:
      return {
        wrapper: 'border-blue-500/20 bg-blue-500/10',
        badge: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
        title: 'text-blue-300',
      };
  }
}

export default function ExecutiveSummary({ data, result }) {
  if (!data || !result) return null;

  const content = buildExecutiveSummary(data, result);
  const tone = toneClasses(content.tone);

  return (
    <div className={`rounded-[28px] border p-6 shadow-xl ${tone.wrapper}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Résumé exécutif
          </p>
          <h2 className={`mt-2 text-2xl font-bold ${tone.title}`}>
            {content.headline}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-100">
            {content.summary}
          </p>
        </div>

        <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${tone.badge}`}>
          {result.decision} · {result.score_confiance}%
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Point fort</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.strength}</p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Point faible</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.weakness}</p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-950/35 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Action prioritaire</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{content.recommendation}</p>
        </div>
      </div>
    </div>
  );
}