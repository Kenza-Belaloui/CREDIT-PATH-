import React, { useState } from 'react';

export default function AmortizationTable({ schedule }) {
  const [isOpen, setIsOpen] = useState(false);

  const safeSchedule = Array.isArray(schedule) ? schedule : [];

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-[22px] border border-white/10 bg-slate-900/80 px-5 py-4 text-left text-white shadow-xl transition hover:border-blue-500/20 hover:bg-slate-900"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Détail</p>
          <h4 className="mt-1 text-base font-semibold text-white">
            Voir l’échéancier de remboursement
          </h4>
        </div>
        <span className="text-sm text-slate-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/85 shadow-xl">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Tableau</p>
            <h3 className="mt-1 text-lg font-bold text-white">Amortissement détaillé</h3>
          </div>

          <div className="max-h-[420px] overflow-auto">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="sticky top-0 bg-slate-950 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Mois</th>
                  <th className="px-5 py-4 text-right font-semibold">Mensualité</th>
                  <th className="px-5 py-4 text-right font-semibold">Intérêts</th>
                  <th className="px-5 py-4 text-right font-semibold">Capital</th>
                  <th className="px-5 py-4 text-right font-semibold">Restant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {safeSchedule.map((row) => (
                  <tr key={row.mois} className="transition hover:bg-white/5">
                    <td className="px-5 py-3 font-mono text-blue-300">{row.mois}</td>
                    <td className="px-5 py-3 text-right">{row.mensualite} €</td>
                    <td className="px-5 py-3 text-right text-rose-300">{row.interet} €</td>
                    <td className="px-5 py-3 text-right text-emerald-300">{row.principal} €</td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-300">
                      {row.restant} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}