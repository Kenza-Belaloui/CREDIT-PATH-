import React from 'react';

function getBankAdvice(data, result) {
  const revenu = Number(data?.revenu_mensuel || 0);
  const dette = Number(data?.dette_totale || 0);
  const epargne = Number(data?.epargne || 0);
  const anciennete = Number(data?.anciennete_emploi || 0);
  const montant = Number(data?.montant_demande || 0);

  const ratio = revenu > 0 ? (dette / revenu) * 100 : 100;
  const apport = montant > 0 ? (epargne / montant) * 100 : 0;
  const score = Number(result?.score_confiance || 0);

  if (score >= 75 && ratio <= 33 && apport >= 10 && anciennete >= 2) {
    return {
      category: 'Banques traditionnelles',
      level: 'Compatibilité élevée',
      tone: 'success',
      summary:
        "Votre profil semble suffisamment stable pour être présenté à des banques classiques avec de bonnes chances de crédibilité.",
      actors: ['BNP Paribas', 'LCL', 'Crédit Agricole', 'Société Générale'],
      badges: ['Revenus stables', 'Apport crédible', 'Risque modéré'],
    };
  }

  if (score >= 55 && ratio <= 40) {
    return {
      category: 'Courtier ou comparaison multi-banques',
      level: 'Compatibilité intermédiaire',
      tone: 'info',
      summary:
        "Votre dossier peut devenir compétitif, mais une comparaison des offres ou un passage par un courtier serait plus pertinent qu’une approche directe unique.",
      actors: ['Courtier', 'Banque principale', 'LCL', 'BNP Paribas'],
      badges: ['Profil améliorable', 'Négociation utile', 'Comparaison conseillée'],
    };
  }

  return {
    category: 'Attente recommandée avant dépôt',
    level: 'Compatibilité faible',
    tone: 'danger',
    summary:
      "Le dossier paraît encore trop fragile pour une demande classique immédiate. Il est préférable de renforcer le profil avant de cibler une banque.",
    actors: ['Attendre', 'Re-simuler', 'Réduire les dettes', 'Renforcer l’épargne'],
    badges: ['Risque élevé', 'Stabilité à renforcer', 'Demande à différer'],
  };
}

function toneClasses(tone) {
  switch (tone) {
    case 'success':
      return {
        card: 'border-emerald-500/20 bg-emerald-500/10',
        text: 'text-emerald-300',
        soft: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
      };
    case 'danger':
      return {
        card: 'border-rose-500/20 bg-rose-500/10',
        text: 'text-rose-300',
        soft: 'bg-rose-500/10 border-rose-500/20 text-rose-200',
      };
    default:
      return {
        card: 'border-blue-500/20 bg-blue-500/10',
        text: 'text-blue-300',
        soft: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
      };
  }
}

export default function BankAdvisor({ data, result }) {
  if (!data || !result) return null;

  const advice = getBankAdvice(data, result);
  const tone = toneClasses(advice.tone);

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
            Lecture indicative du type d’approche bancaire à privilégier selon le profil simulé.
          </p>
        </div>

        <div className={`rounded-2xl border px-4 py-3 ${tone.card}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Niveau</p>
          <p className={`mt-1 text-sm font-semibold ${tone.text}`}>{advice.level}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className={`rounded-[24px] border p-5 ${tone.card}`}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Catégorie conseillée
            </p>
            <h3 className={`mt-2 text-xl font-bold ${tone.text}`}>
              {advice.category}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              {advice.summary}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {advice.badges.map((badge, index) => (
              <span
                key={index}
                className={`rounded-full border px-3 py-1.5 text-xs ${tone.soft}`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Exemples indicatifs
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {advice.actors.map((actor, index) => (
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
              Cette orientation n’est pas une recommandation bancaire officielle. Elle sert à
              positionner le dossier et à guider la stratégie de présentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}