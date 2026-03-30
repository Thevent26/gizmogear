import Link from 'next/link'

export default function AdBanner() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f0f17] via-[#151520] to-[#0f0f17] border border-white/5">
          {/* Subtle glow lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          
          <a 
            href="https://www.lusaka365.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Icon/Logo area */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Sponsored</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-cyan-400/70 font-medium">Lusaka365</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Discover Lusaka Like Never Before
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Your ultimate guide to events, venues, restaurants, and what's happening in Lusaka.
                </p>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all">
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
