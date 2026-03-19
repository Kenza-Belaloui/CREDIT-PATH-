import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import FinancialCharts from '../components/FinancialCharts';
import RateComparator from '../components/RateComparator';
import AmortizationTable from '../components/AmortizationTable';
import ActionPlan from '../components/ActionPlan';

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
          📊
        </div>
        <h2 className="mt-6 text-3xl font-bold text-white">Aucune analyse disponible</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          Cette page centralise les indicateurs de votre simulation : décision, score, projection de remboursement,
          comparaison de taux et recommandations d’amélioration. Lancez d’abord une simulation pour alimenter
          automatiquement ce tableau de bord.
        </p>
      </div>
    );
  }

  const generatePDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 42, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('CreditPath AI', 105, 18, null, null, 'center');

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text("Rapport d'analyse financière", 105, 28, null, null, 'center');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Date du rapport : ${new Date().toLocaleDateString('fr-FR')}`, 15, 52);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFIL UTILISATEUR', 15, 64);
      doc.setFont('helvetica', 'normal');
      doc.text(`• Revenu mensuel : ${formData.revenu_mensuel} €`, 15, 72);
      doc.text(`• Dettes déclarées : ${formData.dette_totale} €`, 15, 80);
      doc.text(`• Épargne : ${formData.epargne} €`, 15, 88);
      doc.text(`• Ancienneté professionnelle : ${formData.anciennete_emploi} an(s)`, 15, 96);
      doc.text(`• Demande : ${formData.montant_demande} € sur ${formData.duree_pret} mois`, 15, 104);

      if (result.decision === 'ACCORDÉ') {
        doc.setFillColor(220, 252, 231);
        doc.rect(15, 112, 180, 16, 'F');
        doc.setTextColor(21, 128, 61);
        doc.setFont('helvetica', 'bold');
        doc.text(`DÉCISION : ACCORDÉ — Confiance : ${result.score_confiance}%`, 20, 122);
      } else {
        doc.setFillColor(254, 226, 226);
        doc.rect(15, 112, 180, 16, 'F');
        doc.setTextColor(185, 28, 28);
        doc.setFont('helvetica', 'bold');
        doc.text(`DÉCISION : REFUSÉ — Confiance : ${result.score_confiance}%`, 20, 122);
      }

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text("ÉCHÉANCIER (12 premières lignes)", 15, 140);

      const tableData = result.finance?.tableau_amortissement || [];

      autoTable(doc, {
        startY: 145,
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
      doc.setTextColor(150);
      doc.text('Document généré automatiquement par CreditPath AI.', 105, 284, null, null, 'center');

      doc.save('CreditPath_Analyse.pdf');
    } catch (error) {
      console.error('ERREUR PDF DÉTAILLÉE :', error);
      alert("Erreur lors de la génération du PDF.");
    }
  };

  const monthlyIncome = Number(formData?.revenu_mensuel || 0);
  const totalDebt = Number(formData?.dette_totale || 0);
  const savings = Number(formData?.epargne || 0);
  const requestedAmount = Number(formData?.montant_demande || 0);
  const duration = Number(formData?.duree_pret || 0);
  const jobSeniority = Number(formData?.anciennete_emploi || 0);

  const debtRatio = monthlyIncome > 0 ? (totalDebt / monthlyIncome) * 100 : 0;
  const savingsCoverage = requestedAmount > 0 ? (savings / requestedAmount) * 100 : 0;

  const summaryCards = [
    {
      title: 'Décision IA',
      value: result.decision,
      description:
        result.decision === 'ACCORDÉ'
          ? 'Le dossier présente un niveau de compatibilité favorable dans cette simulation.'
          : 'Le dossier présente plusieurs signaux de vigilance dans cette simulation.',
      accent:
        result.decision === 'ACCORDÉ'
          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
          : 'border-rose-500/25 bg-rose-500/10 text-rose-300',
    },
    {
      title: 'Confiance du modèle',
      value: `${result.score_confiance}%`,
      description: "Niveau de confiance de l'algorithme dans l'évaluation produite.",
      accent: 'border-blue-500/25 bg-blue-500/10 text-blue-300',
    },
    {
      title: 'Ancienneté professionnelle',
      value: `${jobSeniority} an${jobSeniority > 1 ? 's' : ''}`,
      description: 'Indicateur de stabilité professionnelle utilisé dans la lecture globale du profil.',
      accent: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
    },
    {
      title: 'Épargne mobilisable',
      value: formatCurrency(savings),
      description: `Soit ${formatPercent(savingsCoverage)} du montant demandé.`,
      accent: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-300',
    },
  ];

  const financeCards = [
    {
      title: 'Mensualité estimée',
      value: formatCurrency(result.finance?.mensualite),
      note: 'Paiement mensuel simulé',
    },
    {
      title: 'Coût total des intérêts',
      value: formatCurrency(result.finance?.cout_total),
      note: 'Somme des intérêts sur la durée',
    },
    {
      title: 'Taux estimé',
      value: `${Number(result.finance?.taux_obtenu || 0).toFixed(2)}%`,
      note: 'Positionnement du dossier',
    },
    {
      title: 'Économie estimée',
      value: formatCurrency(result.finance?.economie),
      note: 'Vs moyenne de référence',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.14),transparent_22%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
              Dashboard analytique
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Analyse approfondie du{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                dossier emprunteur
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Cette page centralise les indicateurs-clés de votre simulation : qualité perçue du dossier, score de
              confiance, compétitivité du taux estimé, structure du remboursement et recommandations d’action.
            </p>
          </div>

          <button
            onClick={generatePDF}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Télécharger le PDF
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <div key={index} className={`rounded-[24px] border p-5 shadow-lg ${card.accent}`}>
            <p className="text-xs uppercase tracking-[0.22em] opacity-80">{card.title}</p>
            <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-200/85">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Revenu mensuel</p>
          <p className="mt-3 text-2xl font-bold text-white">{formatCurrency(monthlyIncome)}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Dettes déclarées</p>
          <p className="mt-3 text-2xl font-bold text-white">{formatCurrency(totalDebt)}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Taux d’endettement</p>
          <p className="mt-3 text-2xl font-bold text-white">{formatPercent(debtRatio)}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Durée demandée</p>
          <p className="mt-3 text-2xl font-bold text-white">{duration} mois</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6 shadow-xl">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Synthèse financière</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Vue exécutive du financement</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              Ces indicateurs résument les conséquences financières principales de la simulation sur la durée du prêt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {financeCards.map((card, index) => (
            <div key={index} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{card.title}</p>
              <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
              <p className="mt-2 text-sm text-slate-400">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <div className="2xl:col-span-8 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Visual analytics</p>
            <h3 className="mt-2 text-xl font-bold text-white">Comportement budgétaire et structure du risque</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Les graphiques ci-dessous permettent de visualiser l’équilibre global du profil : budget estimé,
              niveau d’endettement, projection d’amortissement et scoring synthétique.
            </p>
          </div>

          <FinancialCharts data={formData} result={result} />
        </div>

        <div className="2xl:col-span-4 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Benchmark</p>
            <h3 className="mt-2 text-xl font-bold text-white">Positionnement du taux</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Comparez le taux issu de votre simulation à une valeur de référence pour mieux situer la compétitivité
              potentielle du dossier.
            </p>
          </div>

          <RateComparator finance={result.finance} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Projection</p>
          <h3 className="mt-2 text-xl font-bold text-white">Échéancier de remboursement</h3>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Le tableau d’amortissement permet de suivre la répartition entre intérêts, capital remboursé
            et capital restant dû au fil du temps.
          </p>
        </div>

        <AmortizationTable schedule={result.finance.tableau_amortissement} />
      </section>

      <section className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Recommandations</p>
          <h3 className="mt-2 text-xl font-bold text-white">Plan d’action recommandé</h3>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Cette section traduit l’évaluation en actions concrètes afin de comprendre quoi améliorer ou comment
            consolider un profil déjà favorable.
          </p>
        </div>

        <ActionPlan actions={result.plan_action} decision={result.decision} />
      </section>
    </div>
  );
}