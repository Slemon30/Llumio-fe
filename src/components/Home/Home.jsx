import React, { useState } from "react";
import { motion } from "framer-motion";

// --- ICONS (matching the design system) ---
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">
      L
    </div>
    <span className="font-semibold text-xl tracking-tight">Llumio</span>
  </div>
);

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const LockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

// --- STAGGERED CHILD VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- MAIN COMPONENT ---
export default function LandingPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-white/10">
      {/* subtle background glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.03),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(100,100,255,0.02),transparent_50%)]" />

      {/* ================= NAVBAR ================= */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 pt-5">
        <nav className="flex items-center justify-between py-3">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Live demo</a>
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-white/70 hover:text-white transition-colors">Log in</button>
            <button className="px-5 py-2.5 text-sm rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all shadow-lg shadow-white/5">
              Start free
            </button>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 tracking-wider mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          SHARED CONTEXT · TURN LOCKING · ONE WALLET
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-medium tracking-tight leading-[1.1]"
        >
          <span className="text-white">Prompt together.</span>
          <br />
          <span className="text-white/90">Pay less.</span>
          <br />
          <span className="text-white/80">Use every model.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Lumio is a collaborative prompt execution environment. Share one live LLM context window with a teammate, execute prompts in real-time with automatic turn locking, and route across top providers from a single pay-as-you-go wallet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/5 group">
            Start collaborating free
            <ArrowRight />
          </button>
          <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 text-sm">
            Watch the live demo
          </button>
        </motion.div>

        {/* trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40"
        >
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> NO CREDIT CARD</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> PAY PER EXECUTION</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> FIRST $5 ON US</span>
        </motion.div>
      </section>

      {/* ================= LIVE SESSION DEMO ================= */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
      >
        <motion.div variants={itemVariants} className="text-left mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-white/90">01 — LIVE SESSION</h2>
          <p className="text-white/50 text-sm mt-1">One window. Two cursors. Zero copy-paste.</p>
          <p className="text-white/40 text-xs mt-1">A simulation of a real shared execution — watch the turn lock, the stream, and the wallet tick.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden shadow-2xl">
          {/* window header */}
          <div className="px-5 py-3.5 bg-[#0A0A0A] border-b border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-white/30">llumio / s / lumen-4f2a</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80">2 active</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-white/90 transition-colors border border-white/5"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "Copied" : "Share session"}</span>
              </button>
            </div>
          </div>

          {/* conversation */}
          <div className="p-6 space-y-5 bg-[#0A0A0A]/80">
            {/* Maya prompt */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">M</div>
              <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-indigo-300">Maya · Prompt 1 · executed</span>
                  <span className="text-[10px] text-white/30">executed</span>
                </div>
                <p className="text-white/90 text-sm">Draft a NestJS auth controller with dynamic JWT verification.</p>
              </div>
            </div>

            {/* LLM response 1 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M15.75 3v1.5M3 9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75v-9zM9 12h.008v.008H9V12zm6 0h.008v.008H15V12zm-6 4.5h6"/></svg>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/50">gemini-2.5-flash</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">auto-routed</span>
                  </div>
                </div>
                <pre className="text-white/80 leading-relaxed font-mono text-xs whitespace-pre-wrap bg-[#0D0D0D] p-3 rounded-lg border border-white/5">
                  <span className="text-amber-400/70">@Controller</span><span className="text-white/50">('auth')</span>
                  <span className="text-white/80">export class AuthController {'{'}</span>
                  <span className="text-white/50">  constructor(private authService: AuthService) {'{'}{'}'}</span>
                  <span className="text-white/80">{'}'}</span>
                </pre>
              </div>
            </div>

            {/* Kai prompt */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">K</div>
              <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-emerald-300">Kai · Prompt 2 · streaming...</span>
                  <span className="text-[10px] text-white/30">streaming...</span>
                </div>
                <p className="text-white/90 text-sm">Add refresh-token rotation to the controller above.</p>
              </div>
            </div>

            {/* LLM response 2 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M15.75 3v1.5M3 9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75v-9zM9 12h.008v.008H9V12zm6 0h.008v.008H15V12zm-6 4.5h6"/></svg>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/50">gpt-4o-mini</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">auto-routed</span>
                  </div>
                </div>
                <pre className="text-white/80 leading-relaxed font-mono text-xs whitespace-pre-wrap bg-[#0D0D0D] p-3 rounded-lg border border-white/5">
                  <span className="text-amber-400/70">@Post</span><span className="text-white/50">("refresh")</span>
                  <span className="text-amber-400/70">@Public</span><span className="text-white/50">()</span>
                  <span className="text-white/80">async refresh</span><span className="text-white/50">(@Body() dto: RefreshDto) {'{'}</span>
                  <span className="text-white/50">  const session = await this.sessions.verify(dto.refreshToken);</span>
                  <span className="text-white/50">  const tokens = await this.tokens.rotate(session);</span>
                  <span className="text-white/50">  return tokens;</span>
                  <span className="text-white/80">{'}'}</span>
                </pre>
              </div>
            </div>

            {/* turn lock banner */}
            <div className="mt-3 p-3 rounded-xl bg-yellow-950/20 border border-yellow-500/20 flex flex-wrap items-center justify-between text-xs text-yellow-200/80">
              <div className="flex items-center gap-2">
                <LockIcon className="w-4 h-4 text-yellow-400/80" />
                <span>Turn released — window unlocked</span>
                <span className="text-yellow-400/60 ml-2">next turn: Maya</span>
              </div>
              <span className="font-mono text-[10px] opacity-60">simulated live session</span>
            </div>
          </div>

          {/* session sidebar */}
          <div className="border-t border-white/5 bg-[#0A0A0A] p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-white/40">Participants</span>
                <div className="text-white/90 mt-0.5">Maya · Kai</div>
              </div>
              <div>
                <span className="text-white/40">WALLET</span>
                <div className="text-white/90 mt-0.5">$1.42 · <span className="text-white/40">top up anytime</span></div>
              </div>
              <div>
                <span className="text-white/40">SESSION COST</span>
                <div className="text-white/90 mt-0.5">$0.0006</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/40">
              <span>ROUTE LOG</span>
              <span className="text-emerald-400/70">gemini-2.5-flash $0.0002</span>
              <span className="text-emerald-400/70">gpt-4o-mini $0.0004</span>
              <span className="text-white/30">claude-haiku standby</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ================= STATS BANNER ================= */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "LOWER TOKEN SPEND VIA ROUTING", value: "Up to 40%" },
            { label: "TOP PROVIDERS ON ONE WALLET", value: "3+" },
            { label: "TYPICAL PER-EXECUTION COST", value: "$0.0002" },
            { label: "FROM LINE TO LIVE SESSION", value: "30s" },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xl font-medium text-white/90">{stat.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <motion.section
        id="product"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-medium tracking-tight text-white/90">02 — THE WORKSPACE</h2>
          <p className="text-white/50 text-sm mt-1">Engineered for the way prompts actually happen.</p>
          <p className="text-white/40 text-sm mt-1">Chat apps are single-player. Real prompting is two people staring at the same problem — the same context, the same turn, the same wallet.</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <UsersIcon />,
              title: "Shared context window",
              desc: "Create a session and share one URL. Your partner lands in the same live context — no exported logs, no walls of pasted code in a fresh chat.",
            },
            {
              icon: <LockIcon className="w-5 h-5" />,
              title: "Execution turn-locking",
              desc: "One prompt executes at a time. While a model streams, the window locks for both of you — no collisions, no duplicate API spend, no clobbered turns.",
            },
            {
              icon: <ZapIcon />,
              title: "Dynamic model routing",
              desc: "Every prompt is routed across top providers by latency and cost targets. One wallet, itemized per execution — not three subscriptions.",
            },
          ].map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:bg-[#181818] transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-white/90">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ================= HOW IT WORKS ================= */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-medium tracking-tight text-white/90">03 — HOW IT WORKS</h2>
          <p className="text-white/50 text-sm mt-1">From link to live context in under 30 seconds.</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Create a session", desc: "Start a workspace and top up a wallet — $0 to begin, no card required." },
            { step: "02", title: "Share the link", desc: "Send the session URL. Your partner joins in one click, and the context is live the moment they arrive." },
            { step: "03", title: "Prompt together", desc: "Execute turn by turn. Watch the model stream, the lock release, and the wallet tick." },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col">
              <span className="text-4xl font-light text-white/20">{item.step}</span>
              <h3 className="text-lg font-medium mt-2 text-white/90">{item.title}</h3>
              <p className="text-sm text-white/50 mt-1 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ================= COMPARISON ================= */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-white/90">04 — WHY LLUMIO</h2>
          <p className="text-white/50 text-sm mt-1">What changes when the context is shared.</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5">
            <h3 className="text-lg font-medium text-white/50 mb-4">EVERYWHERE ELSE</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-2"><span className="text-white/20 mt-0.5">✕</span> Manual copy-paste and exported logs</li>
              <li className="flex items-start gap-2"><span className="text-white/20 mt-0.5">✕</span> Race conditions when two people prompt</li>
              <li className="flex items-start gap-2"><span className="text-white/20 mt-0.5">✕</span> Per-provider subscriptions</li>
              <li className="flex items-start gap-2"><span className="text-white/20 mt-0.5">✕</span> One account per model, per person</li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10">
            <h3 className="text-lg font-medium text-white/90 mb-4">LLUMIO</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> One shared, live context window</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Real-time turn locking, always</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> A single pay-as-you-go wallet</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> One URL to start working</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= PRICING ================= */}
      <motion.section
        id="pricing"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-white/90">05 — PRICING</h2>
          <p className="text-white/50 text-sm mt-1">Pay for what you run. Nothing else.</p>
          <p className="text-white/40 text-sm mt-1">No subscriptions. No seats. Just tokens — and one wallet that works across every provider.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#0F0F0F] border border-white/10 max-w-md mx-auto">
          <div className="text-3xl font-medium text-white/90">$0 <span className="text-base font-normal text-white/40">to start</span></div>
          <p className="text-sm text-white/50 mt-2">First $5 of usage included. Top up a wallet, then pay per execution at per-token rates.</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60 text-left">
            <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> One wallet across every provider</li>
            <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Itemized billing per execution</li>
            <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Routing targets keep costs low</li>
            <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Pause or top up anytime</li>
          </ul>
          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all">
            Start free →
          </button>
          <p className="text-[10px] text-white/30 mt-3">NO CARD · CANCEL ANYTIME</p>
        </motion.div>
      </motion.section>

      {/* ================= FINAL CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-medium text-white/90 mb-4">Ready to prompt together?</h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">Create your first shared session in under 30 seconds — free, no card required.</p>
        <button className="px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-2 mx-auto">
          Start collaborating free
          <ArrowRight />
        </button>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <Logo />
            <p className="text-white/40 text-xs mt-3 max-w-xs">The collaborative prompt execution environment — shared context, turn locking, and every model on one wallet.</p>
          </div>
          <div>
            <h4 className="text-white/40 font-medium text-xs uppercase tracking-wider mb-3">PRODUCT</h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Live demo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workspace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 font-medium text-xs uppercase tracking-wider mb-3">COMPANY</h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press kit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 font-medium text-xs uppercase tracking-wider mb-3">LEGAL</h4>
            <ul className="space-y-2 text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-white/5 text-xs text-white/30 text-center">
          © 2026 Llumio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}