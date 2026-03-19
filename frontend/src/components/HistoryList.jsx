import React from 'react';

export default function HistoryList({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-2xl">
          🗂️
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">Aucune simulation enregistrée</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
          Dès qu’une simulation est lancée, elle apparaîtra ici avec sa date, son montant,
          sa durée, la décision et le score de confiance.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70 shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Montant</th>
              <th className="px-6 py-4 font-semibold">Durée</th>
              <th className="px-6 py-4 font-semibold">Décision</th>
              <th className="px-6 py-4 font-semibold">Confiance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.map((item, index) => (
              <tr key={index} className="transition hover:bg-white/5">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-white">
                    {new Date(item.date_simulation).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {new Date(item.date_simulation).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-white">
                  {Number(item.montant_demande || 0).toLocaleString('fr-FR')} €
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {item.duree_pret} mois
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                      item.decision === 'ACCORDÉ'
                        ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                        : 'border-rose-500/25 bg-rose-500/10 text-rose-300'
                    }`}
                  >
                    {item.decision}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-blue-300">
                  {item.score_confiance}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}