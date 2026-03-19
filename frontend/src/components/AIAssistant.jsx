import React, { useState, useEffect, useRef } from 'react';

export default function AIAssistant({ result, data }) {
  const initialMessage = {
    sender: 'bot',
    text: "Assistant CreditPath en ligne. Je peux vous aider à comprendre votre dossier, votre score, votre taux estimé et les axes d’amélioration.",
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Pourquoi cette décision ?",
    "Comment améliorer mon dossier ?",
    "Explique mon score de confiance",
    "Résume mon résultat",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  useEffect(() => {
    if (result) {
      setMessages((prev) => {
        const alreadyAnnounced = prev.some(
          (msg) =>
            msg.sender === 'bot' &&
            msg.text.includes(`Statut du dossier : ${result.decision}`)
        );

        if (alreadyAnnounced) return prev;

        return [
          ...prev,
          {
            sender: 'bot',
            text: `Analyse terminée. Statut du dossier : ${result.decision}. Le score de confiance estimé est de ${result.score_confiance}%. Vous pouvez maintenant me poser des questions précises sur ce résultat.`,
          },
        ];
      });
    }
  }, [result]);

  const resetChat = () => {
    setMessages([initialMessage]);
    setInput('');
  };

  const buildContextData = () => {
    if (result) {
      return {
        ...data,
        decision: result.decision,
        score_confiance: result.score_confiance,
        plan_action: result.plan_action,
        taux_obtenu: result.finance?.taux_obtenu,
        taux_marche: result.finance?.taux_marche,
        mensualite: result.finance?.mensualite,
        cout_total: result.finance?.cout_total,
        economie: result.finance?.economie,
      };
    }

    return {
      ...data,
      decision: null,
      score_confiance: null,
      plan_action: [],
      taux_obtenu: null,
      taux_marche: null,
      mensualite: null,
      cout_total: null,
      economie: null,
    };
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isSending) return;

    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const contextData = buildContextData();

      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context: contextData }),
      });

      const dataRes = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            dataRes.response ||
            "Je n’ai pas pu générer de réponse exploitable pour le moment.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Erreur de connexion au service conversationnel.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 shadow-xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-1.688-5.063a2.25 2.25 0 00-1.423-1.423L.826 10.576l5.063-1.688a2.25 2.25 0 001.423-1.423L9 2.25l1.688 5.063a2.25 2.25 0 001.423 1.423l5.063 1.688-5.063 1.688a2.25 2.25 0 00-1.423 1.423L9.813 15.904zM18.25 8.25h.008v.008h-.008V8.25zM16.5 17.25h.008v.008H16.5v-.008zM7.5 7.5h.008v.008H7.5V7.5z"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Assistant IA</p>
              <h3 className="mt-1 text-lg font-bold text-white">Copilote financier contextuel</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-slate-400">
                  En ligne — réponses générées à partir de votre simulation
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={resetChat}
            className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/15"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="max-h-[420px] min-h-[420px] overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-[20px] px-4 py-3 text-sm leading-7 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'border border-white/10 bg-white/5 text-slate-200'
                }`}
              >
                <div className="mb-1 text-[10px] uppercase tracking-[0.22em] opacity-70">
                  {msg.sender === 'user' ? 'Vous' : 'CreditPath AI'}
                </div>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                <div className="mb-2 text-[10px] uppercase tracking-[0.22em] opacity-70">
                  CreditPath AI
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:120ms]" />
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-white/10 bg-slate-950/50 px-4 py-4">
        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">
            Suggestions rapides
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((text, index) => (
              <button
                key={index}
                onClick={() => sendMessage(text)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-white"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">
              Votre message
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex. Pourquoi mon dossier a-t-il été refusé ?"
              className="glass-input rounded-2xl px-4 py-3 outline-none"
              disabled={isSending}
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] ${
              isSending ? 'cursor-not-allowed bg-slate-700 text-slate-300' : 'btn-primary'
            }`}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}