import React from 'react';
import HistoryList from '../components/HistoryList';

export default function History({ history }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_24%)]" />
        <div className="relative">
          <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Historique utilisateur
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Suivi des{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              simulations passées
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            Consultez les dossiers déjà simulés, comparez les décisions obtenues et gardez une
            trace structurée de l’évolution de vos scénarios de financement.
          </p>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6 shadow-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Archive</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Historique des dossiers</h2>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Cette section recense les dernières simulations enregistrées pour votre compte.
          </p>
        </div>

        <HistoryList history={history} />
      </section>
    </div>
  );
}