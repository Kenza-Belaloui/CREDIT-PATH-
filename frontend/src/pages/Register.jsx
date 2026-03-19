import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Compte créé avec succès. Redirection...');
        setTimeout(() => navigate('/login'), 1800);
      } else {
        setError(data.detail || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.16),transparent_24%),linear-gradient(180deg,#020617_0%,#06101f_45%,#020617_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 xl:grid-cols-2">
        <div className="hidden xl:flex flex-col justify-between border-r border-white/10 p-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
              Nouveau compte
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight text-white">
              Créez votre espace{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                CreditPath AI
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Centralisez vos simulations, conservez vos historiques et démontrez une plateforme
              de scoring crédit moderne et pédagogique.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Espace personnel</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Chaque utilisateur dispose d’un accès à ses simulations et à son historique.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Produit démonstratif</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Un rendu pensé pour un PFE, une soutenance ou une présentation devant un jury.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="glass-panel w-full max-w-md rounded-[28px] p-8 shadow-2xl animate-fade-in">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Inscription</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Création de compte</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Rejoignez la plateforme et accédez à l’ensemble des fonctionnalités.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-rose-500/30 bg-rose-500/15 p-4 text-sm text-rose-200">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-sm text-emerald-200">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    className="glass-input rounded-2xl px-4 py-3.5 outline-none"
                    placeholder="Jean"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    className="glass-input rounded-2xl px-4 py-3.5 outline-none"
                    placeholder="Dupont"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="glass-input rounded-2xl px-4 py-3.5 outline-none"
                  placeholder="votre@email.com"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-2xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] ${
                  loading ? 'cursor-wait bg-slate-700 text-slate-300' : 'btn-primary'
                }`}
              >
                {loading ? 'Traitement...' : "Valider l'inscription"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Vous avez déjà un compte ?
              <Link to="/login" className="ml-2 font-semibold text-blue-400 hover:text-white">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}