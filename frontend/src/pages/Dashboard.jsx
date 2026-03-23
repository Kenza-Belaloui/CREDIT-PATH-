import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import FinancialCharts from '../components/FinancialCharts';
import RateComparator from '../components/RateComparator';
import AmortizationTable from '../components/AmortizationTable';
import ActionPlan from '../components/ActionPlan';
import BorrowerProfile from '../components/BorrowerProfile';
import PersonalizedPlan from '../components/PersonalizedPlan';
import ImprovementSimulator from '../components/ImprovementSimulator';

function StatCard({ label, value, tone = 'default', helper }) {
  const toneMap = {
    default: 'border-white/10 bg-slate-900/70 text-white',
    success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    danger: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
    info: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    violet: 'border-violet-500/20 bg-violet-500/10 text-violet-300',
  };

  return (
    <div className={`rounded-[24px] border p-5 shadow-lg ${toneMap[tone]}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      {helper && <p className="mt-2 text-sm leading-6 text-slate-300">{helper}</p>}
    </div>
  );
}

export default function Dashboard({ result, formData }) {
  const formatCurrency = (value) => {
    const number = Number(value || 0);
    return `${number.toLocaleString('fr-FR')} €`;
  };

  const formatPercent = (value) => {
    const number = Number(value || 0);
    return `${number.toFixed(1)}%`;
  };

  if (!result) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl">
          📈
        </div>
        <h2 className="mt-6 text-3xl font-bold text-white">Aucune analyse disponible</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          Lancez d’abord une simulation depuis la page d’accueil pour afficher ici
          les statistiques, les graphes, le comparateur de taux et les recommandations.
        </p>
      </div>
    );
  }

  const generatePDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 38, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('CreditPath AI', 105, 18, null, null, 'center');

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text("Rapport de simulation de crédit", 105, 28, null, null, 'center');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 15, 48);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFIL', 15, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(`Revenu mensuel : ${formData.revenu_mensuel} €`, 15, 69);
      doc.text(`Dettes : ${formData.dette_totale} €`, 15, 77);
      doc.text(`Épargne : ${formData.epargne} €`, 15, 85);
      doc.text(`Montant demandé : ${formData.montant_demande} €`, 15, 93);
      doc.text(`Durée : ${formData.duree_pret} mois`, 15, 101);

      if (result.decision === 'ACCORDÉ') {
        doc.setFillColor(220, 252, 231);
        doc.rect(15, 110, 180, 16, 'F');
        doc.setTextColor(21, 128, 61);
      } else {
        doc.setFillColor(254, 226, 226);
        doc.rect(15, 110, 180, 16, 'F');
        doc.setTextColor(185, 28, 28);
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`DÉCISION : ${result.decision} — Confiance : ${result.score_confiance}%`, 20, 120);

      doc.setTextColor(0, 0, 0);
      doc.text('ÉCHÉANCIER (12 premières lignes)', 15, 138);

      const tableData = result.finance?.tableau_amortissement || [];

      autoTable(doc, {
        startY: 143,
        head: [['Mois', 'Mensualité', 'Intérêts', 'Capital', 'Restant']],
        body: tableData.slice(0, 12).map((row) => [
          row.mois,
          `${row.mensualite} €`,
          `${row.interet} €`,
          `${row.principal} €`,
          `${row.restant} €`,
        ]),
        theme: 'grid',
        headStyles: { fillColor: [30, 41, 59] },
        styles: { fontSize: 9 },
      });

      doc.setFontSize(8);
      doc.setTextColor(130);
      doc.text('Document généré automatiquement par CreditPath AI.', 105, 284, null, null, 'center');

      doc.save('CreditPath_Analyse.pdf');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la génération du PDF.");
    }
  };

  const monthlyIncome = Number(formData?.revenu_mensuel || 0);
  const totalDebt = Number(formData?.dette_totale || 0);
  const savings = Number(formData?.epargne || 0);
  const requestedAmount = Number(formData?.montant_demande || 0);
  const duration = Number(formData?.duree_pret || 0);

  const debtRatio = monthlyIncome > 0 ? (totalDebt / monthlyIncome) * 100 : 0;
  const savingsCoverage = requestedAmount > 0 ? (savings / requestedAmount) * 100 : 0;
  const mensualite = Number(result.finance?.mensualite || 0);
  const coutTotal = Number(result.finance?.cout_total || 0);
  const economie = Number(result.finance?.economie || 0);
  const tauxObtenu = Number(result.finance?.taux_obtenu || 0);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
              Analyse détaillée
            </div>

            <h1 className="mt-4 text-2xl font-bold text-white md:text-4xl">
              Lecture financière du dossier
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              Retrouvez les principaux indicateurs de votre simulation :
              décision, score, taux estimé, mensualité, coût du crédit et visualisations.
            </p>
          </div>

          <button
            onClick={generatePDF}
            className="btn-primary rounded-2xl px-5 py-3.5 text-sm font-semibold"
          >
            Télécharger le PDF
          </button>
        </div>
      </section>

      <section>
        <BorrowerProfile data={formData} result={result} />
      </section>

      <section>
        <PersonalizedPlan data={formData} result={result} />
      </section>

      <section>
          <ImprovementSimulator data={formData} result={result} />
       </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Décision"
          value={result.decision}
          tone={result.decision === 'ACCORDÉ' ? 'success' : 'danger'}
          helper={result.decision === 'ACCORDÉ' ? 'Le dossier ressort comme favorable.' : 'Le dossier présente plusieurs risques.'}
        />
        <StatCard
          label="Confiance"
          value={`${result.score_confiance}%`}
          tone="info"
          helper="Niveau de confiance du modèle"
        />
        <StatCard
          label="Mensualité"
          value={formatCurrency(mensualite)}
          tone="violet"
          helper="Montant mensuel estimé"
        />
        <StatCard
          label="Taux obtenu"
          value={`${tauxObtenu.toFixed(2)}%`}
          tone="default"
          helper="Taux estimé pour cette simulation"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Revenu</p>
          <p className="mt-2 text-xl font-bold text-white">{formatCurrency(monthlyIncome)}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Endettement</p>
          <p className={`mt-2 text-xl font-bold ${debtRatio > 33 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {formatPercent(debtRatio)}
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Couverture épargne</p>
          <p className="mt-2 text-xl font-bold text-cyan-300">{formatPercent(savingsCoverage)}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Coût total intérêts</p>
          <p className="mt-2 text-xl font-bold text-white">{formatCurrency(coutTotal)}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <div className="2xl:col-span-8 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Graphiques</p>
            <h2 className="mt-2 text-xl font-bold text-white">Statistiques et visualisations</h2>
            <p className="mt-2 text-sm text-slate-400">
              Vue d’ensemble du budget, du risque, du remboursement et du profil financier.
            </p>
          </div>

          <FinancialCharts data={formData} result={result} />
        </div>

        <div className="2xl:col-span-4 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Synthèse</p>
            <h2 className="mt-2 text-xl font-bold text-white">Lecture rapide</h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Économie estimée</p>
                <p className="mt-2 text-lg font-bold text-emerald-400">{formatCurrency(economie)}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Montant demandé</p>
                <p className="mt-2 text-lg font-bold text-white">{formatCurrency(requestedAmount)}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Durée du prêt</p>
                <p className="mt-2 text-lg font-bold text-white">{duration} mois</p>
              </div>
            </div>
          </div>

          <RateComparator finance={result.finance} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Amortissement</p>
          <h2 className="mt-2 text-xl font-bold text-white">Détail du remboursement</h2>
          <p className="mt-2 text-sm text-slate-400">
            Consultez l’évolution des mensualités, des intérêts et du capital restant dû.
          </p>
        </div>

        <AmortizationTable schedule={result.finance?.tableau_amortissement} />
      </section>

      <section className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Causes et actions</p>
          <h2 className="mt-2 text-xl font-bold text-white">Recommandations</h2>
          <p className="mt-2 text-sm text-slate-400">
            Principaux leviers d’amélioration ou points forts du dossier.
          </p>
        </div>

        <ActionPlan actions={result.plan_action} decision={result.decision} />
      </section>
    </div>
  );
}