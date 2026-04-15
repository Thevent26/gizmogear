'use client';

import { useState } from 'react';

const CATEGORIES = ['Gear Review', 'Tech Question', 'Buying Advice', 'Troubleshooting', 'Other'];

export default function AskForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], question: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Submission failed');
      setDone(true);
      setForm({ name: '', email: '', category: CATEGORIES[0], question: '' });
      onSuccess?.();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-300 mb-2">Question Submitted!</h3>
        <p className="text-green-200/70">Thanks! We'll get back to you soon. Check the Q&A below to see if your question is featured.</p>
        <button
          onClick={() => setDone(false)}
          className="mt-4 px-6 py-2 bg-green-800 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 text-red-300 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Your Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Mwansa Chanda"
            className="w-full px-4 py-3 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="mwansa@email.com"
            className="w-full px-4 py-3 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Category</label>
        <select
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="w-full px-4 py-3 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Your Question</label>
        <textarea
          required
          rows={5}
          value={form.question}
          onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
          placeholder="What's on your mind? A product you want reviewed, a tech problem you need solved, or advice before buying..."
          className="w-full px-4 py-3 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Submit Question'}
      </button>
      <p className="text-center text-sm text-[var(--text-muted)]">
        Your question may be published publicly on this page.
      </p>
    </form>
  );
}
