import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="my-16 py-12 px-6 sm:px-12 bg-stone-100/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/90 rounded-2xl">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest font-mono text-amber-800 dark:text-amber-300 font-semibold block mb-2">
          Curated Weekly Dispatch
        </span>

        <h2 className="font-editorial-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 text-balance">
          The Sunday Thought Briefing
        </h2>

        <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 font-reading-serif leading-relaxed">
          One long-form philosophical essay, three foundational mental models, and curated architectural readings. Zero algorithmic noise.
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>You have been subscribed to the Sunday Thought Briefing.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="reader@domain.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-600"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-300 dark:text-stone-950 dark:hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
