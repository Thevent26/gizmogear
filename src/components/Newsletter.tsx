'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-3xl p-10 md:p-14 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Tech Insights in Your Inbox</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Honest reviews, local guides, and tech news. No spam, just the good stuff.</p>
            {sent ? (
              <p className="text-cyan-400 font-semibold text-lg">✓ You're in! Watch your inbox.</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSent(true) }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button type="submit" className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
