import { useState, useEffect, useRef } from 'react'
import {
  Rocket, Menu, X, ChevronDown, ChevronRight, Check, Minus,
  Globe, Database, Clock, Cpu, Package, Server, HardDrive, GitBranch,
  Zap, Shield, Bird, Code2, MessageCircle, Star, Plus,
  ArrowRight, Play, Cloud, Lock, BarChart3, Users, Settings,
  Terminal, Layers, RefreshCw, CheckCircle, XCircle, Activity
} from 'lucide-react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { rootMargin })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, rootMargin])
  return inView
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = ['Products', 'Pricing', 'Docs', 'Blog', 'Changelog']

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-border-color' : ''
        }`}
        style={{ borderBottomColor: scrolled ? '#1e1e2e' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
              >
                <Rocket size={16} className="text-white" />
              </div>
              <span className="font-sora font-bold text-lg text-text-primary">NexDeploy</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium hover-underline transition-colors duration-200"
                  style={{ color: '#8888aa' }}
                  onMouseEnter={e => (e.target.style.color = '#f0f0ff')}
                  onMouseLeave={e => (e.target.style.color = '#8888aa')}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                className="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ color: '#8888aa' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f0ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8888aa')}
              >
                Sign In
              </button>
              <button
                className="text-sm font-semibold px-4 py-2 rounded-lg btn-glow text-white"
                style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
              >
                Get Started Free
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#8888aa' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 p-6 transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: '#0f0f1a', borderLeft: '1px solid #1e1e2e' }}
        >
          <div className="flex justify-end mb-8">
            <button onClick={() => setMenuOpen(false)} style={{ color: '#8888aa' }}>
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link}
                href="#"
                className="text-base font-medium py-2"
                style={{ color: '#8888aa' }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="h-px my-2" style={{ background: '#1e1e2e' }} />
            <button className="text-sm font-medium py-2 text-left" style={{ color: '#8888aa' }}>
              Sign In
            </button>
            <button
              className="text-sm font-semibold px-4 py-3 rounded-lg text-white text-center"
              style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Terminal Typewriter ───────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { prompt: '$', text: 'git add .', color: '#f0f0ff', delay: 0 },
  { prompt: '$', text: 'git commit -m "feat: add auth system"', color: '#f0f0ff', delay: 800 },
  { prompt: '$', text: 'git push origin main', color: '#f0f0ff', delay: 1800 },
  { prompt: '→', text: 'Webhook received. Starting build...', color: '#8888aa', delay: 2800 },
  { prompt: '→', text: 'Installing dependencies...', color: '#8888aa', delay: 3600 },
  { prompt: '✓', text: 'Dependencies installed (2.1s)', color: '#00d4a0', delay: 5200 },
  { prompt: '→', text: 'Running build command: npm run build', color: '#8888aa', delay: 6000 },
  { prompt: '✓', text: 'Build completed in 8.4s', color: '#00d4a0', delay: 8400 },
  { prompt: '→', text: 'Deploying to production cluster...', color: '#8888aa', delay: 9200 },
  { prompt: '✓', text: 'Deploy live at https://myapp.nexdeploy.app', color: '#6d4aff', delay: 11000 },
]

function TerminalWindow({ lines, title = 'terminal' }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [typingIdx, setTypingIdx] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const endRef = useRef(null)

  useEffect(() => {
    if (typingIdx >= lines.length) return
    const line = lines[typingIdx]
    const timer = setTimeout(() => {
      if (charIdx < line.text.length) {
        setTypedText(prev => prev + line.text[charIdx])
        setCharIdx(prev => prev + 1)
      } else {
        setVisibleLines(prev => [...prev, { ...line, text: line.text }])
        setTypedText('')
        setCharIdx(0)
        setTypingIdx(prev => prev + 1)
      }
    }, charIdx === 0 ? (typingIdx === 0 ? 500 : 300) : 30)
    return () => clearTimeout(timer)
  }, [typingIdx, charIdx, lines])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [visibleLines, typedText])

  const isTyping = typingIdx < lines.length

  return (
    <div className="terminal-window shadow-2xl" style={{ maxWidth: 620 }}>
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 text-xs font-mono" style={{ color: '#555577' }}>{title}</span>
      </div>
      <div className="terminal-body" style={{ minHeight: 280 }}>
        {visibleLines.map((line, i) => (
          <div key={i} className="terminal-line mb-1">
            <span
              className="terminal-prompt font-mono text-xs select-none w-4"
              style={{ color: line.prompt === '✓' ? '#00d4a0' : line.prompt === '$' ? '#8b6dff' : '#555577' }}
            >
              {line.prompt}
            </span>
            <span className="font-mono text-xs" style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}
        {isTyping && (
          <div className="terminal-line mb-1">
            <span
              className="terminal-prompt font-mono text-xs select-none w-4"
              style={{ color: lines[typingIdx].prompt === '$' ? '#8b6dff' : '#555577' }}
            >
              {lines[typingIdx].prompt}
            </span>
            <span className="font-mono text-xs" style={{ color: lines[typingIdx].color }}>
              {typedText}
              <span className="terminal-cursor" />
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0b16 50%, #0a0a0f 100%)' }}
    >
      {/* Orbs */}
      <div className="orb orb-1 absolute" style={{ top: '10%', left: '-10%' }} />
      <div className="orb orb-2 absolute" style={{ top: '30%', right: '-5%' }} />
      <div className="orb orb-3 absolute" style={{ bottom: '15%', left: '40%' }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#1e1e2e 1px, transparent 1px), linear-gradient(90deg, #1e1e2e 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 badge badge-purple">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse" style={{ background: '#8b6dff' }} />
            New: Autoscaling now available on all paid plans
            <ChevronRight size={12} />
          </div>

          {/* Headline */}
          <h1 className="font-sora font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6">
            <span style={{ color: '#f0f0ff' }}>Ship Faster.</span>
            <br />
            <span className="gradient-text">Scale Effortlessly.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#8888aa' }}
          >
            The cloud platform built for developers. Deploy web services, databases, cron jobs, and more in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="btn-glow font-semibold px-8 py-4 rounded-xl text-white text-base flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
            >
              Start for Free
              <ArrowRight size={16} />
            </button>
            <button
              className="font-semibold px-8 py-4 rounded-xl text-base flex items-center gap-2 transition-all duration-200"
              style={{
                color: '#f0f0ff',
                border: '1px solid #1e1e2e',
                background: 'rgba(30, 30, 46, 0.4)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#6d4aff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e2e')}
            >
              <Play size={16} />
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8"
            style={{ borderTop: '1px solid #1e1e2e' }}
          >
            {[
              { label: 'Developers', value: '500K+' },
              { label: 'Deploys / day', value: '2M+' },
              { label: 'Uptime SLA', value: '99.95%' },
              { label: 'Regions', value: '12' },
            ].map(stat => (
              <div key={stat.label} className="text-center px-4">
                <div className="font-sora font-bold text-2xl gradient-text">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: '#555577' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="flex justify-center">
          <TerminalWindow lines={TERMINAL_LINES} title="nexdeploy — auto-deploy" />
        </div>
      </div>
    </section>
  )
}

// ─── Social Proof ──────────────────────────────────────────────────────────────

const COMPANIES = [
  'Stripe', 'Vercel', 'Notion', 'Linear', 'Figma', 'Supabase',
  'PlanetScale', 'Resend', 'Clerk', 'Prisma', 'Railway', 'Fly.io',
  'Neon', 'Turso', 'Upstash', 'Trigger.dev',
]

function SocialProofBar() {
  return (
    <section className="py-12" style={{ background: '#0f0f1a', borderTop: '1px solid #1e1e2e', borderBottom: '1px solid #1e1e2e' }}>
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <p className="text-sm font-medium" style={{ color: '#555577' }}>
          Trusted by <span style={{ color: '#8888aa' }}>500,000+</span> developers and teams at:
        </p>
      </div>
      <div className="marquee-container">
        <div className="animate-marquee">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <div
              key={i}
              className="flex items-center mx-8 font-sora font-semibold text-sm whitespace-nowrap select-none"
              style={{ color: '#555577', letterSpacing: '0.05em' }}
            >
              <span
                className="w-2 h-2 rounded-full mr-3"
                style={{ background: '#1e1e2e' }}
              />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features Grid ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Globe,
    title: 'Web Services',
    description: 'Deploy any web app — Node, Python, Ruby, Go, Rust — with zero config. Automatic HTTPS, custom domains, and health checks.',
  },
  {
    icon: Layers,
    title: 'Static Sites',
    description: 'Deploy React, Vue, Next.js, and any static site instantly. Global CDN with sub-second delivery worldwide.',
  },
  {
    icon: Database,
    title: 'PostgreSQL Databases',
    description: 'Fully managed Postgres with automated backups, point-in-time recovery, and connection pooling built in.',
  },
  {
    icon: Zap,
    title: 'Redis',
    description: 'Blazing-fast managed Redis for caching, sessions, and real-time pub/sub — no maintenance required.',
  },
  {
    icon: Clock,
    title: 'Cron Jobs',
    description: 'Schedule recurring tasks with a simple cron syntax. Monitor runs, view logs, and get alerted on failures.',
  },
  {
    icon: Activity,
    title: 'Background Workers',
    description: 'Run long-running background processes alongside your web services, sharing the same environment.',
  },
  {
    icon: Package,
    title: 'Docker Support',
    description: 'Deploy any Docker container from a Dockerfile or Docker Hub. Full control over your runtime environment.',
  },
  {
    icon: Lock,
    title: 'Private Services',
    description: 'Internal services that are only accessible within your private network — never exposed to the public internet.',
  },
  {
    icon: HardDrive,
    title: 'Persistent Disks',
    description: 'Attach fast SSD storage to any service. Data persists across deploys and restarts — perfect for stateful apps.',
  },
  {
    icon: GitBranch,
    title: 'NexDeploy Blueprints',
    description: 'Define your entire stack as code with nexdeploy.yaml. Spin up identical environments for every branch.',
  },
]

function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  return (
    <section id="features" className="py-24" style={{ background: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'in-view' : 'out-of-view'}`}>
          <div className="badge badge-purple inline-flex mb-4">
            <Cpu size={12} />
            Platform Features
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#f0f0ff' }}>
            Everything you need to ship
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8888aa' }}>
            One platform for all your infrastructure needs. From code to production in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon
            return (
              <FeatureCard key={feat.title} feat={feat} index={i} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, '-50px')
  const Icon = feat.icon

  return (
    <div
      ref={ref}
      className="card-hover p-6 rounded-xl cursor-pointer"
      style={{
        background: '#13131f',
        border: '1px solid #1e1e2e',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ background: 'rgba(109, 74, 255, 0.15)', border: '1px solid rgba(109, 74, 255, 0.2)' }}
      >
        <Icon size={18} style={{ color: '#8b6dff' }} />
      </div>
      <h3 className="font-sora font-semibold text-base mb-2" style={{ color: '#f0f0ff' }}>
        {feat.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#8888aa' }}>
        {feat.description}
      </p>
      <a
        href="#"
        className="text-xs font-semibold flex items-center gap-1 hover-underline transition-colors"
        style={{ color: '#6d4aff' }}
      >
        Learn more <ArrowRight size={12} />
      </a>
    </div>
  )
}

