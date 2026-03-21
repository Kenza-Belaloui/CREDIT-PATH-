import React from 'react';
import { useNavigate } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

const fields = [
  { label: 'Revenu mensuel', name: 'revenu_mensuel', unit: '€', placeholder: '2500', min: 0, step: 100 },
  { label: 'Dettes totales', name: 'dette_totale', unit: '€', placeholder: '5000', min: 0, step: 100 },
  { label: 'Épargne', name: 'epargne', unit: '€', placeholder: '8000', min: 0, step: 100 },
  { label: 'Ancienneté', name: 'anciennete_emploi', unit: 'ans', placeholder: '3', min: 0, step: 1 },
  { label: 'Montant demandé', name: 'montant_demande', unit: '€', placeholder: '120000', min: 0, step: 1000 },
  { label: 'Durée', name: 'duree_pret', unit: 'mois', placeholder: '180', min: 1, step: 1 },
];

function ResultModal({ result, onClose }) {
  const navigate = useNavigate();

  if (!result) return null;

  const isApproved = result.decision === 'ACCORDÉ';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Résultat de simulation</p>
            <h3 className={`mt-2 text-3xl font-bold ${isApproved ? 'text-emerald-400' : 'text-rose-400'}`}>
              {result.decision}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Score de confiance : <span className="font-semibold text-white">{result.score_confiance}%</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Fermer
          </button>
        </div>

        <div className={`mt-5 rounded-2xl border p-4 ${isApproved ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
          <p className="text-sm leading-7 text-slate-200">
            {isApproved
              ? "Le dossier présente des signaux favorables dans cette simulation."
              : "Le dossier présente plusieurs points de vigilance dans cette simulation."}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Causes principales</p>
          <div className="mt-3 space-y-3">
            {(result.plan_action || []).slice(0, 4).map((item, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => {
              onClose();
              navigate('/dashboard');
            }}
            className="btn-primary flex-1 rounded-2xl px-5 py-3.5 text-sm font-semibold"
          >
            Voir l’analyse détaillée
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10"
          >
            Rester ici
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={`mt-2 text-xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

export default function Home({
  formData,
  handleChange,
  handleSubmit,
  loading,
  result,
  showDecisionModal,
  setShowDecisionModal,
}) {
  const debtRatio =
    Number(formData?.revenu_mensuel || 0) > 0
      ? (Number(formData?.dette_totale || 0) / Number(formData?.revenu_mensuel || 1)) * 100
      : 0;

  return (
    <>
      {showDecisionModal && (
        <ResultModal result={result} onClose={() => setShowDecisionModal(false)} />
      )}

      <div className="space-y-6 animate-fade-in">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-6 shadow-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
                Simulation rapide
              </div>

              <h1 className="mt-4 text-2xl font-bold leading-tight text-white md:text-4xl">
                Évaluez un dossier de crédit en quelques champs
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Saisissez l’essentiel, lancez la simulation, puis consultez la décision, les causes
                principales et l’analyse détaillée.
              </p>
            </div>

            {result && (
              <div className={`rounded-2xl border px-4 py-3 ${result.decision === 'ACCORDÉ' ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Dernier résultat</p>
                <p className={`mt-1 text-lg font-bold ${result.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.decision}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="glass-panel rounded-[28px] p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Formulaire</p>
                  <h2 className="mt-1 text-xl font-bold text-white">Nouvelle simulation</h2>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                  6 champs essentiels
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
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
                        placeholder={field.placeholder}
                        className="glass-input rounded-2xl px-4 py-3 pr-14 text-sm outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                        {field.unit}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="md:col-span-2 mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`rounded-2xl px-6 py-3.5 text-sm font-semibold ${
                      loading ? 'cursor-not-allowed bg-slate-700 text-slate-300' : 'btn-primary'
                    }`}
                  >
                    {loading ? 'Analyse en cours...' : "Lancer la simulation"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <QuickStat
                label="Revenu"
                value={`${Number(formData?.revenu_mensuel || 0).toLocaleString('fr-FR')} €`}
                accent="text-white"
              />
              <QuickStat
                label="Endettement"
                value={`${debtRatio.toFixed(1)}%`}
                accent={debtRatio > 33 ? 'text-rose-400' : 'text-emerald-400'}
              />
              <QuickStat
                label="Montant demandé"
                value={`${Number(formData?.montant_demande || 0).toLocaleString('fr-FR')} €`}
                accent="text-blue-400"
              />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-6">
            {result && (
              <div className={`rounded-[24px] border p-5 shadow-xl ${result.decision === 'ACCORDÉ' ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Résultat</p>
                <h3 className={`mt-2 text-2xl font-bold ${result.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.decision}
                </h3>
                <p className="mt-2 text-sm text-slate-200">
                  Confiance du modèle : <span className="font-semibold text-white">{result.score_confiance}%</span>
                </p>

                <button
                  onClick={() => setShowDecisionModal(true)}
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  Voir les causes
                </button>
              </div>
            )}

            <div className="rounded-[24px] border border-white/10 bg-slate-900/75 p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Assistant</p>
                  <h3 className="mt-1 text-base font-bold text-white">Aide rapide</h3>
                </div>
              </div>

              <AIAssistant result={result} data={formData} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}