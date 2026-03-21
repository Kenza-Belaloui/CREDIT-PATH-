import React, { useEffect, useRef, useState } from 'react';

export default function AIAssistant({ result, data }) {
  const initialMessage = {
    sender: 'bot',
    text: "Je peux vous aider à comprendre la décision, le score et les points à améliorer.",
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = result
    ? [
        'Pourquoi cette décision ?',
        'Explique mon score',
        'Comment améliorer mon dossier ?',
      ]
    : [
        'Que faut-il remplir ?',
        'À quoi sert cette simulation ?',
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  useEffect(() => {
    if (result) {
      setMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.sender === 'bot' &&
            msg.text.includes(`Décision actuelle : ${result.decision}`)
        );

        if (exists) return prev;

        return [
          ...prev,
          {
            sender: 'bot',
            text: `Décision actuelle : ${result.decision}. Score estimé : ${result.score_confiance}%. Posez-moi une question sur ce résultat.`,
          },
        ];
      });
    }
  }, [result]);

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
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: buildContextData(),
        }),
      });

      const dataRes = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            dataRes.response ||
            "Je n’ai pas pu générer de réponse pour le moment.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Erreur de connexion au service d’assistance.",
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

  const resetChat = () => {
    setMessages([initialMessage]);
    setInput('');
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/80 shadow-xl">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
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
                d="M9.813 15.904L9 18.75l-1.688-5.063a2.25 2.25 0 00-1.423-1.423L.826 10.576l5.063-1.688a2.25 2.25 0 001.423-1.423L9 2.25l1.688 5.063a2.25 2.25 0 001.423 1.423l5.063 1.688-5.063 1.688a2.25 2.25 0 00-1.423 1.423L9.813 15.904z"
              />
            </svg>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Assistant
            </p>
            <h3 className="mt-1 text-sm font-semibold text-white">
              Aide contextuelle
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300 sm:inline-flex">
            En ligne
          </span>
          <span className="text-slate-400">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((text, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(text)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-white"
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="max-h-[260px] min-h-[180px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/55 p-3">
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-6 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'border border-white/10 bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="mb-1 text-[10px] uppercase tracking-[0.2em] opacity-70">
                        {msg.sender === 'user' ? 'Vous' : 'Assistant'}
                      </div>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
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

            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="glass-input rounded-2xl px-4 py-3 text-sm outline-none"
                disabled={isSending}
              />

              <button
                type="submit"
                disabled={isSending}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  isSending ? 'cursor-not-allowed bg-slate-700 text-slate-300' : 'btn-primary'
                }`}
              >
                Envoyer
              </button>
            </form>

            <div className="mt-3 flex justify-end">
              <button
                onClick={resetChat}
                className="text-xs text-slate-400 transition hover:text-white"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}