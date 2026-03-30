'use client'

import { useState, useEffect } from 'react'

const POLL_KEY = 'gizmogear_poll_v1'

const poll = {
  question: 'What is the biggest hurdle for tech adoption in Zambia?',
  options: [
    { id: 'gadgets', label: 'Gadgets', votes: 142, icon: '📱' },
    { id: 'networks', label: 'Networks', votes: 98, icon: '📡' },
    { id: 'creators', label: 'Creator Economy', votes: 67, icon: '🎬' },
    { id: 'affordability', label: 'Affordability', votes: 203, icon: '💰' },
    { id: 'startups', label: 'Startups', votes: 44, icon: '🚀' },
    { id: 'diy', label: 'DIY / Repair', votes: 31, icon: '🔧' },
  ],
}

export default function PollWidget() {
  const [voted, setVoted] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [animateResults, setAnimateResults] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(POLL_KEY)
    if (stored) {
      setVoted(stored)
      setShowResults(true)
    }
  }, [])

  const handleVote = (optionId: string) => {
    if (voted) return
    localStorage.setItem(POLL_KEY, optionId)
    setVoted(optionId)
    setShowResults(true)
    setTimeout(() => setAnimateResults(true), 50)
  }

  const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0) + (voted && !showResults ? 1 : 0)

  return (
    <section id="opinion" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="circuit-line flex-1 max-w-[60px]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#64748b]">
            Quick Poll
          </span>
          <div className="circuit-line flex-1 max-w-[60px]" />
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[#1e1e2e] bg-[#0f0f17] p-8 glow-violet">
          {/* Glowing top line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent" />

          <h3 className="font-display font-bold text-2xl text-white text-center mb-2">
            {poll.question}
          </h3>
          <p className="text-center text-[#64748b] text-sm mb-8">
            {totalVotes.toLocaleString()} votes
          </p>

          {!showResults ? (
            /* Voting state */
            <div className="space-y-3">
              {poll.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#16161f] hover:border-[#8b5cf6]/50 hover:bg-[#1a1a28] transition-all duration-200 group text-left"
                >
                  <span className="text-xl w-8 text-center">{option.icon}</span>
                  <span className="font-display font-medium text-white flex-1 group-hover:text-[#8b5cf6] transition-colors">
                    {option.label}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#475569] group-hover:text-[#8b5cf6] transition-colors">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            /* Results state */
            <div className="space-y-3">
              {poll.options
                .sort((a, b) => {
                  const aVotes = a.votes + (voted === a.id && animateResults ? 1 : 0)
                  const bVotes = b.votes + (voted === b.id && animateResults ? 1 : 0)
                  return bVotes - aVotes
                })
                .map(option => {
                  const isVoted = option.id === voted
                  const optionVotes = option.votes + (isVoted && animateResults ? 1 : 0)
                  const pct = Math.round((optionVotes / totalVotes) * 100)
                  return (
                    <div key={option.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{option.icon}</span>
                          <span className={`font-medium ${isVoted ? 'text-white' : 'text-[#94a3b8]'}`}>
                            {option.label}
                          </span>
                          {isVoted && (
                            <span className="text-[#8b5cf6] text-xs font-mono ml-1">✓ your vote</span>
                          )}
                        </div>
                        <span className={`font-mono font-medium ${isVoted ? 'text-[#8b5cf6]' : 'text-[#64748b]'}`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#16161f] border border-[#1e1e2e] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: animateResults ? `${pct}%` : '0%',
                            background: isVoted
                              ? 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
                              : 'linear-gradient(90deg, #1e1e2e, #2a2a3e)',
                            boxShadow: isVoted ? '0 0 10px rgba(139,92,246,0.5)' : 'none',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* Reset (for demo purposes) */}
          <button
            onClick={() => {
              localStorage.removeItem(POLL_KEY)
              setVoted(null)
              setShowResults(false)
              setAnimateResults(false)
            }}
            className="mt-6 text-xs text-[#475569] hover:text-[#64748b] transition-colors mx-auto block"
          >
            Reset poll (demo)
          </button>
        </div>
      </div>
    </section>
  )
}
