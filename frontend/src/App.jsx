import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';

function AppLayout({ children, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/',
      label: 'Nouvelle simulation',
      icon: 'M12 4.5v15m7.5-7.5h-15',
    },
    {
      path: '/dashboard',
      label: 'Analyse détaillée',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      path: '/history',
      label: 'Historique',
      icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  const pageMeta = {
    '/': {
      title: 'Nouvelle simulation',
      subtitle: 'Renseignez uniquement les données essentielles pour évaluer rapidement un dossier.',
    },
    '/dashboard': {
      title: 'Analyse détaillée',
      subtitle: 'Statistiques, graphiques, coût du crédit et lecture globale du dossier.',
    },
    '/history': {
      title: 'Historique',
      subtitle: 'Retrouvez les simulations précédentes enregistrées dans votre espace.',
    },
  };

  const currentPage = pageMeta[location.pathname] || {
    title: 'CreditPath AI',
    subtitle: 'Plateforme intelligente de simulation de crédit',
  };

  return (
    <div className="min-h-screen text-white">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 xl:flex flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="border-b border-white/10 px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-900/30">
              <img
                src="/logo/CP_LOGO.png"
                alt="CreditPath Logo"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Plateforme IA</p>
              <h1 className="text-lg font-bold text-white">
                Credit<span className="text-blue-400">Path</span>
              </h1>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  active
                    ? 'border-blue-500/25 bg-blue-500/10 text-white'
                    : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`${active ? 'text-blue-300' : 'text-slate-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/15"
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="xl:ml-64">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">CreditPath AI</p>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">{currentPage.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{currentPage.subtitle}</p>
            </div>

            {location.pathname !== '/dashboard' && (
              <button
                onClick={() => navigate('/dashboard')}
                className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 md:block"
              >
                Voir l’analyse
              </button>
            )}
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
  const [showDecisionModal, setShowDecisionModal] = useState(false);

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
    setShowDecisionModal(false);
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
    setShowDecisionModal(false);

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
      setShowDecisionModal(true);
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
                        showDecisionModal={showDecisionModal}
                        setShowDecisionModal={setShowDecisionModal}
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