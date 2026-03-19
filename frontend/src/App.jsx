import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';

function AppLayout({ children, onLogout }) {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      label: 'Nouvelle simulation',
      description: 'Créer une nouvelle étude',
      icon: 'M12 4.5v15m7.5-7.5h-15',
    },
    {
      path: '/dashboard',
      label: 'Analyse détaillée',
      description: 'Indicateurs et projections',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      path: '/history',
      label: 'Historique',
      description: 'Suivi des simulations',
      icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  const pageMeta = {
    '/': {
      title: 'Simulation de crédit',
      subtitle: 'Renseignez votre profil financier pour générer une analyse complète et contextualisée.',
    },
    '/dashboard': {
      title: 'Tableau de bord analytique',
      subtitle: 'Consultez les scores, projections de remboursement et indicateurs de performance du dossier.',
    },
    '/history': {
      title: 'Historique client',
      subtitle: 'Retrouvez les simulations précédentes et comparez leur évolution dans le temps.',
    },
  };

  const currentPage = pageMeta[location.pathname] || {
    title: 'CreditPath AI',
    subtitle: 'Plateforme intelligente de simulation de crédit.',
  };

  return (
    <div className="min-h-screen text-white">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 xl:flex flex-col border-r border-white/10 bg-slate-950/70 backdrop-blur-2xl">
        <div className="border-b border-white/10 px-6 py-6">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-900/30">
              <img
                src="/logo/CP_LOGO.png"
                alt="CreditPath Logo"
                className="h-7 w-7 object-contain"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Plateforme IA</p>
              <h1 className="text-xl font-bold text-white">
                Credit<span className="text-blue-400">Path</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="px-4 py-5">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-300">Workspace</p>
            <h2 className="mt-2 text-sm font-semibold text-white">Credit Intelligence Suite</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Analyse automatisée, lecture pédagogique du risque et recommandations stratégiques.
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-start gap-3 rounded-2xl border px-4 py-4 transition-all ${
                  active
                    ? 'border-blue-500/30 bg-blue-500/15 shadow-lg shadow-blue-900/10'
                    : 'border-transparent bg-transparent hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <div
                  className={`mt-0.5 rounded-xl p-2 ${
                    active ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-200'}`}>
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/15"
          >
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      <div className="xl:ml-72">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">CreditPath AI</p>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">{currentPage.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">{currentPage.subtitle}</p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Mode</p>
                <p className="text-sm font-semibold text-white">Analyste crédit</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-8xl px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const [formData, setFormData] = useState({
    revenu_mensuel: '',
    dette_totale: '',
    anciennete_emploi: '',
    epargne: '',
    montant_demande: '',
    duree_pret: '',
  });

  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('lastResult');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastResult');

    setFormData({
      revenu_mensuel: '',
      dette_totale: '',
      anciennete_emploi: '',
      epargne: '',
      montant_demande: '',
      duree_pret: '',
    });
    setResult(null);
    setHistory([]);
    setIsAuthenticated(false);
  };

  const fetchUserHistory = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      fetch(`http://127.0.0.1:8000/history/${userId}`)
        .then((r) => r.json())
        .then(setHistory)
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserHistory();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (result) {
      localStorage.setItem('lastResult', JSON.stringify(result));
    }
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const userId = localStorage.getItem('userId');

    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: parseInt(userId) }),
      });

      if (!res.ok) {
        throw new Error('Erreur de prédiction');
      }

      const data = await res.json();
      setResult(data);
      fetchUserHistory();
    } catch (err) {
      alert('Erreur connexion serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <AppLayout onLogout={handleLogout}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        result={result}
                      />
                    }
                  />
                  <Route path="/dashboard" element={<Dashboard result={result} formData={formData} />} />
                  <Route path="/history" element={<History history={history} />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;