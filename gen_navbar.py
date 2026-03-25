navbar = r"""
// \u2500\u2500\u2500 Navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function Navbar({ user, onSignIn, onSignUp, onSignOut, onDashboard, onOpenCmdK, currentPage, onStatusPage }) {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropRef = useRef(null)
  const navLinks = ['Products', 'Pricing', 'Docs', 'Blog', 'Changelog']

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border-color' : ''}`}
        style={{ borderBottomColor: scrolled ? '#1e1e2e' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}>
                <Rocket size={16} className="text-white" />
              </div>
              <span className="font-sora font-bold text-lg text-text-primary">NexDeploy</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link} href="#" className="text-sm font-medium hover-underline transition-colors duration-200"
                  style={{ color: '#8888aa' }}
                  onMouseEnter={e => (e.target.style.color = '#f0f0ff')}
                  onMouseLeave={e => (e.target.style.color = '#8888aa')}>
                  {link}
                </a>
              ))}
              <button onClick={onStatusPage}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: currentPage === 'status' ? '#00d4a0' : '#8888aa', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f0ff')}
                onMouseLeave={e => (e.currentTarget.style.color = currentPage === 'status' ? '#00d4a0' : '#8888aa')}>
                Status
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={onOpenCmdK}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ color: '#555577', border: '1px solid #1e1e2e', background: '#13131f' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6d4aff'; e.currentTarget.style.color = '#8b6dff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e2e'; e.currentTarget.style.color = '#555577' }}
                title="Open command palette (Ctrl+K)">
                <Command size={12} /><span>K</span>
              </button>

              {user ? (
                <div className="relative" ref={dropRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all"
                    style={{ background: 'rgba(109,74,255,0.1)', border: '1px solid rgba(109,74,255,0.2)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: user.color || '#6d4aff' }}>
                      {user.initials}
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#f0f0ff' }}>{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} style={{ color: '#8888aa' }} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl py-1 shadow-2xl"
                      style={{ background: '#13131f', border: '1px solid #1e1e2e', zIndex: 999 }}>
                      <div className="px-4 py-3 border-b" style={{ borderColor: '#1e1e2e' }}>
                        <div className="text-sm font-semibold" style={{ color: '#f0f0ff' }}>{user.name}</div>
                        <div className="text-xs" style={{ color: '#555577' }}>{user.email}</div>
                      </div>
                      {[
                        { label: 'Dashboard', icon: BarChart3, action: () => { onDashboard('services'); setDropdownOpen(false) } },
                        { label: 'Settings', icon: Settings, action: () => { onDashboard('settings'); setDropdownOpen(false) } },
                        { label: 'Billing', icon: CreditCard, action: () => { onDashboard('billing'); setDropdownOpen(false) } },
                      ].map(item => (
                        <button key={item.label} onClick={item.action}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
                          style={{ color: '#8888aa', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(109,74,255,0.1)'; e.currentTarget.style.color = '#f0f0ff' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8888aa' }}>
                          <item.icon size={14} />{item.label}
                        </button>
                      ))}
                      <div className="border-t mt-1" style={{ borderColor: '#1e1e2e' }} />
                      <button onClick={() => { onSignOut(); setDropdownOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <LogOut size={14} />Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={onSignIn}
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    style={{ color: '#8888aa' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f0f0ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8888aa')}>
                    Sign In
                  </button>
                  <button onClick={onSignUp}
                    className="text-sm font-semibold px-4 py-2 rounded-lg btn-glow text-white"
                    style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}>
                    Get Started Free
                  </button>
                </>
              )}
            </div>

            <button className="md:hidden p-2 rounded-lg transition-colors" style={{ color: '#8888aa' }} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 p-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: '#0f0f1a', borderLeft: '1px solid #1e1e2e' }}>
          <div className="flex justify-end mb-8">
            <button onClick={() => setMenuOpen(false)} style={{ color: '#8888aa' }}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a key={link} href="#" className="text-base font-medium py-2" style={{ color: '#8888aa' }} onClick={() => setMenuOpen(false)}>{link}</a>
            ))}
            <button onClick={() => { onStatusPage && onStatusPage(); setMenuOpen(false) }} className="text-base font-medium py-2 text-left" style={{ color: '#8888aa', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}>Status</button>
            <div className="h-px my-2" style={{ background: '#1e1e2e' }} />
            {user ? (
              <>
                <button onClick={() => { onDashboard('services'); setMenuOpen(false) }} className="text-sm font-medium py-2 text-left" style={{ color: '#8888aa', background: 'none', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                <button onClick={() => { onSignOut(); setMenuOpen(false) }} className="text-sm font-medium py-2 text-left" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { onSignIn && onSignIn(); setMenuOpen(false) }} className="text-sm font-medium py-2 text-left" style={{ color: '#8888aa', background: 'none', border: 'none', cursor: 'pointer' }}>Sign In</button>
                <button onClick={() => { onSignUp && onSignUp(); setMenuOpen(false) }}
                  className="text-sm font-semibold px-4 py-3 rounded-lg text-white text-center"
                  style={{ background: 'linear-gradient(135deg, #6d4aff, #8b6dff)' }}>
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
"""
print(navbar[:100])
print("OK len:", len(navbar))
