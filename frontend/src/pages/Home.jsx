import React from 'react';
import AIAssistant from '../components/AIAssistant';

const fields = [
  {
    label: 'Revenu mensuel',
    name: 'revenu_mensuel',
    unit: '€',
    placeholder: 'Ex. 2500',
    help: 'Indiquez votre revenu net mensuel moyen. Cela permet d’estimer votre capacité de remboursement.',
    min: 0,
    step: 100,
  },
  {
    label: 'Dettes totales',
    name: 'dette_totale',
    unit: '€',
    placeholder: 'Ex. 5000',
    help: 'Renseignez le total de vos crédits et dettes en cours. Un niveau élevé augmente le risque perçu.',
    min: 0,
    step: 100,
  },
  {
    label: 'Épargne disponible',
    name: 'epargne',
    unit: '€',
    placeholder: 'Ex. 8000',
    help: 'Une épargne disponible renforce généralement la solidité du dossier et rassure sur votre résilience financière.',
    min: 0,
    step: 100,
  },
  {
    label: 'Ancienneté professionnelle',
    name: 'anciennete_emploi',
    unit: 'ans',
    placeholder: 'Ex. 3',
    help: 'Une situation professionnelle stable est souvent interprétée comme un signal positif de continuité de revenus.',
    min: 0,
    step: 1,
  },
  {
    label: 'Montant demandé',
    name: 'montant_demande',
    unit: '€',
    placeholder: 'Ex. 120000',
    help: 'Saisissez le montant total du financement souhaité.',
    min: 0,
    step: 1000,
  },
  {
    label: 'Durée du prêt',
    name: 'duree_pret',
    unit: 'mois',
    placeholder: 'Ex. 180',
    help: 'Une durée plus longue allège la mensualité, mais augmente en général le coût total du crédit.',
    min: 1,
    step: 1,
  },
];

