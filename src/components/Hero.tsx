import React, { useState } from 'react';
import { Language, AuditReport, Finding } from '../types';
import { translations } from '../translations';
import { GeekGridCanvas } from './GeekGridCanvas';
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code2,
  Cpu,
  Radar,
  Activity,
  Globe,
  Radio,
  FileSearch,
  Braces,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  report: AuditReport;
  urlInput: string;
  setUrlInput: (val: string) => void;
  onAnalyze: (targetUrl?: string) => void;
  isAnalyzing: boolean;
  onInspectFinding: (finding: Finding) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  report,
  urlInput,
  setUrlInput,
  onAnalyze,
  isAnalyzing,
  onInspectFinding,
  onNavigateSection,
}) => {
  const t = translations[currentLang];
  const [activeConsoleTab, setActiveConsoleTab] = useState<'evidence' | 'dom' | 'bots' | 'diff'>('evidence');
  const [diffMode, setDiffMode] = useState<'side' | 'after'>('side');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onAnalyze(urlInput);
  };

  const handlePresetClick = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    onAnalyze(sampleUrl);
  };

  const highFinding = report.findings.find((f) => f.severity === 'high') || report.findings[0];
  const mediumFinding = report.findings.find((f) => f.severity === 'medium');

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="workspace" className="relative pt-12 pb-20 md:pt-16 md:pb-28 bg-[#0D1017] text-[#F3F4F6] overflow-hidden border-b border-[#202533]">
      <GeekGridCanvas />
      {/* Precision Dark Grid Pattern Background */}
      <div className="absolute inset-0 dark-hero-grid pointer-events-none"></div>

      {/* Subtle Radial Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#3156D9]/15 via-[#3156D9]/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* UPPER REGION: Semrush-grade High-Conversion Action Anchor */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Engineering kicker telemetry badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#161B26] border border-[#2D3548] text-xs font-mono text-[#94A3B8] mb-5 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3156D9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3156D9]"></span>
            </span>
            <span className="text-[#60A5FA] font-bold uppercase tracking-wider">
              {t.hero.kicker}
            </span>
            <span className="text-[#3B4660]">/</span>
            <span className="text-[#CBD5E1]">DOM & HEADER HEURISTICS 4.2</span>
          </div>

          {/* Crisp, deliberate H1 - non-screaming, no gradient circus */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.08] mb-5 text-balance">
            <span>{t.hero.h1Line1}</span>{' '}
            <span className="text-[#94A3B8] font-semibold">{t.hero.h1Line2}</span>
          </h1>

          {/* Value proposition subtitle */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            {t.hero.subtitle}
          </p>

          {/* High-Contrast Conversion Command Bar (Semrush conversion power) */}
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-4">
            <div className="relative flex items-center bg-[#FFFFFF] border-2 border-[#FFFFFF] rounded-[10px] p-1.5 shadow-[0_0_24px_rgba(49,86,217,0.18)] focus-within:ring-4 focus-within:ring-[#3156D9]/40 transition-all">
              <div className="pl-3 pr-2 text-[#3156D9] shrink-0 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#3156D9]" />
                <span className="text-xs font-mono font-bold text-[#64748B]">$</span>
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t.hero.inputPlaceholder}
                aria-label="URL to analyze"
                disabled={isAnalyzing}
                className="w-full bg-transparent border-0 text-sm sm:text-base font-mono text-[#111318] placeholder-[#94A3B8] focus:outline-none py-2 px-1 tracking-tight"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[7px] bg-[#3156D9] hover:bg-[#2546BC] active:bg-[#1E3A8A] text-white text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-md disabled:opacity-60 whitespace-nowrap group"
              >
                {isAnalyzing ? (
                  <span className="inline-flex items-center gap-2 font-mono text-xs">
                    <Radio className="w-4 h-4 animate-spin text-white" />
                    {t.hero.analyzing}
                  </span>
                ) : (
                  <>
                    <span>{t.hero.analyzeBtn}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust badges and Quick presets */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#34D399]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.hero.badge}
            </span>
            <span className="text-[#3B4660]">·</span>
            <div className="flex items-center gap-2">
              <span className="text-[#64748B]">{t.hero.quickSamples}</span>
              <button
                type="button"
                onClick={() => handlePresetClick('mandapi.net')}
                className="hover:text-white px-2 py-0.5 rounded bg-[#161B26] border border-[#2D3548] hover:border-[#3156D9] transition-all cursor-pointer text-[#CBD5E1]"
              >
                mandapi.net
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('linear.app')}
                className="hover:text-white px-2 py-0.5 rounded bg-[#161B26] border border-[#2D3548] hover:border-[#3156D9] transition-all cursor-pointer text-[#CBD5E1]"
              >
                linear.app
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('stripe.com')}
                className="hover:text-white px-2 py-0.5 rounded bg-[#161B26] border border-[#2D3548] hover:border-[#3156D9] transition-all cursor-pointer text-[#CBD5E1]"
              >
                stripe.com
              </button>
            </div>
          </div>
        </div>

        {/* LOWER REGION: Profound-grade "Product-as-Hero" Dark Inspection Workspace */}
        <div className="relative max-w-5xl mx-auto">
          {/* Engineering Frame Corners */}
          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#3156D9] z-20 pointer-events-none"></div>
          <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#3156D9] z-20 pointer-events-none"></div>

          {/* Main Inspection Deck */}
          <div className="bg-[#141822] border border-[#262C3D] rounded-[12px] shadow-2xl overflow-hidden">
            {/* Real-time laser scanning trace when active */}
            {isAnalyzing && (
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent z-30 pointer-events-none animate-laser shadow-[0_0_12px_#3156D9]"></div>
            )}

            {/* Deck Window Title Bar */}
            <div className="px-5 py-3.5 border-b border-[#202533] bg-[#0E1119] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]/80"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]/80"></span>
                </div>
                <div className="h-4 w-[1px] bg-[#2D3548]"></div>
                <span className="font-mono text-xs font-semibold text-white flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>{report.url.replace(/^https?:\/\//, '')}</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#10B981]/15 text-[#34D399] text-[10px] font-mono border border-[#10B981]/30">
                    HTTP {report.httpStatus} OK
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
                <span>TTFB: <strong className="text-white font-medium">{report.responseTimeMs}ms</strong></span>
                <span className="text-[#3B4660]">·</span>
                <span className="text-[#34D399] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  Server Stream Verified
                </span>
              </div>
            </div>

            {/* Deck Navigation Tabs (Profound inspection tabs) */}
            <div className="px-5 pt-3 pb-2 border-b border-[#202533] bg-[#121620] flex items-center justify-between gap-4 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setActiveConsoleTab('evidence')}
                  className={`px-3 py-1.5 rounded-[5px] font-semibold transition-all cursor-pointer ${
                    activeConsoleTab === 'evidence'
                      ? 'bg-[#3156D9] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A202E]'
                  }`}
                >
                  01. Active Evidence Stream ({report.findings.length})
                </button>
                <button
                  onClick={() => setActiveConsoleTab('dom')}
                  className={`px-3 py-1.5 rounded-[5px] font-semibold transition-all cursor-pointer ${
                    activeConsoleTab === 'dom'
                      ? 'bg-[#3156D9] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A202E]'
                  }`}
                >
                  02. Raw DOM & Head
                </button>
                <button
                  onClick={() => setActiveConsoleTab('bots')}
                  className={`px-3 py-1.5 rounded-[5px] font-semibold transition-all cursor-pointer ${
                    activeConsoleTab === 'bots'
                      ? 'bg-[#3156D9] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A202E]'
                  }`}
                >
                  03. AI Bot Directives ({report.bots.length})
                </button>
                <button
                  onClick={() => setActiveConsoleTab('diff')}
                  className={`px-3 py-1.5 rounded-[5px] font-semibold transition-all cursor-pointer ${
                    activeConsoleTab === 'diff'
                      ? 'bg-[#3156D9] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A202E]'
                  }`}
                >
                  04. Pre/Post-Fix Diff
                </button>
              </div>

              {/* Auxiliary Readiness Tag (Compact, NOT a giant donut) */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono shrink-0">
                <span className="text-[#64748B] uppercase">READINESS INDEX:</span>
                <span className="px-2 py-0.5 rounded bg-[#161B26] border border-[#2D3548] text-white font-bold">
                  {report.score} <span className="text-[#64748B] font-normal">/ 100</span>
                </span>
              </div>
            </div>

            {/* Deck Body: The Live Working System */}
            <div className="p-5 sm:p-6 min-h-[380px]">
              {/* TAB 1: ACTIVE EVIDENCE STREAM */}
              {activeConsoleTab === 'evidence' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left Column (7 cols): Priority Findings with Raw Snippets */}
                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pb-1 border-b border-[#202533]">
                      <span>DETECTED CODE ISSUES & ATTRIBUTES</span>
                      <span>ACTION PRIORITY</span>
                    </div>

                    {/* Finding 1: Canonical */}
                    {highFinding && (
                      <div
                        onClick={() => onInspectFinding(highFinding)}
                        className="group border border-[#2D3548] hover:border-[#3156D9] rounded-[8px] p-4 bg-[#161B26]/80 hover:bg-[#1A202E] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded-[4px] border border-[#EF4444]/30">
                              HIGH
                            </span>
                            <span className="text-sm font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                              {t.findingsContent[highFinding.titleKey]?.title || highFinding.id}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white transition-colors" />
                        </div>

                        <p className="text-xs text-[#94A3B8] mb-2 leading-relaxed">
                          {t.findingsContent[highFinding.titleKey]?.desc}
                        </p>

                        <div className="bg-[#0E1119] border border-[#222836] rounded-[6px] p-2.5 text-xs font-mono text-[#E2E8F0] overflow-x-auto whitespace-pre">
                          <span className="text-[#EF4444] mr-1.5 font-bold">-</span>
                          <code>{highFinding.rawEvidence}</code>
                        </div>
                      </div>
                    )}

                    {/* Finding 2: Authorship Entity */}
                    {mediumFinding && (
                      <div
                        onClick={() => onInspectFinding(mediumFinding)}
                        className="group border border-[#2D3548] hover:border-[#3156D9] rounded-[8px] p-4 bg-[#161B26]/80 hover:bg-[#1A202E] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30">
                              MEDIUM
                            </span>
                            <span className="text-sm font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                              {t.findingsContent[mediumFinding.titleKey]?.title || mediumFinding.id}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-white transition-colors" />
                        </div>

                        <p className="text-xs text-[#94A3B8] mb-2 leading-relaxed">
                          {t.findingsContent[mediumFinding.titleKey]?.desc}
                        </p>

                        <div className="bg-[#0E1119] border border-[#222836] rounded-[6px] p-2.5 text-xs font-mono text-[#E2E8F0] overflow-x-auto whitespace-pre">
                          <code>{mediumFinding.rawEvidence}</code>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column (5 cols): AI Search Bots & Remediation Spec */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Live AI Crawler Directives Box */}
                    <div className="border border-[#2D3548] rounded-[8px] p-4 bg-[#161B26]/60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold uppercase text-white flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[#60A5FA]" />
                          AI Crawler Directives
                        </span>
                        <span className="text-[11px] font-mono text-[#34D399]">
                          robots.txt
                        </span>
                      </div>

                      <div className="space-y-2 text-xs font-mono">
                        {report.bots.slice(0, 4).map((bot) => (
                          <div
                            key={bot.botName}
                            className="flex items-center justify-between py-1.5 px-2 rounded bg-[#0E1119] border border-[#202533]"
                          >
                            <span className="text-[#CBD5E1] font-medium">{bot.botName}</span>
                            {bot.status === 'allowed' ? (
                              <span className="text-[10px] font-bold text-[#34D399] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                                Allowed (200)
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-[#EF4444] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                                Blocked
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PR-Ready Remediation Code Snippet */}
                    <div className="border border-[#2D3548] rounded-[8px] p-4 bg-[#161B26]/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#60A5FA] font-semibold uppercase flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          Recommended PR Fix
                        </span>
                        <button
                          onClick={() => copyCode(highFinding?.remediationCode || '')}
                          className="text-[11px] text-[#94A3B8] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedSnippet ? (
                            <>
                              <Check className="w-3 h-3 text-[#34D399]" />
                              <span className="text-[#34D399]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Fix</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-2.5 rounded bg-[#0E1119] border border-[#202533] text-xs font-mono text-[#34D399] overflow-x-auto whitespace-pre">
                        <code>{highFinding?.remediationCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: RAW DOM & HEAD */}
              {activeConsoleTab === 'dom' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-1 border-b border-[#202533]">
                    <span>PARSED HEAD SECTION (HTTP 200)</span>
                    <span>1,842 BYTES EXTRACTED</span>
                  </div>
                  <pre className="p-4 rounded-[8px] bg-[#0E1119] border border-[#202533] text-xs text-[#CBD5E1] overflow-x-auto leading-relaxed">
                    <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="canonical" href="${report.url}/" />
  <meta name="description" content="Technical SEO & AI Search Readiness Engineering Evidence Tool" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MandAPI",
    "url": "${report.url}"
  }
  </script>
</head>`}</code>
                  </pre>
                </div>
              )}

              {/* TAB 3: AI BOT DIRECTIVES */}
              {activeConsoleTab === 'bots' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-xs text-[#94A3B8] pb-1 border-b border-[#202533]">
                    ROBOTS.TXT AI CRAWLER ACCESS RULES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.bots.map((b) => (
                      <div key={b.botName} className="p-3.5 rounded-[8px] bg-[#161B26] border border-[#2D3548] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{b.botName}</span>
                          <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#34D399] font-bold text-[10px] uppercase border border-[#10B981]/30">
                            {b.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8]">{b.agent}</p>
                        <pre className="p-2 rounded bg-[#0E1119] border border-[#202533] text-[11px] text-[#E2E8F0]">
                          <code>{b.ruleSnippet}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PRE/POST-FIX DIFF */}
              {activeConsoleTab === 'diff' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#202533]">
                    <span className="text-xs text-[#94A3B8]">BASELINE DIFF (BEFORE VS AFTER DEPLOY)</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDiffMode('side')}
                        className={`px-2.5 py-1 rounded text-[11px] ${
                          diffMode === 'side' ? 'bg-[#3156D9] text-white' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        Side-by-Side
                      </button>
                      <button
                        onClick={() => setDiffMode('after')}
                        className={`px-2.5 py-1 rounded text-[11px] ${
                          diffMode === 'after' ? 'bg-[#3156D9] text-white' : 'text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        Verified Code
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-[8px] bg-[#EF4444]/10 border border-[#EF4444]/30">
                      <span className="text-[10px] font-bold text-[#EF4444] uppercase block mb-1.5">
                        - BEFORE DEPLOY (BASELINE DEFECT)
                      </span>
                      <pre className="text-xs text-[#EF4444] overflow-x-auto whitespace-pre leading-relaxed">
                        <code>&lt;link rel="canonical" href="https://mandapi.net/en/" /&gt;
&lt;!-- Mismatching root path request --&gt;</code>
                      </pre>
                    </div>

                    <div className="p-4 rounded-[8px] bg-[#10B981]/10 border border-[#10B981]/30">
                      <span className="text-[10px] font-bold text-[#34D399] uppercase block mb-1.5">
                        + AFTER DEPLOY (VERIFIED RESOLUTION)
                      </span>
                      <pre className="text-xs text-[#34D399] overflow-x-auto whitespace-pre leading-relaxed">
                        <code>&lt;link rel="canonical" href="https://mandapi.net/" /&gt;
&lt;!-- Perfectly aligned canonical target --&gt;</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deck Bottom Bar: Direct Navigation Anchor */}
            <div className="px-5 py-3 border-t border-[#202533] bg-[#0E1119] flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">
                {report.findings.length} verifiable tag assertions loaded
              </span>
              <button
                onClick={() => onNavigateSection('evidence')}
                className="inline-flex items-center gap-1.5 text-[#60A5FA] hover:text-white font-semibold transition-colors cursor-pointer group"
              >
                <span>{t.hero.viewEvidenceBtn}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
