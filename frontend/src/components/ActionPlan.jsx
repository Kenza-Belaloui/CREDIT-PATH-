import React from 'react';

export default function ActionPlan({ actions, decision }) {
  const safeActions =
    actions && actions.length > 0
      ? actions
      : ['Analyse en cours de génération.'];

  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const badgeClass =
    decision === 'ACCORDÉ'
      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
      : 'border-rose-500/20 bg-rose-500/10 text-rose-300';

  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.443m-1.5.443c.995 0 1.973-.223 2.85-.63m2.85-6.364a3 3 0 00-4.95-3.003M6.75 6.75a3 3 0 00-4.95 3.003m15.45 6.365a3 3 0 01-4.95 3.003m-10.5 0a3 3 0 004.95 3.003m2.25-10.5a3 3 0 014.95-3.003M7.5 15h9"
              />
            </svg>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Actions</p>
            <h3 className="mt-1 text-lg font-bold text-white">Recommandations stratégiques</h3>
            <p className="mt-1 text-sm text-slate-400">
              Suggestions générées pour améliorer ou consolider le dossier.
            </p>
          </div>
        </div>

        <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${badgeClass}`}>
          {decision || 'Décision indisponible'}
        </div>
      </div>

      <div className="space-y-4">
        {safeActions.map((conseil, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-[20px] border border-white/10 bg-white/5 p-4 transition hover:border-blue-500/20 hover:bg-white/[0.07]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
              {index + 1}
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {formatText(conseil)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}