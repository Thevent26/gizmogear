'use client'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.05) 0%, transparent 50%), #06060a',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Hex grid pattern overlay */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      {/* Floating geometric shapes */}
      <div className="absolute top-32 left-[10%] w-16 h-16 border border-[#00d4ff]/20 rounded-lg animate-float rotate-12" />
      <div className="absolute top-48 right-[15%] w-8 h-8 bg-[#8b5cf6]/10 rounded-full animate-float-delayed" />
      <div className="absolute bottom-40 left-[20%] w-12 h-12 border border-[#f59e0b]/20 rounded-full animate-float" />
      <div className="absolute top-[30%] right-[8%] w-6 h-6 bg-[#00d4ff]/10 rotate-45 animate-float-delayed" />
      <div className="absolute bottom-[25%] right-[25%] w-20 h-20 border border-[#8b5cf6]/15 rounded-lg animate-float rotate-6" />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 fade-up" style={{ animationDelay: '0ms' }}>
          <span className="w-8 h-px bg-[#00d4ff]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#00d4ff]">
            Zambia&apos;s Tech Voice
          </span>
          <span className="w-8 h-px bg-[#00d4ff]" />
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6 fade-up"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-white">High-Tech Meets </span>
          <span className="gradient-text"> Zambian Context</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto mb-10 leading-relaxed fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Clean, professional reviews of gadgets, services, and tech trends — through the lens
          of Zambia. Not just specs. Stories. Interactivity. Local relevance.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center fade-up" style={{ animationDelay: '300ms' }}>
          <a href="#reviews" className="btn-primary text-sm">
            Explore Reviews
          </a>
          <a href="#about" className="btn-outline text-sm">
            Why Zambia?
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce opacity-40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060a] to-transparent" />
    </section>
  )
}
