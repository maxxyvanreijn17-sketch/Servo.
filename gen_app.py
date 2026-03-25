import sys

with open('/home/runner/work/Servo/Servo/src/App.jsx', 'r') as f:
    old = f.read()

terminal_start = old.find('\n// ─── Terminal Typewriter')
pricing_start = old.find('\n// ─── Pricing')
comparison_start = old.find('\n// ─── Comparison Table')
cta_start = old.find('\n// ─── CTA Banner')

# These sections are unchanged
terminal_to_pricing = old[terminal_start:pricing_start]
comparison_to_cta = old[comparison_start:cta_start]

parts = []

# 1. IMPORTS
parts.append("""import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Rocket, Menu, X, ChevronDown, ChevronRight, Check, Minus,
  Globe, Database, Clock, Cpu, Package, Server, HardDrive, GitBranch,
  Zap, Shield, Bird, Code2, MessageCircle, Star, Plus,
  ArrowRight, Play, Cloud, Lock, BarChart3, Users, Settings,
  Terminal, Layers, RefreshCw, CheckCircle, XCircle, Activity,
  Eye, EyeOff, Download, Search, Trash2, Copy, Bell, Command,
  ChevronUp, LogOut, CreditCard, Sliders, AlertTriangle,
  MoreHorizontal, ExternalLink, RotateCcw, Filter, SortAsc, Edit2, Info
} from 'lucide-react'
""")

# 2. HELPERS
parts.append("""
// \u2500\u2500\u2500 Helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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
""")

with open('/home/runner/work/Servo/Servo/src/App.jsx', 'r') as f:
    print("Script loaded OK", file=sys.stderr)
print("Parts so far:", len(parts), file=sys.stderr)