function formatCurrency(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString('fr-FR')} €`;
}

function computeDebtRatio(formData) {
  const revenu = Number(formData?.revenu_mensuel || 0);
  const dette = Number(formData?.dette_totale || 0);

  if (!revenu) return 0;
  return (dette / revenu) * 100;
}

export default function Home({ formData, handleChange, handleSubmit, loading, result }) {
  const debtRatio = computeDebtRatio(formData);
  const savingsCoverage =
    Number(formData?.montant_demande || 0) > 0
      ? (Number(formData?.epargne || 0) / Number(formData?.montant_demande || 0)) * 100
      : 0;

  const insightCards = [
    {
      label: 'Revenu déclaré',
      value: formatCurrency(formData?.revenu_mensuel),
      note: 'Base d’analyse de solvabilité',
    },
    {
      label: 'Endettement indicatif',
      value: `${debtRatio.toFixed(1)}%`,
      note: debtRatio > 33 ? 'Zone de vigilance' : 'Niveau acceptable',
    },
    {
      label: 'Couverture par épargne',
      value: `${savingsCoverage.toFixed(1)}%`,
      note: 'Part du montant couverte',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 p-8 shadow-2xl md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.14),transparent_24%)]" />
        <div className="relative grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
              Analyse de crédit augmentée par IA
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Simulez un dossier de crédit avec une lecture{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                claire, rapide et professionnelle
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              CreditPath AI vous aide à interpréter un profil emprunteur comme une plateforme d’analyse moderne :
              évaluation automatisée, score de confiance, projection financière, recommandations pédagogiques et
              assistant conversationnel contextuel.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Décision simulée</p>
                <p className="mt-2 text-lg font-semibold text-white">Accord / Refus</p>
                <p className="mt-2 text-sm text-slate-400">Lecture immédiate de la compatibilité du dossier.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Projection financière</p>
                <p className="mt-2 text-lg font-semibold text-white">Mensualité & coût</p>
                <p className="mt-2 text-sm text-slate-400">Analyse du taux, du coût total et de l’amortissement.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Assistant intelligent</p>
                <p className="mt-2 text-lg font-semibold text-white">Explication contextuelle</p>
                <p className="mt-2 text-sm text-slate-400">Réponses ciblées selon votre simulation en cours.</p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="card-pro h-full p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Aperçu dossier</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Lecture instantanée du profil</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Avant même la simulation, obtenez une vue rapide des principaux indicateurs utilisés dans
                l’interprétation du dossier.
              </p>

              <div className="mt-6 space-y-4">
                {insightCards.map((card, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{card.label}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{card.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-sm font-medium text-amber-200">Conseil</p>
                <p className="mt-2 text-sm leading-6 text-amber-100/80">
                  Des valeurs réalistes et cohérentes rendent la simulation plus utile, plus lisible et plus crédible
                  pour votre démonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <section className="xl:col-span-8">
          <div className="glass-panel rounded-[28px] p-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Simulation</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Configuration du dossier</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Complétez les informations du profil financier pour lancer une évaluation structurée du risque
                  emprunteur et produire une lecture pédagogique du dossier.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Moteur</p>
                <p className="mt-1 text-sm font-semibold text-white">Scoring + analyse contextuelle</p>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="text-sm leading-7 text-blue-100">
                Cette simulation constitue une aide à l’analyse. Elle ne remplace pas la décision finale d’un établissement
                prêteur, mais elle met en évidence les forces, risques et leviers d’amélioration de manière beaucoup plus
                compréhensible pour l’utilisateur.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name} className="col-span-1">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {field.label}
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name] ?? ''}
                      onChange={handleChange}
                      required
                      min={field.min}
                      step={field.step}
                      className="glass-input rounded-2xl px-4 py-3.5 pr-14 text-sm outline-none"
                      placeholder={field.placeholder}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      {field.unit}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-slate-500">{field.help}</p>
                </div>
              ))}

              <div className="col-span-1 mt-2 md:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-semibold text-white">Avant de lancer l’analyse</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    Vérifiez la cohérence entre revenu, dettes, épargne, montant demandé et durée. Une simulation bien
                    renseignée est beaucoup plus pertinente à l’oral, dans un rapport ou lors d’une démonstration.
                  </p>
                </div>
              </div>

              <div className="col-span-1 mt-2 flex justify-end md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-2xl px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-all ${
                    loading ? 'cursor-not-allowed bg-slate-700 text-slate-300' : 'btn-primary'
                  }`}
                >
                  {loading ? 'Analyse en cours...' : "Lancer l'analyse"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside className="xl:col-span-4">
          <div className="space-y-6">
            <AIAssistant result={result} data={formData} />

            <div className="card-pro p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Lecture métier</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Repères d’interprétation</h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Endettement</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Un ratio trop élevé peut pénaliser la solvabilité perçue et réduire les chances d’accord.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Épargne</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Une réserve financière rassure sur la capacité à absorber un imprévu ou à constituer un apport.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Stabilité professionnelle</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Une ancienneté plus forte est généralement perçue comme un signal positif de stabilité des revenus.
                  </p>
                </div>
              </div>
            </div>

            {result && (
              <div
                className={`rounded-[24px] border p-6 shadow-xl ${
                  result.decision === 'ACCORDÉ'
                    ? 'border-emerald-500/25 bg-emerald-500/10'
                    : 'border-rose-500/25 bg-rose-500/10'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Résultat préliminaire</p>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div>
                    <p
                      className={`text-3xl font-bold ${
                        result.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {result.decision}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Confiance du modèle : <span className="font-semibold text-white">{result.score_confiance}%</span>
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                      result.decision === 'ACCORDÉ'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    Dossier analysé
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-200/90">
                  {result.decision === 'ACCORDÉ'
                    ? 'Le profil présente des signaux favorables dans cette simulation automatique. Consultez l’analyse détaillée pour comprendre les points forts du dossier et la compétitivité du taux estimé.'
                    : 'Le profil présente plusieurs points de vigilance dans cette simulation automatique. Consultez l’analyse détaillée pour identifier les leviers d’amélioration prioritaires.'}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}