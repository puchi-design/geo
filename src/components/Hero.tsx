import React, { useState } from 'react';
import { Language, AuditReport, Finding } from '../types';
import { translations } from '../translations';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code,
  Layers,
  Sparkles,
  Cpu,
  Radar,
  Activity,
  Globe,
  Radio,
  FileSearch,
  FileCode,
  GitBranch,
  Braces,
  Share2,
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
  const [activeConsoleTab, setActiveConsoleTab] = useState<'overview' | 'dom' | 'bots' | 'schema' | 'diff'>('overview');

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

  return (
    <section id="workspace" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden tech-grid-pattern border-b border-[#DEDFDA]">
      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F2]/40 via-transparent to-[#F7F6F2] pointer-events-none"></div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: 55% width (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Technical kicker with active telemetry indicator */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#FFFFFF] border border-[#DEDFDA] text-[11px] font-mono font-semibold tracking-wider uppercase text-[#3156D9] shadow-2xs">
                <Radar className="w-3 h-3 text-[#3156D9] animate-spin" style={{ animationDuration: '6s' }} />
                {t.hero.kicker}
              </span>
              <span className="text-[#C8CAC4]" aria-hidden="true">/</span>
              <span className="text-[11px] font-mono text-[#39735B] flex items-center gap-1.5 bg-[#39735B]/8 px-2 py-0.5 rounded-[4px] border border-[#39735B]/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39735B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#39735B]"></span>
                </span>
                HEADLESS DOM PARSER 4.2
              </span>
              <span className="text-[#C8CAC4] hidden sm:inline" aria-hidden="true">/</span>
              <span className="text-[11px] font-mono text-[#6B7078] hidden sm:inline">
                ISO/IEC 10646 COMPLIANT
              </span>
            </div>

            {/* H1 - High-impact editorial typography with Space Grotesk */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#111318] tracking-tight leading-[1.05] mb-6 text-balance">
              <span className="block">{t.hero.h1Line1}</span>
              <span className="block text-[#4B515D] font-semibold">{t.hero.h1Line2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4B515D] leading-relaxed max-w-xl mb-8 font-normal">
              {t.hero.subtitle}
            </p>

            {/* URL Command Bar - High-tech Terminal Input */}
            <form onSubmit={handleSubmit} className="w-full max-w-xl mb-3">
              <div className="relative flex items-center bg-[#FFFFFF] border-2 border-[#DEDFDA] rounded-[10px] p-1.5 shadow-sm hover:border-[#C8CAC4] focus-within:border-[#3156D9] focus-within:ring-4 focus-within:ring-[#3156D9]/10 transition-all">
                <div className="pl-3 pr-2 text-[#3156D9] shrink-0 flex items-center gap-1">
                  <Terminal className="w-4 h-4 text-[#3156D9]" />
                  <span className="text-xs font-mono font-bold text-[#969AA1]">$</span>
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t.hero.inputPlaceholder}
                  aria-label="URL to analyze"
                  disabled={isAnalyzing}
                  className="w-full bg-transparent border-0 text-sm sm:text-base font-mono text-[#111318] placeholder-[#969AA1] focus:outline-none py-2.5 px-1 tracking-tight"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[7px] bg-[#3156D9] hover:bg-[#2648BC] active:bg-[#1E3A8A] text-white text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-xs disabled:opacity-60 whitespace-nowrap group"
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

            {/* Simulated Live Scan Milestones when Analyzing */}
            {isAnalyzing && (
              <div className="w-full max-w-xl mb-4 p-3 rounded-[8px] bg-[#FFFFFF] border border-[#3156D9]/30 text-xs font-mono text-[#3156D9] space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span>ANALYZING PAGE STREAM</span>
                  <span className="animate-pulse">142ms</span>
                </div>
                <div className="w-full bg-[#F1F1EE] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3156D9] h-full w-4/5 animate-pulse rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#6B7078] pt-1">
                  <span>[1/5] DNS Resolve (4ms)</span>
                  <span>[2/5] TLS 1.3 (18ms)</span>
                  <span>[3/5] Headless DOM (68ms)</span>
                  <span>[4/5] AI Rules</span>
                </div>
              </div>
            )}

            {/* Quiet metadata and quick samples */}
            <div className="flex flex-wrap items-center gap-y-2 text-xs text-[#6B7078] mb-4 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39735B]" />
                {t.hero.badge}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B7078]">
              <span className="text-[#969AA1] flex items-center gap-1">
                <FileSearch className="w-3.5 h-3.5" />
                {t.hero.quickSamples}
              </span>
              <button
                type="button"
                onClick={() => handlePresetClick('mandapi.net')}
                className="hover:text-[#3156D9] px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#DEDFDA] hover:border-[#3156D9] transition-all cursor-pointer"
              >
                mandapi.net
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('linear.app')}
                className="hover:text-[#3156D9] px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#DEDFDA] hover:border-[#3156D9] transition-all cursor-pointer"
              >
                linear.app
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('docs.stripe.com')}
                className="hover:text-[#3156D9] px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#DEDFDA] hover:border-[#3156D9] transition-all cursor-pointer"
              >
                stripe.com
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('siteimprove.com')}
                className="hover:text-[#3156D9] px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#DEDFDA] hover:border-[#3156D9] transition-all cursor-pointer"
              >
                siteimprove.com
              </button>
            </div>
          </div>

          {/* Right Column: 45% width (5 cols on lg) - Multi-Tab Software Console Slice */}
          <div className="lg:col-span-5 relative">
            {/* Tech Corner Markers */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#3156D9] z-20 pointer-events-none"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#3156D9] z-20 pointer-events-none"></div>

            <div className="relative bg-[#FFFFFF] border border-[#DEDFDA] rounded-[12px] shadow-md overflow-hidden transition-all">
              {/* Laser Scanning Line */}
              {isAnalyzing && (
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3156D9] to-transparent z-30 pointer-events-none animate-laser shadow-[0_0_8px_#3156D9]"></div>
              )}

              {/* Terminal Title Bar */}
              <div className="px-4 py-3 border-b border-[#DEDFDA] bg-[#111318] text-[#F7F6F2] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B64C4C]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A56A19]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#39735B]/80"></span>
                  </div>
                  <span className="ml-2 font-mono text-xs font-semibold text-[#F7F6F2] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#3156D9]" />
                    {report.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-[#39735B]/20 text-[#10B981] border border-[#10B981]/30">
                    HTTP {report.httpStatus}
                  </span>
                  <span className="text-[#6B7078]">·</span>
                  <span className="text-[#969AA1]">{report.responseTimeMs}ms</span>
                </div>
              </div>

              {/* Console Sub-Tab Bar (Semrush / Siteimprove interactive fidelity) */}
              <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-[#DEDFDA] bg-[#F7F6F2] text-xs font-mono overflow-x-auto">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveConsoleTab('overview')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeConsoleTab === 'overview'
                        ? 'bg-[#FFFFFF] text-[#111318] font-bold shadow-2xs border border-[#DEDFDA]'
                        : 'text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('dom')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeConsoleTab === 'dom'
                        ? 'bg-[#FFFFFF] text-[#111318] font-bold shadow-2xs border border-[#DEDFDA]'
                        : 'text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    DOM & Head
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('bots')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeConsoleTab === 'bots'
                        ? 'bg-[#FFFFFF] text-[#111318] font-bold shadow-2xs border border-[#DEDFDA]'
                        : 'text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    AI Bots
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('schema')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeConsoleTab === 'schema'
                        ? 'bg-[#FFFFFF] text-[#111318] font-bold shadow-2xs border border-[#DEDFDA]'
                        : 'text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    Schema
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('diff')}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeConsoleTab === 'diff'
                        ? 'bg-[#FFFFFF] text-[#111318] font-bold shadow-2xs border border-[#DEDFDA]'
                        : 'text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    Diff
                  </button>
                </div>
              </div>

              {/* Console Tab Content */}
              <div className="p-4 sm:p-5 space-y-4">
                {activeConsoleTab === 'overview' && (
                  <>
                    {/* Auxiliary Readiness Index */}
                    <div className="flex items-center justify-between border-b border-[#F1F1EE] pb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#3156D9]" />
                          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7078]">
                            {t.hero.readinessLabel}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="font-display text-3xl font-bold font-mono text-[#111318] tabular-nums">
                            {report.score}
                          </span>
                          <span className="text-xs font-mono text-[#969AA1]">/ 100</span>
                          <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#39735B]/10 text-[#39735B] font-semibold">
                            OPTIMAL LEVEL
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[11px] font-mono text-[#6B7078]">
                          {t.hero.singlePageAudit}
                        </span>
                        <span className="inline-block text-xs font-mono font-medium text-[#39735B] mt-0.5">
                          {report.passedCount} passed · {report.attentionCount} attention
                        </span>
                      </div>
                    </div>

                    {/* Priority Finding 1 */}
                    {highFinding && (
                      <div
                        onClick={() => onInspectFinding(highFinding)}
                        className="group border border-[#DEDFDA] rounded-[8px] p-3.5 bg-[#F7F6F2]/50 hover:bg-[#FFFFFF] hover:border-[#3156D9] hover:shadow-xs transition-all cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#B64C4C] bg-[#B64C4C]/10 px-1.5 py-0.5 rounded-[4px] border border-[#B64C4C]/20">
                              HIGH
                            </span>
                            <span className="text-xs font-semibold text-[#111318] group-hover:text-[#3156D9] transition-colors">
                              {t.findingsContent[highFinding.titleKey]?.title || highFinding.id}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-[#969AA1] group-hover:text-[#3156D9] transition-transform group-hover:translate-x-0.5" />
                        </div>

                        <div className="mt-2 bg-[#FFFFFF] border border-[#DEDFDA] rounded-[6px] p-2 text-[11px] font-mono text-[#30343B] overflow-x-auto whitespace-pre group-hover:border-[#3156D9]/30 transition-colors">
                          <span className="text-[#B64C4C] mr-1.5 font-bold">-</span>
                          <code>{highFinding.rawEvidence}</code>
                        </div>
                      </div>
                    )}

                    {/* Priority Finding 2 */}
                    {mediumFinding && (
                      <div
                        onClick={() => onInspectFinding(mediumFinding)}
                        className="group border border-[#DEDFDA] rounded-[8px] p-3.5 bg-[#F7F6F2]/50 hover:bg-[#FFFFFF] hover:border-[#3156D9] hover:shadow-xs transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#A56A19] bg-[#A56A19]/10 px-1.5 py-0.5 rounded-[4px] border border-[#A56A19]/20">
                              MEDIUM
                            </span>
                            <span className="text-xs font-semibold text-[#111318] group-hover:text-[#3156D9] transition-colors">
                              {t.findingsContent[mediumFinding.titleKey]?.title || mediumFinding.id}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-[#969AA1] group-hover:text-[#3156D9]" />
                        </div>
                        <p className="text-[11px] text-[#6B7078] line-clamp-1 font-mono">
                          {mediumFinding.evidenceType === 'json' ? 'Schema.org JSON-LD' : 'HTML meta'} · Line {mediumFinding.line}
                        </p>
                      </div>
                    )}

                    {/* AI Search Bot Directives Table */}
                    <div className="border border-[#DEDFDA] rounded-[8px] p-3 bg-[#FFFFFF]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B7078] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[#3156D9]" />
                          AI SEARCH CRAWLER ACCESS
                        </span>
                        <span className="text-[11px] font-mono text-[#39735B] bg-[#39735B]/10 px-1.5 py-0.5 rounded">
                          robots.txt
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        {report.bots.slice(0, 3).map((bot) => (
                          <div key={bot.botName} className="flex items-center justify-between py-1 border-b border-[#F1F1EE] last:border-b-0">
                            <span className="text-[#30343B] font-medium">{bot.botName}</span>
                            {bot.status === 'allowed' ? (
                              <span className="text-[11px] font-semibold text-[#39735B] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#39735B]"></span>
                                Allowed
                              </span>
                            ) : bot.status === 'disallowed' ? (
                              <span className="text-[11px] font-semibold text-[#B64C4C] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B64C4C]"></span>
                                Blocked
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium text-[#6B7078] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#969AA1]"></span>
                                Unknown
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeConsoleTab === 'dom' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#6B7078]">
                      <span>RAW EXTRACTED HEAD / METADATA</span>
                      <span>UTF-8 · 2.4 KB</span>
                    </div>
                    <pre className="p-3 rounded-[6px] bg-[#F7F6F2] border border-[#DEDFDA] text-[11px] text-[#30343B] overflow-x-auto leading-relaxed">
                      <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="canonical" href="${report.url}/" />
  <meta name="description" content="Technical SEO and AI Search Readiness Engineering Tool" />
  <meta name="robots" content="index, follow" />
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

                {activeConsoleTab === 'bots' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7078] pb-1 border-b border-[#F1F1EE]">
                      AI SEARCH ENGINE AGENT DECLARATIONS (robots.txt)
                    </div>
                    {report.bots.map((b) => (
                      <div key={b.botName} className="p-2.5 rounded bg-[#F7F6F2] border border-[#DEDFDA] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#111318]">{b.botName}</span>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${b.status === 'allowed' ? 'bg-[#39735B]/10 text-[#39735B]' : 'bg-[#DEDFDA] text-[#6B7078]'}`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#6B7078]">{b.agent}</p>
                        <pre className="text-[10px] bg-[#FFFFFF] p-1.5 rounded border border-[#DEDFDA]/70 text-[#30343B]">
                          <code>{b.ruleSnippet}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {activeConsoleTab === 'schema' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#6B7078]">
                      <span>SCHEMA.ORG ENTITY GRAPH</span>
                      <span className="text-[#39735B]">Validated</span>
                    </div>
                    <div className="p-3 rounded bg-[#F7F6F2] border border-[#DEDFDA] text-[11px] leading-relaxed text-[#30343B]">
                      <div className="flex items-center gap-1.5 text-[#3156D9] font-bold">
                        <Braces className="w-3.5 h-3.5" />
                        <span>Entity: WebSite</span>
                      </div>
                      <div className="ml-4 pl-2 border-l border-[#DEDFDA] my-1 text-[10px] text-[#6B7078]">
                        ├─ name: "MandAPI"<br />
                        ├─ url: "${report.url}"<br />
                        └─ publisher: Organization ("MandAPI Team")
                      </div>
                      <div className="flex items-center gap-1.5 text-[#A56A19] font-bold mt-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Entity: TechArticle (Missing Author)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeConsoleTab === 'diff' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7078]">
                      BEFORE VS AFTER DEPLOYMENT VERIFICATION
                    </div>
                    <div className="p-2.5 rounded bg-[#B64C4C]/8 border border-[#B64C4C]/20 text-[#B64C4C] text-[11px]">
                      <span className="font-bold">- Before: </span>
                      <code>&lt;link rel="canonical" href="https://mandapi.net/en/" /&gt;</code>
                    </div>
                    <div className="p-2.5 rounded bg-[#39735B]/8 border border-[#39735B]/20 text-[#39735B] text-[11px]">
                      <span className="font-bold">+ After: </span>
                      <code>&lt;link rel="canonical" href="https://mandapi.net/" /&gt;</code>
                    </div>
                  </div>
                )}

                {/* Bottom Inspection Link */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-[#F1F1EE]">
                  <span className="text-[#6B7078] text-[11px]">
                    {report.findings.length} verifiable tag inspections
                  </span>
                  <button
                    onClick={() => onNavigateSection('evidence')}
                    className="inline-flex items-center gap-1 text-[#3156D9] hover:text-[#2648BC] font-semibold cursor-pointer group"
                  >
                    <span>{t.hero.viewEvidenceBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