// ─── How It Works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    icon: GitBranch,
    title: 'Connect your repo',
    description: 'Link your GitHub or GitLab account in seconds. NexDeploy automatically detects your framework and configures the build settings.',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure your service',
    description: 'Set environment variables, choose your region, select instance type, and configure autoscaling — all from a clean UI or YAML.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Auto-deploy on every push',
    description: 'Every git push triggers an automatic deploy with zero downtime. Preview every branch before merging to production.',
  },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  return (
    <section className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'in-view' : 'out-of-view'}`}>
          <div className="badge badge-green inline-flex mb-4">
            <CheckCircle size={12} />
            Simple Setup
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#f0f0ff' }}>
            Deploy in 3 steps
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8888aa' }}>
            From zero to production in under 60 seconds. No DevOps expertise required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines */}
          <div
            className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #6d4aff, transparent)', zIndex: 0 }}
          />

          {STEPS.map((step, i) => {
            const stepRef = useRef(null)
            const stepInView = useInView(stepRef, '-50px')
            const Icon = step.icon
            return (
              <div
                key={step.number}
                ref={stepRef}
                className="relative z-10 text-center"
                style={{
                  opacity: stepInView ? 1 : 0,
                  transform: stepInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(109,74,255,0.2), rgba(139,109,255,0.1))',
                        border: '1px solid rgba(109,74,255,0.3)',
                      }}
                    >
                      <Icon size={28} style={{ color: '#8b6dff' }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                      style={{ background: '#6d4aff', color: '#fff' }}
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>
                <h3 className="font-sora font-bold text-xl mb-3" style={{ color: '#f0f0ff' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#8888aa' }}>
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Live Deploy Animation ─────────────────────────────────────────────────────

const DEPLOY_LINES = [
  { prompt: '$', text: 'git commit -m "fix: performance improvements"', color: '#f0f0ff' },
  { prompt: '$', text: 'git push origin main', color: '#f0f0ff' },
  { prompt: '→', text: '[nexdeploy] Build triggered by push to main', color: '#8888aa' },
  { prompt: '→', text: '[nexdeploy] Cloning repository...', color: '#8888aa' },
  { prompt: '✓', text: 'Repository cloned', color: '#00d4a0' },
  { prompt: '→', text: 'Installing node_modules...', color: '#8888aa' },
  { prompt: '✓', text: 'npm install completed (1847 packages)', color: '#00d4a0' },
  { prompt: '→', text: 'Running: npm run build', color: '#8888aa' },
  { prompt: ' ', text: '> vite build', color: '#555577' },
  { prompt: ' ', text: '✓ 847 modules transformed', color: '#555577' },
  { prompt: ' ', text: '✓ built in 6.24s', color: '#555577' },
  { prompt: '✓', text: 'Build succeeded', color: '#00d4a0' },
  { prompt: '→', text: 'Rolling out to production (0 downtime)...', color: '#8888aa' },
  { prompt: '✓', text: 'Deploy live at https://myapp.nexdeploy.app ✓', color: '#6d4aff' },
]

function LiveDeploySection() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (inView && !started) setStarted(true)
  }, [inView, started])

  return (
    <section className="py-24" style={{ background: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-12 ${inView ? 'in-view' : 'out-of-view'}`}
        >
          <div className="badge badge-purple inline-flex mb-4">
            <Terminal size={12} />
            Live Demo
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl mb-4" style={{ color: '#f0f0ff' }}>
            Watch a real deploy
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#8888aa' }}>
            From git push to live URL in under 15 seconds.
          </p>
        </div>

        <div className="flex justify-center">
          {started && <TerminalWindow lines={DEPLOY_LINES} title="nexdeploy — production deploy" />}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ───────────────────────────────────────────────────────────────────

