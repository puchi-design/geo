import React, { useState } from 'react';
import { Language, AuditReport } from '../types';
import { translations } from '../translations';
import {
  Code,
  Check,
  Copy,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Shield,
  FileCode,
  Layers,
  Sparkles,
} from 'lucide-react';

interface EvidenceSectionProps {
  currentLang: Language;
  report: AuditReport;
  onInspectFinding?: (finding: any) => void;
}

interface EvidenceItem {
  id: string;
  title: string;
  value: string;
  severity: 'high' | 'medium' | 'pass';
  snippet: string;
  remediation?: string;
  desc?: string;
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  currentLang,
  report,
  onInspectFinding,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'tech' | 'ai' | 'verify'>('tech');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [verifyViewMode, setVerifyViewMode] = useState<'diff' | 'after' | 'before'>('diff');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'pass'>('all');

  const filterItems = (items: EvidenceItem[]) => {
    return items.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const techItems: EvidenceItem[] = [
    {
      id: 'canonical',
      title: 'Canonical URL Target Match',
      value: 'Self-referencing with trailing slash divergence',
      severity: 'high' as const,
      snippet: '<link rel="canonical" href="https://mandapi.net/en/" />',
      remediation: '<link rel="canonical" href="https://mandapi.net/" />',
      desc: t.findingsContent.canonicalSelf?.desc,
    },
    {
      id: 'title-tag',
      title: 'Document Title Tag Length',
      value: '42 characters · Optimal range (35-65)',
      severity: 'pass' as const,
      snippet: '<title>MandAPI GEO - Technical SEO & AI Readiness Evidence Engine</title>',
      desc: 'Optimal title length prevents SERP truncation across desktop and mobile snippets.',
    },
    {
      id: 'meta-description',
      title: 'Meta Description Attribute',
      value: '148 characters · Within safe threshold',
      severity: 'pass' as const,
      snippet: '<meta name="description" content="Inspect raw DOM head tags, robots.txt AI search bot directives, and verify baseline changes with deterministic evidence." />',
      desc: 'Accurate description provides semantic summary for indexing models and search previews.',
    },
    {
      id: 'h1-count',
      title: 'Document H1 Heading Structure',
      value: 'Exactly 1 H1 identified in parsed DOM',
      severity: 'pass' as const,
      snippet: '<h1 class="text-4xl font-semibold">See what search engines see.</h1>',
      desc: 'Single clear H1 heading establishes definitive document topic for semantic crawlers.',
    },
    {
      id: 'robots-meta',
      title: 'Robots Meta Tag Directives',
      value: 'index, follow, max-image-preview:large',
      severity: 'pass' as const,
      snippet: '<meta name="robots" content="index, follow, max-image-preview:large" />',
      desc: 'Explicit directives instruct search engines on crawling and indexing permissions.',
    },
    {
      id: 'http-status',
      title: 'HTTP Response Status Code',
      value: '200 OK (TTFB 142ms)',
      severity: 'pass' as const,
      snippet: 'HTTP/2 200 OK\ncontent-type: text/html; charset=UTF-8\nx-frame-options: SAMEORIGIN',
      desc: 'Clean 200 response ensures crawlers do not encounter redirect hops or soft 404s.',
    },
  ];

  const aiItems: EvidenceItem[] = [
    {
      id: 'ai-bot-oai',
      title: 'OpenAI SearchBot (OAI-SearchBot)',
      value: 'Explicitly allowed in robots.txt',
      severity: 'pass' as const,
      snippet: 'User-agent: OAI-SearchBot\nAllow: /',
      desc: 'Allows OpenAI live web search agents to discover and summarize pages.',
    },
    {
      id: 'ai-bot-perplexity',
      title: 'Perplexity Bot (PerplexityBot)',
      value: 'Allowed under global wildcard * rule',
      severity: 'pass' as const,
      snippet: 'User-agent: *\nAllow: /\nSitemap: https://mandapi.net/sitemap.xml',
      desc: 'Ensures Perplexity answer engine can index real-time page content.',
    },
    {
      id: 'ai-author',
      title: 'Authorship & Person Entity Declaration',
      value: 'Schema.org Article lacks explicit "author" entity',
      severity: 'medium' as const,
      snippet: '<!-- Missing "author": {"@type": "Person", "name": "..."} in Schema.org -->',
      remediation: '{\n  "@context": "https://schema.org",\n  "@type": "TechArticle",\n  "author": {\n    "@type": "Organization",\n    "name": "MandAPI Engineering"\n  }\n}',
      desc: t.findingsContent.authorDeclared?.desc,
    },
    {
      id: 'ai-freshness',
      title: 'Freshness & Modification Timestamps',
      value: 'Missing standard ISO 8601 dateModified',
      severity: 'medium' as const,
      snippet: '<!-- No dateModified in meta or JSON-LD -->',
      remediation: '<meta property="article:modified_time" content="2026-09-27T08:00:00Z" />',
      desc: t.findingsContent.freshnessDate?.desc,
    },
    {
      id: 'ai-structured-data',
      title: 'Structured Data Schema (JSON-LD)',
      value: 'WebSite + TechArticle Schemas detected',
      severity: 'pass' as const,
      snippet: '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "name": "MandAPI",\n  "url": "https://mandapi.net"\n}\n</script>',
      desc: 'Valid structured data enhances semantic entity matching across knowledge graphs.',
    },
  ];

  return (
    <section id="evidence" className="py-16 md:py-24 bg-[#0B0E14] text-[#F3F4F6] border-b border-[#202636]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#60A5FA] mb-2 px-2.5 py-1 rounded bg-[#161B26] border border-[#2D3548]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3156D9]"></span>
            EVIDENCE BENCHMARK 4.0
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {t.evidenceSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.evidenceSection.subtitle}
          </p>
        </div>

        {/* 3 Real Product Modules / Tabs */}
        <div className="bg-[#121620] border border-[#202636] rounded-[12px] shadow-xl overflow-hidden">
          {/* Tab Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#202636] bg-[#0E121B] px-4 sm:px-6 pt-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('tech')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'tech'
                    ? 'border-[#3156D9] text-white bg-[#121620] rounded-t-[6px]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                A — {t.evidenceSection.tabTech}
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'border-[#3156D9] text-white bg-[#121620] rounded-t-[6px]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                B — {t.evidenceSection.tabAi}
              </button>
              <button
                onClick={() => setActiveTab('verify')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'verify'
                    ? 'border-[#3156D9] text-white bg-[#121620] rounded-t-[6px]'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}
              >
                C — {t.evidenceSection.tabVerification}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 py-2 text-xs font-mono text-[#94A3B8]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>Evidence Engine v4.2</span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Search and Filter Toolbar */}
            {activeTab !== 'verify' && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2433]">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter checks (e.g. canonical, author, robot)..."
                    className="w-full pl-3 pr-8 py-2 text-xs font-mono bg-[#0E121B] border border-[#262E40] rounded-md text-white placeholder-[#64748B] focus:outline-none focus:border-[#3156D9] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-[11px] text-[#64748B] mr-1">Severity:</span>
                  <button
                    onClick={() => setSeverityFilter('all')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'all'
                        ? 'bg-[#3156D9] text-white font-bold'
                        : 'bg-[#181D2A] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSeverityFilter('high')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'high'
                        ? 'bg-[#EF4444] text-white font-bold'
                        : 'bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25'
                    }`}
                  >
                    High
                  </button>
                  <button
                    onClick={() => setSeverityFilter('medium')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'medium'
                        ? 'bg-[#F59E0B] text-white font-bold'
                        : 'bg-[#F59E0B]/15 text-[#F59E0B] hover:bg-[#F59E0B]/25'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSeverityFilter('pass')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'pass'
                        ? 'bg-[#10B981] text-white font-bold'
                        : 'bg-[#10B981]/15 text-[#34D399] hover:bg-[#10B981]/25'
                    }`}
                  >
                    Passed
                  </button>
                </div>
              </div>
            )}

            {/* Tab A: Technical SEO Compact Rows */}
            {activeTab === 'tech' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 text-xs font-mono uppercase text-[#94A3B8] border-b border-[#1E2433]">
                  <span>CHECK / ATTRIBUTE ({filterItems(techItems).length})</span>
                  <span>EVIDENCE STATUS</span>
                </div>

                {filterItems(techItems).length === 0 ? (
                  <div className="text-center py-10 font-mono text-xs text-[#64748B]">
                    No technical checks match the current search filter.
                  </div>
                ) : (
                  filterItems(techItems).map((item) => (
                    <div
                      key={item.id}
                      className="group border border-[#202636] hover:border-[#3156D9] rounded-[8px] p-4 bg-[#141824] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          {item.severity === 'high' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded-[4px] border border-[#EF4444]/30">
                              HIGH
                            </span>
                          ) : item.severity === 'medium' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30">
                              MEDIUM
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded-[4px] border border-[#10B981]/30">
                              PASS
                            </span>
                          )}
                          <h4 className="text-sm font-semibold text-white">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-[#CBD5E1]">
                          {item.value}
                        </span>
                      </div>

                      <p className="text-xs text-[#94A3B8] mb-3">
                        {item.desc}
                      </p>

                      {/* Code Snippet Box */}
                      <div className="relative bg-[#0E121B] border border-[#1E2433] rounded-[6px] p-3 text-xs font-mono text-[#CBD5E1]">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#1E2433] text-[10px] text-[#64748B]">
                          <span>RAW CAPTURE</span>
                          <button
                            onClick={() => handleCopy(item.id, item.snippet)}
                            className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {copiedSnippetId === item.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#34D399]" />
                                <span className="text-[#34D399]">{t.evidenceSection.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{t.evidenceSection.copyCode}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto text-[11px] leading-relaxed">
                          <code>{item.snippet}</code>
                        </pre>

                        {/* Remediation Snippet */}
                        {item.remediation && (
                          <div className="mt-2.5 pt-2 border-t border-[#1E2433]">
                            <span className="block text-[10px] font-mono font-semibold text-[#60A5FA] uppercase mb-1">
                              {t.evidenceSection.remediationLabel}
                            </span>
                            <pre className="overflow-x-auto text-[11px] text-[#34D399] bg-[#141824] p-2 rounded-[4px] border border-[#202636]">
                              <code>{item.remediation}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab B: AI Search Readiness Heuristics */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                {/* AI Bots Directives Table */}
                <div className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]">
                  <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#CBD5E1] mb-3">
                    {t.evidenceSection.botDirectivesTitle}
                  </span>
                  <div className="space-y-2">
                    {report.bots.map((bot) => (
                      <div
                        key={bot.botName}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-2 px-3 border border-[#202636] bg-[#0E121B] rounded-[6px] gap-2 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{bot.botName}</span>
                          <span className="text-[11px] text-[#94A3B8]">({bot.agent})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <code className="text-[11px] text-[#CBD5E1] bg-[#141824] px-1.5 py-0.5 rounded border border-[#202636]">
                            {bot.ruleSnippet}
                          </code>
                          {bot.status === 'allowed' ? (
                            <span className="text-[11px] font-bold text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                              Allowed
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded border border-[#EF4444]/30">
                              Disallowed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Readiness Check Cards */}
                <div className="space-y-3">
                  {filterItems(aiItems).length === 0 ? (
                    <div className="text-center py-10 font-mono text-xs text-[#64748B]">
                      No AI readiness checks match the current search filter.
                    </div>
                  ) : (
                    filterItems(aiItems).map((item) => (
                      <div
                        key={item.id}
                        className="group border border-[#202636] hover:border-[#3156D9] rounded-[8px] p-4 bg-[#141824] transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            {item.severity === 'medium' ? (
                              <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30">
                                MEDIUM
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono font-bold uppercase text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded-[4px] border border-[#10B981]/30">
                                PASS
                              </span>
                            )}
                            <h4 className="text-sm font-semibold text-white">
                              {item.title}
                            </h4>
                          </div>
                          <span className="text-xs font-mono text-[#CBD5E1]">
                            {item.value}
                          </span>
                        </div>

                        <p className="text-xs text-[#94A3B8] mb-3">
                          {item.desc}
                        </p>

                        <div className="relative bg-[#0E121B] border border-[#1E2433] rounded-[6px] p-3 text-xs font-mono text-[#CBD5E1]">
                          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#1E2433] text-[10px] text-[#64748B]">
                            <span>RAW CAPTURE</span>
                            <button
                              onClick={() => handleCopy(item.id, item.snippet)}
                              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedSnippetId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-[#34D399]" />
                                  <span className="text-[#34D399]">{t.evidenceSection.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{t.evidenceSection.copyCode}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="overflow-x-auto text-[11px] leading-relaxed">
                            <code>{item.snippet}</code>
                          </pre>

                          {item.remediation && (
                            <div className="mt-2.5 pt-2 border-t border-[#1E2433]">
                              <span className="block text-[10px] font-mono font-semibold text-[#60A5FA] uppercase mb-1">
                                {t.evidenceSection.remediationLabel}
                              </span>
                              <pre className="overflow-x-auto text-[11px] text-[#34D399] bg-[#141824] p-2 rounded-[4px] border border-[#202636]">
                                <code>{item.remediation}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab C: Change Verification (Before → After Matrix) */}
            {activeTab === 'verify' && (
              <div className="space-y-6">
                {/* Summary Scoreboard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]">
                    <span className="text-[11px] font-mono uppercase text-[#94A3B8] block">
                      {t.verificationTab.resolvedCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#34D399] mt-1 block">
                      4
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-0.5 block">
                      Defects eliminated
                    </span>
                  </div>

                  <div className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]">
                    <span className="text-[11px] font-mono uppercase text-[#94A3B8] block">
                      {t.verificationTab.remainingCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#F59E0B] mt-1 block">
                      1
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-0.5 block">
                      Requires PR fix
                    </span>
                  </div>

                  <div className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]">
                    <span className="text-[11px] font-mono uppercase text-[#94A3B8] block">
                      {t.verificationTab.newCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-white mt-1 block">
                      0
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-0.5 block">
                      No regressions
                    </span>
                  </div>

                  <div className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]">
                    <span className="text-[11px] font-mono uppercase text-[#94A3B8] block">
                      {t.verificationTab.unknownCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#94A3B8] mt-1 block">
                      1
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-0.5 block">
                      Crawler cache sync
                    </span>
                  </div>
                </div>

                {/* View Mode Segmented Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 border border-[#262E40] rounded-md p-1 bg-[#0E121B] text-xs font-mono">
                    <button
                      onClick={() => setVerifyViewMode('diff')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'diff'
                          ? 'bg-[#3156D9] text-white shadow-xs'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      Side-by-Side Diff
                    </button>
                    <button
                      onClick={() => setVerifyViewMode('after')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'after'
                          ? 'bg-[#3156D9] text-white shadow-xs'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {t.verificationTab.afterLabel}
                    </button>
                    <button
                      onClick={() => setVerifyViewMode('before')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'before'
                          ? 'bg-[#3156D9] text-white shadow-xs'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {t.verificationTab.beforeLabel}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#64748B] hidden sm:inline">
                    Baseline: commit 8f9b2d · Current: HEAD
                  </span>
                </div>

                {/* Verification Items List */}
                <div className="space-y-4">
                  {report.verification.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#202636] rounded-[8px] p-4 bg-[#141824]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {item.status === 'resolved' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded-[4px] border border-[#10B981]/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {t.verificationTab.statusResolved}
                            </span>
                          ) : item.status === 'remaining' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {t.verificationTab.statusRemaining}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#94A3B8] bg-[#181D2A] px-2 py-0.5 rounded-[4px] border border-[#262E40]">
                              {t.verificationTab.statusUnknown}
                            </span>
                          )}
                          <span className="text-xs font-semibold text-white">
                            {t.findingsContent[item.itemKey]?.title || item.itemKey}
                          </span>
                        </div>
                      </div>

                      {/* Code Diff Display */}
                      {verifyViewMode === 'diff' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[6px] p-3">
                            <span className="block text-[10px] uppercase font-bold text-[#EF4444] mb-1">
                              - BEFORE FIX (BASELINE)
                            </span>
                            <pre className="text-[11px] text-[#EF4444] overflow-x-auto whitespace-pre">
                              <code>{item.beforeSnippet}</code>
                            </pre>
                          </div>
                          <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-[6px] p-3">
                            <span className="block text-[10px] uppercase font-bold text-[#34D399] mb-1">
                              + AFTER FIX (POST-DEPLOY)
                            </span>
                            <pre className="text-[11px] text-[#34D399] overflow-x-auto whitespace-pre">
                              <code>{item.afterSnippet}</code>
                            </pre>
                          </div>
                        </div>
                      ) : verifyViewMode === 'after' ? (
                        <div className="bg-[#0E121B] border border-[#1E2433] rounded-[6px] p-3 text-xs font-mono">
                          <pre className="text-[11px] text-[#34D399] overflow-x-auto whitespace-pre">
                            <code>{item.afterSnippet}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="bg-[#0E121B] border border-[#1E2433] rounded-[6px] p-3 text-xs font-mono">
                          <pre className="text-[11px] text-[#EF4444] overflow-x-auto whitespace-pre">
                            <code>{item.beforeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
