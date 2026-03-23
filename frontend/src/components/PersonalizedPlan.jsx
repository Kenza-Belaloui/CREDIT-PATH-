import React from 'react';

function buildTimeline(data, result) {
  const revenu = Number(data?.revenu_mensuel || 0);
  const dette = Number(data?.dette_totale || 0);
  const epargne = Number(data?.epargne || 0);
  const anciennete = Number(data?.anciennete_emploi || 0);
  const montant = Number(data?.montant_demande || 0);

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 0;
  const apport = montant > 0 ? (epargne / montant) * 100 : 0;

  const items = [];

  if (ratio > 35) {
    items.push({
      period: 'Maintenant',
      title: 'Réduire le niveau d’endettement',
      description: "Votre ratio d’endettement est élevé. La priorité est de rembourser une partie des dettes avant une nouvelle demande.",
      tone: 'danger',
    });
    items.push({
      period: '6 à 12 mois',
      title: 'Stabiliser la situation financière',
      description: "Une baisse progressive des charges renforcera la crédibilité du dossier auprès d’un établissement prêteur.",
      tone: 'warning',
    });
  }

  if (apport < 10) {
    items.push({
      period: '6 mois',
      title: 'Constituer davantage d’épargne',
      description: "Un apport plus proche de 10% du montant demandé améliore nettement la qualité perçue du dossier.",
      tone: 'info',
    });
  }

  if (anciennete < 2) {
    items.push({
      period: '1 à 3 ans',
      title: 'Gagner en stabilité professionnelle',
      description: "Une ancienneté plus forte rassure généralement davantage sur la continuité des revenus.",
      tone: 'violet',
    });
  }

  if (result?.decision === 'ACCORDÉ' && ratio <= 33 && apport >= 10 && anciennete >= 2) {
    items.push({
      period: 'Maintenant',
      title: 'Dossier prêt à être présenté',
      description: "Votre profil est déjà bien positionné. Vous pouvez viser une demande immédiate ou chercher à négocier de meilleures conditions.",
      tone: 'success',
    });
  }

  if (items.length === 0) {
    items.push({
      period: 'À court terme',
      title: 'Consolider les indicateurs',
      description: "Le dossier est globalement correct, mais une légère amélioration de l’épargne ou de la stabilité renforcerait encore la simulation.",
      tone: 'info',
    });
  }

  return items;
}

function getBankOrientation(data, result) {
  const revenu = Number(data?.revenu_mensuel || 0);
  const dette = Number(data?.dette_totale || 0);
  const epargne = Number(data?.epargne || 0);
  const anciennete = Number(data?.anciennete_emploi || 0);
  const montant = Number(data?.montant_demande || 0);

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 0;
  const apport = montant > 0 ? (epargne / montant) * 100 : 0;

  if (result?.decision === 'ACCORDÉ' && ratio <= 33 && anciennete >= 2 && apport >= 10) {
    return {
      title: 'Orientation bancaire favorable',
      description:
        "Votre profil semble compatible avec une approche auprès de banques traditionnelles ou d’un courtier pour comparer les meilleures conditions.",
      examples: 'Exemples indicatifs : BNP Paribas, LCL, Crédit Agricole, Société Générale.',
      tone: 'success',
    };
  }

  if (ratio > 35 || anciennete < 2) {
    return {
      title: 'Mieux vaut différer la demande',
      description:
        "Votre profil gagnerait à être renforcé avant de cibler une banque classique. Une période d’attente et d’amélioration est recommandée.",
      examples: "Approche conseillée : attendre, assainir le dossier, puis re-simuler avant tout dépôt.",
      tone: 'danger',
    };
  }

  return {
    title: 'Approche progressive recommandée',
    description:
      "Le profil peut devenir plus compétitif avec quelques ajustements. Une approche via comparaison bancaire ou courtier peut être pertinente.",
    examples: 'Exemples indicatifs : LCL, BNP Paribas, courtier, banque principale.',
    tone: 'info',
  };
}

function toneClasses(tone) {
  switch (tone) {
    case 'success':
      return 'border-emerald-500/20 bg-emerald-500/10';
    case 'danger':
      return 'border-rose-500/20 bg-rose-500/10';
    case 'warning':
      return 'border-amber-500/20 bg-amber-500/10';
    case 'violet':
      return 'border-violet-500/20 bg-violet-500/10';
    default:
      return 'border-blue-500/20 bg-blue-500/10';
  }
}

export default function PersonalizedPlan({ data, result }) {
  if (!data || !result) return null;

  const timeline = buildTimeline(data, result);
  const bank = getBankOrientation(data, result);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Plan personnalisé
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">
          Stratégie recommandée dans le temps
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Voici la trajectoire conseillée pour améliorer ou consolider votre dossier.
        </p>

        <div className="mt-6 space-y-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`rounded-[22px] border p-4 ${toneClasses(item.tone)}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {item.title}
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

      <div className="xl:col-span-4 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Orientation bancaire
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">
          Type d’approche conseillé
        </h2>

        <div className={`mt-5 rounded-[22px] border p-4 ${toneClasses(bank.tone)}`}>
          <h3 className="text-base font-semibold text-white">{bank.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {bank.description}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {bank.examples}
          </p>
        </div>

        <div className="mt-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">Note importante</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Cette orientation est indicative. Elle ne constitue pas une recommandation bancaire officielle,
            mais une aide de positionnement selon le profil simulé.
          </p>
        </div>
      </div>
    </div>
  );
}