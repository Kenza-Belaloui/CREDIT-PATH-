import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
      setError('Impossible de joindre le serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#081225_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.14),transparent_24%)] p-10">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
                CreditPath AI
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight text-white">
                Connectez-vous à votre espace de simulation crédit
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Une interface simple pour accéder à vos simulations, votre analyse détaillée
                et votre historique.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Simulation rapide</p>
                <p className="mt-2 text-sm text-slate-400">
                  Saisissez uniquement les données essentielles du dossier.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Analyse claire</p>
                <p className="mt-2 text-sm text-slate-400">
                  Visualisez la décision, les causes et les indicateurs utiles.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Connexion
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">Bon retour</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Connectez-vous pour accéder à votre tableau de bord.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemple@email.com"
                    className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full rounded-2xl px-5 py-3.5 text-sm font-semibold"
                >
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
    </div>
  );
}