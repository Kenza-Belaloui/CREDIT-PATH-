import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.user_id);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError(data.detail || 'Identifiants invalides');
      }
    } catch (err) {
      setError('Erreur serveur');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.16),transparent_24%),linear-gradient(180deg,#020617_0%,#06101f_45%,#020617_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 xl:grid-cols-2">
        <div className="hidden xl:flex flex-col justify-between border-r border-white/10 p-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
              CreditPath AI
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight text-white">
              Connectez-vous à votre{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                espace d’analyse crédit
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Accédez à vos simulations, votre tableau de bord analytique, l’historique de vos dossiers
              et votre assistant conversationnel contextuel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Analyse structurée</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Décision simulée, scoring, amortissement et recommandations pédagogiques.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Expérience premium</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Une interface de démonstration moderne, pensée pour un rendu crédible en contexte académique.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="glass-panel w-full max-w-md rounded-[28px] p-8 shadow-2xl animate-fade-in">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Authentification</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Bon retour</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Connectez-vous pour accéder à votre espace CreditPath.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-rose-500/30 bg-rose-500/15 p-4 text-sm text-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="glass-input rounded-2xl px-4 py-3.5 outline-none"
                  placeholder="exemple@email.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  className="glass-input rounded-2xl px-4 py-3.5 outline-none"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary w-full rounded-2xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em]">
                Se connecter
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Pas encore de compte ?
              <Link to="/register" className="ml-2 font-semibold text-blue-400 hover:text-white">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}