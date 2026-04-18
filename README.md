CreditPath AI

CreditPath AI est une application web intelligente de simulation de crédit qui combine Machine Learning, ingénierie financière et IA générative pour offrir une analyse claire, pédagogique et personnalisée du profil emprunteur.

Objectif

Transformer une simple simulation de crédit en un outil d’aide à la décision :

- Comprendre pourquoi un crédit est accepté ou refusé
- Identifier les points forts et faibles du dossier
- Proposer des actions concrètes d’amélioration
- Accompagner l’utilisateur avec un assistant intelligent

Fonctionnalités
- Authentification utilisateur (inscription / connexion)
- Simulation de crédit avec score IA
- Dashboard interactif (graphiques, indicateurs financiers)
- Chatbot intelligent contextualisé
- Analyse du profil emprunteur
- Plan d’action personnalisé
- Orientation bancaire
- Export PDF
- Historique des simulations

Intelligence Artificielle
Scoring crédit : Random Forest (scikit-learn)
Dataset : German Credit Risk
Chatbot : Llama 3 via Groq API
Score basé sur predict_proba

Architecture
Backend
FastAPI (Python)
SQLAlchemy + SQLite
Authentification sécurisée (Argon2)
Frontend
React + Vite
Tailwind CSS
Recharts
jsPDF

Structure du projet

CREDIT-PATH-/
│
├── backend/
├── frontend/
└── README.md

Installation
1. Cloner le projet

git clone https://github.com/Kenza-Belaloui/CREDIT-PATH-.git

cd CREDIT-PATH-

2. Backend

cd backend
python -m venv .venv
..venv\Scripts\Activate.ps1
pip install -r requirements.txt
pip install groq
python -m uvicorn app.main:app --reload

3. Frontend

cd frontend
npm install
npm run dev

Accès

Frontend : http://localhost:5173

Backend : http://127.0.0.1:8000

Docs API : http://127.0.0.1:8000/docs

Valeur du projet

CreditPath AI ne se limite pas à une prédiction.
Il explique, accompagne et guide l’utilisateur pour améliorer son dossier.

Améliorations futures
Déploiement cloud
Authentification JWT
Version mobile
Simulation multi-scénarios
