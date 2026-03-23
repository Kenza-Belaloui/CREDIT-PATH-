import React from 'react';

function levelColor(level) {
  switch (level) {
    case 'Premium':
      return 'text-emerald-400';
    case 'Solide':
      return 'text-green-400';
    case 'Correct':
      return 'text-blue-400';
    case 'Fragile':
      return 'text-yellow-400';
    default:
      return 'text-rose-400';
  }
}

export default function BorrowerProfile({ result }) {
  if (!result?.profil_emprunteur) return null;

  const profile = result.profil_emprunteur;

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
        Profil emprunteur
      </p>

      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Analyse globale du dossier</h2>
        <span className={`text-sm font-semibold ${levelColor(profile.niveau)}`}>
          {profile.niveau}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm text-slate-300">
          <span>Score global</span>
          <span className="font-bold text-white">{profile.score_global}%</span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
            style={{ width: `${profile.score_global}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <p className="text-xs text-slate-500">Endettement</p>
          <p className={`font-bold ${profile.ratio_endettement > 33 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {profile.ratio_endettement}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Apport</p>
          <p className="font-bold text-blue-400">
            {profile.couverture_apport}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Ancienneté</p>
          <p className="font-bold text-white">
            {profile.stabilite_professionnelle} ans
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Décision IA</p>
          <p className={`font-bold ${profile.decision === 'ACCORDÉ' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {profile.decision}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm leading-relaxed text-slate-300">
          {profile.resume}
        </p>
      </div>
    </div>
  );
}