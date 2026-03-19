import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ReferenceLine,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#10B981', '#F43F5E', '#3B82F6'];

const chartCardClass =
  'rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-xl';

export default function FinancialCharts({ data, result }) {
  const monthlyIncome = Number(data?.revenu_mensuel || 0);
  const totalDebt = Number(data?.dette_totale || 0);
  const savings = Number(data?.epargne || 0);
  const jobSeniority = Number(data?.anciennete_emploi || 0);

  const pieData = [
    {
      name: 'Reste à vivre',
      value: Math.max(0, monthlyIncome - totalDebt / 12),
    },
    {
      name: 'Dettes',
      value: totalDebt / 12,
    },
    {
      name: 'Épargne',
      value: savings / 10,
    },
  ];

  const revenuAnnuel = (monthlyIncome || 1) * 12;
  const ratioActuel = ((totalDebt || 0) / revenuAnnuel) * 100;

  const barData = [
    { name: 'Votre ratio', value: ratioActuel, limit: 33 },
  ];

  const areaData =
    result?.finance?.tableau_amortissement?.filter((_, i) => i % 2 === 0) || [];

  const radarData = [
    {
      subject: 'Revenus',
      A: Math.min(100, (monthlyIncome / 4000) * 100),
      fullMark: 100,
    },
    {
      subject: 'Stabilité',
      A: Math.min(100, (jobSeniority / 5) * 100),
      fullMark: 100,
    },
    {
      subject: 'Épargne',
      A: Math.min(100, (savings / 10000) * 100),
      fullMark: 100,
    },
    {
      subject: 'Sérénité',
      A: Math.max(0, 100 - ratioActuel),
      fullMark: 100,
    },
    {
      subject: 'Confiance IA',
      A: result ? result.score_confiance : 50,
      fullMark: 100,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-fade-in">
      <div className={chartCardClass}>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Répartition
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">Budget mensuel estimé</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Visualisation synthétique de l’équilibre entre revenu disponible, charge de dettes et épargne.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={92}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(val) => `${Math.round(val)} €`}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={chartCardClass}>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Risque
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">Analyse du niveau d’endettement</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Comparaison du ratio estimé avec le seuil de vigilance souvent utilisé comme repère bancaire.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 60]} hide />
              <YAxis type="category" dataKey="name" hide />
              <CartesianGrid horizontal={false} stroke="#1e293b" />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(val) => `${Number(val).toFixed(2)} %`}
              />
              <ReferenceLine
                x={33}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  position: 'top',
                  value: 'Seuil indicatif 33%',
                  fill: '#ef4444',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" name="Endettement (%)" barSize={42} radius={[0, 12, 12, 0]}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`bar-cell-${index}`}
                    fill={entry.value > 33 ? '#F43F5E' : '#10B981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Lecture indicative : un ratio supérieur au seuil attire davantage l’attention.
        </p>
      </div>

      {result && (
        <div className={`${chartCardClass} md:col-span-2`}>
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Projection
            </p>
            <h3 className="mt-2 text-lg font-bold text-white">Évolution du capital restant dû</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Cette courbe représente la décroissance du capital restant dû au fil du remboursement.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRestant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="mois" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="restant"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRestant)"
                  name="Capital restant dû"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className={`${chartCardClass} md:col-span-2`}>
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Scoring
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">Profil financier synthétique</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Lecture agrégée de plusieurs dimensions du dossier pour une interprétation pédagogique.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="78%" data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="Votre profil"
                dataKey="A"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="#8b5cf6"
                fillOpacity={0.35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                itemStyle={{ color: '#fff' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Plus la surface est large, plus le profil ressort comme solide dans cette lecture simplifiée.
        </p>
      </div>
    </div>
  );
}