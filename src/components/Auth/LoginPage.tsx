import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  FileCheck
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, darkMode, setDarkMode }) => {
  const [orgId, setOrgId] = useState('ORG-8820');
  const [email, setEmail] = useState('administrator@enterprise.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('English (US)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Subtle Abstract Geometric Shapes Background (No Neon / No AI Brains) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand Header + Top Right Controls */}
      <header className="relative z-10 px-6 lg:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white font-outfit tracking-tight">LoyalLens Enterprise</h1>
            <p className="text-[11px] text-slate-400 font-medium">Customer Retention Management Platform</p>
          </div>
        </div>

        {/* Language Selector & Dark Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-blue-600"
            >
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
              <option value="German (DE)">Deutsch (DE)</option>
              <option value="French (FR)">Français (FR)</option>
            </select>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Main Split Content Zone */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT SIDE: Professional Enterprise Business Illustration & Growth Dashboard */}
        <div className="lg:col-span-7 space-y-8 hidden lg:block">
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Enterprise Customer Management Solution
            </span>
            <h2 className="text-4xl font-extrabold text-white font-outfit tracking-tight leading-tight">
              Enterprise Retention Intelligence & Growth Platform
            </h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Empower your customer success, sales, and account management teams with real-time operational risk analytics, customer health scoring, and automated retention workflows.
            </p>
          </div>

          {/* Corporate Analytics Dashboard Graphic Mockup (No AI/Robots) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 font-mono ml-2">LoyalLens Workspace Console</span>
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SOC 2 Certified
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">Monitored Revenue</span>
                <div className="text-xl font-bold text-white font-outfit">$48.5M</div>
                <span className="text-[10px] text-emerald-400">+12.4% ARR Growth</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">Retention Rate</span>
                <div className="text-xl font-bold text-emerald-400 font-outfit">94.8%</div>
                <span className="text-[10px] text-slate-400">Enterprise Cohort</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px]">Risk Mitigation</span>
                <div className="text-xl font-bold text-blue-400 font-outfit">$1.82M</div>
                <span className="text-[10px] text-slate-400">Saved This Quarter</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Bank-Grade Enterprise Compliance</h4>
                  <p className="text-slate-400 text-[11px]">Encrypted customer telemetry data with automated role-based access governance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Corporate Employee / Business Portal Form */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            
            <div>
              <h3 className="text-2xl font-bold text-white font-outfit">Welcome Back</h3>
              <p className="text-xs text-slate-400 mt-1">
                Sign in to continue to your organization workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Organization ID */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">Organization ID</label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    placeholder="Enter Organization ID (e.g. ORG-8820)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Business Email */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">Business Email</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">Password</label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded bg-slate-950 border-slate-800"
                  />
                  <span className="text-slate-400">Remember Me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-400 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            {/* Small Corporate Trust Badges */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block text-center">
                Enterprise Security & Compliance
              </span>
              <div className="flex flex-wrap justify-center items-center gap-2 text-[10px] text-slate-400 font-medium">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> 256-bit SSL
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-blue-400" /> ISO 27001
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" /> SOC 2 Ready
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  MFA Supported
                </span>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Corporate Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>© 2026 LoyalLens Enterprise. All rights reserved.</span>
        <span className="flex items-center space-x-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Secure Business Platform
          </span>
        </span>
      </footer>

    </div>
  );
};
