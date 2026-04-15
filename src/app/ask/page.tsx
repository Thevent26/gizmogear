import AskForm from '@/components/AskForm';
import { MessageCircle, Send } from 'lucide-react';

interface Question {
  id: string;
  name: string;
  email: string;
  category: string;
  question: string;
  created_at: string;
}

async function getQuestions(): Promise<Question[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/ask`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AskPage() {
  const questions = await getQuestions();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-purple-900/30 border border-purple-800/40">
            <Send size={24} className="text-purple-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">Ask a Question</h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
          Got a tech question? Want a product reviewed? Need advice before buying? Submit it here.
        </p>
      </div>

      {/* Form */}
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-6 sm:p-8 mb-12">
        <AskForm />
      </div>

      {/* Q&A Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle size={24} className="text-[var(--text-secondary)]" />
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Community Q&A</h2>
          <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800/40 text-purple-300 text-sm font-medium">
            {questions.length}
          </span>
        </div>

        {questions.length === 0 ? (
          <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No questions yet</h3>
            <p className="text-[var(--text-secondary)]">Be the first to ask something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl p-5 hover:border-purple-800/40 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">{q.name}</span>
                    <span className="mx-2 text-[var(--text-muted)]">·</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-900/30 border border-purple-800/40 text-purple-300 text-xs font-medium">
                      {q.category}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                    {new Date(q.created_at).toLocaleDateString('en-ZM', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">{q.question}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