const INDIVIDUAL_PLANS = [
  {
    name: 'Free',
    price: 0,
    description: 'For side projects and experimentation.',
    features: [
      '3 web services',
      'Unlimited static sites',
      'PostgreSQL (90-day expiry)',
      '512 MB RAM',
      'Shared CPU',
      '100 GB bandwidth',
      'Community support',
      'Services sleep after 15 min',
    ],
    cta: 'Start for Free',
    highlight: false,
    sleep: true,
  },
  {
    name: 'Starter',
    price: 7,
    description: 'For hobby projects that need to stay live.',
    features: [
      'Everything in Free',
      'Never sleeps',
      '512 MB RAM',
      '0.5 CPU',
      '100 GB bandwidth',
      'Custom domains + free SSL',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
    sleep: false,
  },
  {
    name: 'Standard',
    price: 25,
    description: 'For production apps with real traffic.',
    features: [
      'Everything in Starter',
      '2 GB RAM',
      '1 CPU',
      '500 GB bandwidth',
      'Autoscaling',
      'Priority support',
    ],
    cta: 'Start Standard',
    highlight: true,
    badge: '⭐ Most Popular',
    sleep: false,
  },
  {
    name: 'Pro',
    price: 85,
    description: 'For high-traffic apps needing maximum reliability.',
    features: [
      'Everything in Standard',
      '4 GB RAM',
      '2 CPU',
      '1 TB bandwidth',
      'Zero-downtime deploys',
      'Dedicated support',
    ],
    cta: 'Start Pro',
    highlight: false,
    sleep: false,
  },
]

const DB_PLANS = [
  { name: 'Free DB', price: 0, storage: '256 MB', ram: '—', note: 'Expires in 90 days' },
  { name: 'Starter DB', price: 7, storage: '1 GB', ram: '1 GB' },
  { name: 'Standard DB', price: 20, storage: '16 GB', ram: '2 GB' },
  { name: 'Pro DB', price: 65, storage: '64 GB', ram: '8 GB' },
  { name: 'Business DB', price: 185, storage: '256 GB', ram: '16 GB' },
]

function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  const price = (p) => annual ? Math.round(p * 0.8) : p
  const origPrice = (p) => p

  return (
    <section id="pricing" className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${inView ? 'in-view' : 'out-of-view'}`}>
          <div className="badge badge-purple inline-flex mb-4">
            <BarChart3 size={12} />
            Pricing
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#f0f0ff' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: '#8888aa' }}>
            No hidden fees. No vendor lock-in. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: '#13131f', border: '1px solid #1e1e2e' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: !annual ? '#6d4aff' : 'transparent',
                color: !annual ? '#fff' : '#8888aa',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              style={{
                background: annual ? '#6d4aff' : 'transparent',
                color: annual ? '#fff' : '#8888aa',
              }}
            >
              Annual
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,160,0.2)', color: '#00d4a0' }}>
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Individual plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {INDIVIDUAL_PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl flex flex-col ${plan.highlight ? 'popular-card' : 'card-hover'}`}
              style={{
                background: plan.highlight ? 'rgba(109,74,255,0.08)' : '#13131f',
                border: plan.highlight ? '1px solid rgba(109,74,255,0.5)' : '1px solid #1e1e2e',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
            >
              {plan.badge && (
                <div className="badge badge-purple inline-flex self-start mb-3 text-xs">
                  {plan.badge}
                </div>
              )}
              <h3 className="font-sora font-bold text-lg mb-1" style={{ color: '#f0f0ff' }}>
                {plan.name}
              </h3>
              <p className="text-xs mb-4" style={{ color: '#8888aa' }}>{plan.description}</p>
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  {annual && plan.price > 0 && (
                    <span className="text-sm line-through mb-1" style={{ color: '#555577' }}>
                      ${origPrice(plan.price)}
                    </span>
                  )}
                  <span className="font-sora font-extrabold text-4xl" style={{ color: '#f0f0ff' }}>
                    ${price(plan.price)}
                  </span>
                  <span className="text-sm mb-1" style={{ color: '#8888aa' }}>/mo</span>
                </div>
                {annual && plan.price > 0 && (
                  <p className="text-xs mt-1" style={{ color: '#00d4a0' }}>
                    Save ${(origPrice(plan.price) - price(plan.price)) * 12}/year
                  </p>
                )}
              </div>
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all"
                style={
                  plan.highlight
                    ? { background: 'linear-gradient(135deg, #6d4aff, #8b6dff)', color: '#fff' }
                    : { background: 'rgba(109,74,255,0.1)', color: '#8b6dff', border: '1px solid rgba(109,74,255,0.3)' }
                }
              >
                {plan.cta}
              </button>
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#8888aa' }}>
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#00d4a0' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Database pricing */}
        <div className="mb-16">
          <h3 className="font-sora font-bold text-2xl mb-6 text-center" style={{ color: '#f0f0ff' }}>
            Database Pricing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {DB_PLANS.map((db, i) => (
              <div
                key={db.name}
                className="card-hover p-5 rounded-xl text-center"
                style={{
                  background: '#13131f',
                  border: '1px solid #1e1e2e',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                <div className="font-sora font-semibold text-sm mb-2" style={{ color: '#f0f0ff' }}>
                  {db.name}
                </div>
                <div className="font-sora font-extrabold text-3xl mb-1" style={{ color: '#f0f0ff' }}>
                  ${annual && db.price > 0 ? Math.round(db.price * 0.8) : db.price}
                  <span className="text-xs font-normal" style={{ color: '#8888aa' }}>/mo</span>
                </div>
                <div className="text-xs mt-2" style={{ color: '#8888aa' }}>
                  <div>{db.storage} storage</div>
                  {db.ram && <div>{db.ram} RAM</div>}
                  {db.note && <div className="text-warning mt-1" style={{ color: '#f5a623' }}>{db.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team / Enterprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team */}
          <div
            className="p-8 rounded-2xl"
            style={{ background: '#13131f', border: '1px solid #1e1e2e' }}
          >
            <div className="badge badge-purple inline-flex mb-4">
              <Users size={12} />
              Team
            </div>
            <h3 className="font-sora font-bold text-2xl mb-2" style={{ color: '#f0f0ff' }}>$19 / user / month</h3>
            <p className="text-sm mb-6" style={{ color: '#8888aa' }}>
              For growing engineering teams who need collaboration and governance.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                'Shared dashboards & environments',
                'Role-based access control (RBAC)',
                'Audit logs',
                'Team billing',
                'SSO (SAML, Google)',
                'Slack integration',
                'Priority SLA',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#8888aa' }}>
                  <Check size={13} style={{ color: '#00d4a0' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 rounded-xl font-semibold text-sm"
              style={{ background: 'rgba(109,74,255,0.1)', color: '#8b6dff', border: '1px solid rgba(109,74,255,0.3)' }}
            >
              Start Team Plan
            </button>
          </div>

          {/* Enterprise */}
          <div
            className="p-8 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(109,74,255,0.1), rgba(15,15,26,1))',
              border: '1px solid rgba(109,74,255,0.3)',
            }}
          >
            <div className="badge badge-green inline-flex mb-4">
              <Shield size={12} />
              Enterprise
            </div>
            <h3 className="font-sora font-bold text-2xl mb-2" style={{ color: '#f0f0ff' }}>Custom Pricing</h3>
            <p className="text-sm mb-6" style={{ color: '#8888aa' }}>
              Dedicated infrastructure and white-glove support for mission-critical applications.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                'Dedicated infrastructure',
                'Custom SLAs (up to 99.99% uptime)',
                'VPC peering & private networking',
                'SOC 2 Type II & HIPAA compliance',
                'Custom data residency',
                'Dedicated account manager',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#8888aa' }}>
                  <Check size={13} style={{ color: '#00d4a0' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 rounded-xl font-semibold text-sm btn-glow text-white"
              style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Comparison Table ──────────────────────────────────────────────────────────

const COMPARE_ROWS = [
  { feature: 'Sleep behavior', free: 'Sleeps after 15m', starter: 'Never sleeps', standard: 'Never sleeps', pro: 'Never sleeps', enterprise: 'Never sleeps' },
  { feature: 'Custom domains', free: '✗', starter: '✓', standard: '✓', pro: '✓', enterprise: '✓' },
  { feature: 'Free SSL', free: '✓', starter: '✓', standard: '✓', pro: '✓', enterprise: '✓' },
  { feature: 'RAM', free: '512 MB', starter: '512 MB', standard: '2 GB', pro: '4 GB', enterprise: 'Custom' },
  { feature: 'CPU', free: 'Shared', starter: '0.5 vCPU', standard: '1 vCPU', pro: '2 vCPU', enterprise: 'Dedicated' },
  { feature: 'Bandwidth', free: '100 GB', starter: '100 GB', standard: '500 GB', pro: '1 TB', enterprise: 'Custom' },
  { feature: 'Autoscaling', free: '✗', starter: '✗', standard: '✓', pro: '✓', enterprise: '✓' },
  { feature: 'Zero-downtime deploys', free: '✗', starter: '✗', standard: '✗', pro: '✓', enterprise: '✓' },
  { feature: 'Support level', free: 'Community', starter: 'Email', standard: 'Priority', pro: 'Dedicated', enterprise: 'White-glove' },
  { feature: 'RBAC', free: '✗', starter: '✗', standard: '✗', pro: '✗', enterprise: '✓' },
  { feature: 'SSO', free: '✗', starter: '✗', standard: '✗', pro: '✗', enterprise: '✓' },
  { feature: 'SLA', free: '—', starter: '99.9%', standard: '99.9%', pro: '99.95%', enterprise: '99.99%' },
]

function ComparisonTable() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  const cellVal = (val) => {
    if (val === '✓') return <CheckCircle size={16} style={{ color: '#00d4a0', margin: 'auto' }} />
    if (val === '✗') return <XCircle size={16} style={{ color: '#555577', margin: 'auto' }} />
    return <span className="text-xs" style={{ color: '#8888aa' }}>{val}</span>
  }

  const headers = ['Feature', 'Free', 'Starter', 'Standard', 'Pro', 'Enterprise']

  return (
    <section className="py-24" style={{ background: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${inView ? 'in-view' : 'out-of-view'}`}>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl mb-4" style={{ color: '#f0f0ff' }}>
            Compare plans
          </h2>
          <p className="text-lg" style={{ color: '#8888aa' }}>
            Find the right plan for your project.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #1e1e2e' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#13131f', borderBottom: '1px solid #1e1e2e' }}>
                {headers.map((h, i) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-left font-sora font-semibold text-sm"
                    style={{ color: i === 0 ? '#8888aa' : '#f0f0ff', borderRight: i < headers.length - 1 ? '1px solid #1e1e2e' : 'none' }}
                  >
                    {h === 'Standard' ? (
                      <span>
                        {h} <span className="text-xs ml-1" style={{ color: '#6d4aff' }}>★</span>
                      </span>
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{
                    background: i % 2 === 1 ? 'rgba(30,30,46,0.3)' : 'transparent',
                    borderBottom: '1px solid rgba(30,30,46,0.5)',
                  }}
                >
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: '#f0f0ff', borderRight: '1px solid #1e1e2e' }}>
                    {row.feature}
                  </td>
                  {[row.free, row.starter, row.standard, row.pro, row.enterprise].map((val, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-center"
                      style={{ borderRight: j < 4 ? '1px solid #1e1e2e' : 'none' }}
                    >
                      {cellVal(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    company: 'Founder @ Loopback',
    initials: 'SC',
    color: '#6d4aff',
    quote: 'NexDeploy cut our deployment time from 45 minutes to under 30 seconds. The auto-deploy on push feature is a game changer for our team.',
  },
  {
    name: 'Marcus Rivera',
    company: 'CTO @ Dataflow',
    initials: 'MR',
    color: '#00d4a0',
    quote: 'We migrated from Heroku and our bill dropped 60%. The performance actually got better. I wish we had switched sooner.',
  },
  {
    name: 'Priya Nair',
    company: 'Lead Engineer @ Kibo',
    initials: 'PN',
    color: '#f5a623',
    quote: "The managed Postgres and Redis on the same platform is exactly what we needed. No more juggling 5 different cloud providers.",
  },
  {
    name: 'Jake Thompson',
    company: 'Indie Developer',
    initials: 'JT',
    color: '#8b6dff',
    quote: 'As a solo developer, NexDeploy lets me ship like a team. The free tier is genuinely generous and the upgrade path is smooth.',
  },
  {
    name: 'Amara Osei',
    company: 'VP Engineering @ Nimbus',
    initials: 'AO',
    color: '#6d4aff',
    quote: "Zero-downtime deploys and autoscaling saved us during our Product Hunt launch. We handled 10x normal traffic without a sweat.",
  },
  {
    name: 'David Kim',
    company: 'Staff Engineer @ Flux',
    initials: 'DK',
    color: '#00d4a0',
    quote: 'The NexDeploy Blueprint YAML lets us define our entire stack as code. Spinning up a new staging environment takes 2 minutes, not 2 hours.',
  },
]

function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  return (
    <section className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 ${inView ? 'in-view' : 'out-of-view'}`}>
          <div className="badge badge-purple inline-flex mb-4">
            <Star size={12} />
            Testimonials
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#f0f0ff' }}>
            Loved by developers
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#8888aa' }}>
            Join hundreds of thousands of developers who deploy with NexDeploy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, '-50px')

  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl flex flex-col gap-4"
      style={{
        background: '#13131f',
        border: '1px solid #1e1e2e',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#f5a623" style={{ color: '#f5a623' }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#8888aa' }}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-sora font-bold text-sm text-white flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: '#f0f0ff' }}>{t.name}</div>
          <div className="text-xs" style={{ color: '#555577' }}>{t.company}</div>
        </div>
      </div>
    </div>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'How is NexDeploy different from Heroku?',
    a: 'NexDeploy offers significantly better performance and lower pricing compared to Heroku. We provide faster build times, zero-downtime deploys on paid plans, and a modern developer experience with features like auto-deploy previews, Blueprint infrastructure-as-code, and managed Redis/Postgres in one unified platform.',
  },
  {
    q: 'Do you support Docker?',
    a: 'Yes! NexDeploy fully supports Docker. You can deploy using a Dockerfile in your repository, or pull pre-built images directly from Docker Hub or any private container registry. We support multi-stage builds for optimized production images.',
  },
  {
    q: 'Can I use a custom domain?',
    a: 'Absolutely. All paid plans include custom domain support with automatic free SSL/TLS certificates via Let\'s Encrypt. You can add any domain you own by updating your DNS records to point to our servers. Wildcard certificates are supported on Standard plans and above.',
  },
  {
    q: 'What happens when I exceed my bandwidth?',
    a: "We'll send you an email alert when you hit 80% of your bandwidth limit. If you exceed your limit, we won't immediately cut off your service — instead, we'll automatically upgrade you to the next plan tier and notify you. You can also set spending limits to prevent unexpected charges.",
  },
  {
    q: 'Is there a free tier? Does it expire?',
    a: 'Yes, our Free tier is available forever for web services (which will sleep after 15 minutes of inactivity) and static sites (which never sleep). Free PostgreSQL databases expire after 90 days. There is no time limit on the Free tier itself — you can use it as long as you like.',
  },
  {
    q: 'How does autoscaling work?',
    a: 'On Standard plans and above, NexDeploy automatically scales your service instances based on CPU and memory thresholds you configure. When traffic spikes, new instances spin up in under 30 seconds. When traffic drops, instances scale back down to save costs. You set min/max instance counts.',
  },
  {
    q: 'Do you support monorepos?',
    a: 'Yes. NexDeploy has first-class monorepo support. You can configure the root directory for each service within your monorepo, set up path-based deploy triggers (so only the affected service deploys when its code changes), and share environment variables across services.',
  },
  {
    q: 'What regions are available?',
    a: 'We currently offer 12 regions: US East (Virginia), US West (Oregon), US Central (Ohio), EU West (Frankfurt), EU North (Amsterdam), EU South (Paris), Asia Pacific (Singapore), Asia Pacific (Tokyo), Asia Pacific (Sydney), Canada (Toronto), South America (São Paulo), and India (Mumbai).',
  },
]

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  return (
    <section className="py-24" style={{ background: '#0a0a0f' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${inView ? 'in-view' : 'out-of-view'}`}>
          <div className="badge badge-purple inline-flex mb-4">
            <MessageCircle size={12} />
            FAQ
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl mb-4" style={{ color: '#f0f0ff' }}>
            Frequently asked questions
          </h2>
          <p className="text-lg" style={{ color: '#8888aa' }}>
            Everything you need to know about NexDeploy.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ item, isOpen, onToggle, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, '-30px')

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: '#13131f',
        border: `1px solid ${isOpen ? 'rgba(109,74,255,0.4)' : '#1e1e2e'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms, border-color 0.2s ease`,
      }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <span className="font-semibold text-sm" style={{ color: '#f0f0ff' }}>{item.q}</span>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: isOpen ? 'rgba(109,74,255,0.2)' : 'rgba(30,30,46,0.8)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <Plus size={12} style={{ color: isOpen ? '#8b6dff' : '#555577' }} />
        </div>
      </div>
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#8888aa' }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────

function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, '-100px')

  return (
    <section className="py-24 relative overflow-hidden noise-bg" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #3d2a99 0%, #6d4aff 40%, #8b6dff 70%, #3d2a99 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />

      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <Rocket size={12} />
          Ready to deploy?
        </div>
        <h2 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
          Deploy your first app<br />in 60 seconds
        </h2>
        <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Join 500,000+ developers who trust NexDeploy for their production workloads.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 hover:scale-105"
            style={{ background: '#fff', color: '#6d4aff' }}
          >
            Start for Free
          </button>
          <button
            className="font-semibold px-8 py-4 rounded-xl text-base text-white"
            style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}
          >
            Talk to Sales
          </button>
        </div>
        <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
          No credit card required · Free tier forever · Upgrade anytime
        </p>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      heading: 'Products',
      links: ['Web Services', 'Static Sites', 'PostgreSQL', 'Redis', 'Cron Jobs', 'Background Workers', 'Docker', 'Disks'],
    },
    {
      heading: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'],
    },
    {
      heading: 'Resources',
      links: ['Documentation', 'Changelog', 'Status', 'Community', 'Security', 'Open Source'],
    },
  ]

  return (
    <footer style={{ background: '#0a0a0f', borderTop: '1px solid #1e1e2e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}
              >
                <Rocket size={16} className="text-white" />
              </div>
              <span className="font-sora font-bold text-lg" style={{ color: '#f0f0ff' }}>NexDeploy</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#555577' }}>
              The modern cloud platform for developers. Ship faster, scale effortlessly, and sleep better.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Bird, label: 'Twitter' },
                { Icon: Code2, label: 'GitHub' },
                { Icon: MessageCircle, label: 'Discord' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{ background: '#13131f', border: '1px solid #1e1e2e', color: '#555577' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#6d4aff'
                    e.currentTarget.style.color = '#8b6dff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1e1e2e'
                    e.currentTarget.style.color = '#555577'
                  }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="font-sora font-semibold text-sm mb-4" style={{ color: '#f0f0ff' }}>
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: '#555577' }}
                      onMouseEnter={e => (e.target.style.color = '#8888aa')}
                      onMouseLeave={e => (e.target.style.color = '#555577')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid #1e1e2e' }}
        >
          <p className="text-xs" style={{ color: '#555577' }}>
            © 2025 NexDeploy, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(link => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: '#555577' }}
                onMouseEnter={e => (e.target.style.color = '#8888aa')}
                onMouseLeave={e => (e.target.style.color = '#555577')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#0a0a0f', color: '#f0f0ff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDeploySection />
      <PricingSection />
      <ComparisonTable />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  )
}
