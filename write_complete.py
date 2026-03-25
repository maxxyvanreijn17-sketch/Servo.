with open('/home/runner/work/Servo/Servo/src/App.jsx', 'r') as f:
    old = f.read()

terminal_start = old.find('\n// ─── Terminal Typewriter')
pricing_start = old.find('\n// ─── Pricing')
comparison_start = old.find('\n// ─── Comparison Table')
cta_start = old.find('\n// ─── CTA Banner')

terminal_to_pricing = old[terminal_start:pricing_start]
comparison_to_cta = old[comparison_start:cta_start]

new_content = open('/home/runner/work/Servo/Servo/src/App.jsx').read()
print("Ready to write. Sections extracted:")
print("terminal_to_pricing:", len(terminal_to_pricing))
print("comparison_to_cta:", len(comparison_to_cta))
