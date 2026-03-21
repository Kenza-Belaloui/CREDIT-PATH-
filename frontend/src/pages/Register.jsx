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
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.detail || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError('Impossible de joindre le serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#081225_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.14),transparent_24%)] p-10">
            <div>
              <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                Nouveau compte
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight text-white">
                Créez votre espace personnel
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Accédez à vos simulations, votre historique et votre analyse détaillée
                dans une interface claire et professionnelle.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Compte personnel</p>
                <p className="mt-2 text-sm text-slate-400">
                  Chaque simulation est enregistrée dans votre espace.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Accès rapide</p>
                <p className="mt-2 text-sm text-slate-400">
                  Une fois inscrit, vous pouvez lancer directement vos scénarios.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Inscription
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">Créer un compte</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Renseignez vos informations pour ouvrir votre espace.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      placeholder="Kenza"
                      className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Belaloui"
                      className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </div>

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
                    placeholder="Minimum 6 caractères"
                    className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-2xl px-5 py-3.5 text-sm font-semibold ${
                    loading ? 'cursor-not-allowed bg-slate-700 text-slate-300' : 'btn-primary'
                  }`}
                >
                  {loading ? 'Création...' : 'Créer mon compte'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Déjà un compte ?
                <Link to="/login" className="ml-2 font-semibold text-blue-400 hover:text-white">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}