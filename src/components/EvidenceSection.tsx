import React, { useState } from 'react';
import { Language, AuditReport, Finding } from '../types';
import { translations } from '../translations';
import {
  Code2,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  GitCompare,
  Terminal,
  FileCode,
  Shield,
  Bot,
  ExternalLink,
} from 'lucide-react';

interface EvidenceSectionProps {
  currentLang: Language;
  report: AuditReport;
  onInspectFinding: (finding: Finding) => void;
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

  // Technical SEO items (compact rows)
  const techItems: EvidenceItem[] = [
    {
      id: 'tech-http',
      title: 'HTTP Status & TLS Handshake',
      value: `200 OK · TLS 1.3 · ${report.responseTimeMs}ms TTFB`,
      severity: 'pass' as const,
      snippet: 'HTTP/2 200 OK\nstrict-transport-security: max-age=31536000; includeSubDomains\nx-content-type-options: nosniff\ncontent-type: text/html; charset=utf-8',
      desc: 'Response headers confirm secure HTTPS enforcement with HSTS preloaded.',
    },
    {
      id: 'tech-canonical',
      title: 'Canonical URL Integrity',
      value: 'Mismatch with requested URL root path',
      severity: 'high' as const,
      snippet: '<link rel="canonical" href="https://mandapi.net/en/" />',
      remediation: '<link rel="canonical" href="https://mandapi.net/" />',
      desc: t.findingsContent.canonicalMismatch?.desc,
    },
    {
      id: 'tech-meta',
      title: 'Metadata & Character Encodings',
      value: 'Title 52ch · Description 142ch · UTF-8 declared',
      severity: 'pass' as const,
      snippet: '<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>MandAPI GEO — Technical SEO & AI Readiness</title>\n<meta name="description" content="Technical SEO and AI Search Readiness Engineering Tool..." />',
      desc: 'Optimal length for both search engine SERP snippets and browser title bars.',
    },
    {
      id: 'tech-headings',
      title: 'Heading Outline & Hierarchy',
      value: '1x H1 · 4x H2 · 6x H3 (Strict order preserved)',
      severity: 'pass' as const,
      snippet: '<h1>MandAPI GEO</h1>\n  <h2>Evidence Inspection</h2>\n    <h3>Technical SEO</h3>\n    <h3>AI Readiness</h3>',
      desc: 'Valid outline without skipping heading levels or duplicating page H1s.',
    },
    {
      id: 'tech-links',
      title: 'Internal Link Structure & Fragment Anchors',
      value: '28 valid relative links · 0 broken local anchors',
      severity: 'pass' as const,
      snippet: '<a href="#evidence">Methodology</a>\n<a href="#pipeline">Workflow</a>',
      desc: 'All internal href tags are crawlable with semantic anchor text.',
    },
    {
      id: 'tech-sitemap',
      title: 'Sitemap Declaration & Robots Directive',
      value: 'sitemap.xml referenced in robots.txt',
      severity: 'pass' as const,
      snippet: 'User-agent: *\nAllow: /\nSitemap: https://mandapi.net/sitemap.xml',
      desc: 'Provides automated discovery path for new URLs and document revisions.',
    },
    {
      id: 'tech-index',
      title: 'Index & Follow Directives',
      value: 'index, follow declared',
      severity: 'pass' as const,
      snippet: '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
      desc: 'Explicit permissions granted for web indexing and rich snippet expansion.',
    },
  ];

  // AI Search Readiness items
  const aiItems: EvidenceItem[] = [
    {
      id: 'ai-crawlers',
      title: 'AI Search Bot Access Rules',
      value: 'OAI-SearchBot Allowed · Perplexity Allowed · Claude-SearchBot Unknown',
      severity: 'medium' as const,
      snippet: 'User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\n# Notice: Claude-SearchBot not explicitly defined',
      remediation: 'User-agent: Claude-SearchBot\nAllow: /',
      desc: 'Ensures conversational AI search agents can fetch real-time public content for citations.',
    },
    {
      id: 'ai-content',
      title: 'Extractable Semantic Content & Hydration Safety',
      value: 'Clean DOM text ratio (42%) · No client hydration blankout',
      severity: 'pass' as const,
      snippet: '<main id="content">\n  <article class="prose">\n    <!-- Server-rendered text available to headless parsers without JS -->\n  </article>\n</main>',
      desc: 'Core content is extractable by headless Python/Curl scrapers without JavaScript rendering.',
    },
    {
      id: 'ai-semantic',
      title: 'Semantic HTML5 Landmark Roles',
      value: '<header>, <main>, <article>, <section>, <footer>',
      severity: 'pass' as const,
      snippet: '<header role="banner">...</header>\n<main role="main">...</main>\n<footer role="contentinfo">...</footer>',
      desc: 'Allows LLM chunking algorithms to isolate primary article content from boilerplates.',
    },
    {
      id: 'ai-authorship',
      title: 'Authorship & Organization Credentials',
      value: 'Missing Author / Person entity in JSON-LD',
      severity: 'medium' as const,
      snippet: '/* Schema.org document missing "author" or "publisher" entity */',
      remediation: '"author": {\n  "@type": "Person",\n  "name": "MandAPI Engineering Team",\n  "url": "https://mandapi.net/about"\n}',
      desc: t.findingsContent.authorMissing?.desc,
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
    <section id="evidence" className="py-16 md:py-24 bg-[#F7F6F2]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#3156D9] mb-2 px-2.5 py-1 rounded bg-[#3156D9]/8 border border-[#3156D9]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3156D9]"></span>
            EVIDENCE BENCHMARK 4.0
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111318] tracking-tight mb-3">
            {t.evidenceSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4B515D] leading-relaxed">
            {t.evidenceSection.subtitle}
          </p>
        </div>

        {/* 3 Real Product Modules / Tabs */}
        <div className="bg-[#FFFFFF] border border-[#DEDFDA] rounded-[12px] shadow-xs overflow-hidden">
          {/* Tab Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#DEDFDA] bg-[#F1F1EE]/50 px-4 sm:px-6 pt-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('tech')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'tech'
                    ? 'border-[#3156D9] text-[#111318] bg-[#FFFFFF] rounded-t-[6px]'
                    : 'border-transparent text-[#6B7078] hover:text-[#111318]'
                }`}
              >
                A — {t.evidenceSection.tabTech}
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'border-[#3156D9] text-[#111318] bg-[#FFFFFF] rounded-t-[6px]'
                    : 'border-transparent text-[#6B7078] hover:text-[#111318]'
                }`}
              >
                B — {t.evidenceSection.tabAi}
              </button>
              <button
                onClick={() => setActiveTab('verify')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'verify'
                    ? 'border-[#3156D9] text-[#111318] bg-[#FFFFFF] rounded-t-[6px]'
                    : 'border-transparent text-[#6B7078] hover:text-[#111318]'
                }`}
              >
                C — {t.evidenceSection.tabVerification}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 py-2 text-xs font-mono text-[#6B7078]">
              <span className="w-2 h-2 rounded-full bg-[#39735B]"></span>
              <span>Evidence Engine v4</span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Search and Filter Toolbar (Semrush / Siteimprove Table Controls) */}
            {activeTab !== 'verify' && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F1F1EE]">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter checks (e.g. canonical, author, robot)..."
                    className="w-full pl-3 pr-8 py-1.5 text-xs font-mono bg-[#F7F6F2] border border-[#DEDFDA] rounded-md text-[#111318] placeholder-[#969AA1] focus:outline-none focus:border-[#3156D9] focus:bg-[#FFFFFF] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#969AA1] hover:text-[#111318]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-[11px] text-[#969AA1] mr-1">Severity:</span>
                  <button
                    onClick={() => setSeverityFilter('all')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'all'
                        ? 'bg-[#111318] text-white'
                        : 'bg-[#F7F6F2] text-[#6B7078] hover:text-[#111318]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSeverityFilter('high')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'high'
                        ? 'bg-[#B64C4C] text-white'
                        : 'bg-[#B64C4C]/10 text-[#B64C4C] hover:bg-[#B64C4C]/20'
                    }`}
                  >
                    High
                  </button>
                  <button
                    onClick={() => setSeverityFilter('medium')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'medium'
                        ? 'bg-[#A56A19] text-white'
                        : 'bg-[#A56A19]/10 text-[#A56A19] hover:bg-[#A56A19]/20'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSeverityFilter('pass')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      severityFilter === 'pass'
                        ? 'bg-[#39735B] text-white'
                        : 'bg-[#39735B]/10 text-[#39735B] hover:bg-[#39735B]/20'
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
                <div className="flex items-center justify-between pb-2 text-xs font-mono uppercase text-[#6B7078] border-b border-[#F1F1EE]">
                  <span>CHECK / ATTRIBUTE ({filterItems(techItems).length})</span>
                  <span>EVIDENCE STATUS</span>
                </div>

                {filterItems(techItems).length === 0 ? (
                  <div className="text-center py-10 font-mono text-xs text-[#969AA1]">
                    No technical checks match the current search filter.
                  </div>
                ) : (
                  filterItems(techItems).map((item) => (
                  <div
                    key={item.id}
                    className="group border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF] hover:border-[#C8CAC4] hover:shadow-xs transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        {item.severity === 'high' ? (
                          <span className="text-[10px] font-mono font-bold uppercase text-[#B64C4C] bg-[#B64C4C]/10 px-2 py-0.5 rounded-[4px]">
                            HIGH
                          </span>
                        ) : item.severity === 'medium' ? (
                          <span className="text-[10px] font-mono font-bold uppercase text-[#A56A19] bg-[#A56A19]/10 px-2 py-0.5 rounded-[4px]">
                            MEDIUM
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold uppercase text-[#39735B] bg-[#39735B]/10 px-2 py-0.5 rounded-[4px]">
                            PASS
                          </span>
                        )}
                        <h4 className="text-sm font-semibold text-[#111318]">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-[#4B515D]">
                        {item.value}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B7078] mb-3">
                      {item.desc}
                    </p>

                    {/* Code Snippet Box */}
                    <div className="relative bg-[#F7F6F2] border border-[#DEDFDA] rounded-[6px] p-3 text-xs font-mono text-[#30343B]">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#DEDFDA]/60 text-[10px] text-[#969AA1]">
                        <span>RAW CAPTURE</span>
                        <button
                          onClick={() => handleCopy(item.id, item.snippet)}
                          className="hover:text-[#111318] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedSnippetId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#39735B]" />
                              <span className="text-[#39735B]">{t.evidenceSection.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t.evidenceSection.copyCode}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed">
                        <code>{item.snippet}</code>
                      </pre>

                      {item.remediation && (
                        <div className="mt-2.5 pt-2 border-t border-[#DEDFDA]/60">
                          <span className="block text-[10px] font-mono font-semibold text-[#3156D9] uppercase mb-1">
                            {t.evidenceSection.remediationLabel}
                          </span>
                          <pre className="overflow-x-auto text-[11px] text-[#111318] bg-[#FFFFFF] p-2 rounded-[4px] border border-[#DEDFDA]">
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

            {/* Tab B: AI Search Readiness */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                {/* AI Search Bot Table */}
                <div className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111318]">
                        {t.evidenceSection.botDirectivesTitle}
                      </h4>
                      <p className="text-xs text-[#6B7078] mt-0.5">
                        {t.evidenceSection.botDirectivesDesc}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#39735B]">
                      robots.txt inspection
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {report.bots.map((bot) => (
                      <div
                        key={bot.botName}
                        className="border border-[#DEDFDA] rounded-[6px] p-3 bg-[#F7F6F2]/50"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-semibold text-[#111318]">
                            {bot.botName}
                          </span>
                          {bot.status === 'allowed' ? (
                            <span className="text-[10px] font-mono font-semibold text-[#39735B] bg-[#39735B]/10 px-1.5 py-0.5 rounded-[4px]">
                              Allowed
                            </span>
                          ) : bot.status === 'disallowed' ? (
                            <span className="text-[10px] font-mono font-semibold text-[#B64C4C] bg-[#B64C4C]/10 px-1.5 py-0.5 rounded-[4px]">
                              Blocked
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-semibold text-[#6B7078] bg-[#DEDFDA] px-1.5 py-0.5 rounded-[4px]">
                              Unknown
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6B7078] mb-2">
                          {t.botContent[bot.descriptionKey]?.desc || bot.agent}
                        </p>
                        <pre className="text-[10px] font-mono text-[#30343B] bg-[#FFFFFF] p-1.5 rounded-[4px] border border-[#DEDFDA] overflow-x-auto">
                          <code>{bot.ruleSnippet}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Readiness Check Cards */}
                <div className="space-y-3">
                  {filterItems(aiItems).length === 0 ? (
                    <div className="text-center py-10 font-mono text-xs text-[#969AA1]">
                      No AI readiness checks match the current search filter.
                    </div>
                  ) : (
                    filterItems(aiItems).map((item) => (
                    <div
                      key={item.id}
                      className="group border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF] hover:border-[#C8CAC4] hover:shadow-xs transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          {item.severity === 'high' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#B64C4C] bg-[#B64C4C]/10 px-2 py-0.5 rounded-[4px]">
                              HIGH
                            </span>
                          ) : item.severity === 'medium' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#A56A19] bg-[#A56A19]/10 px-2 py-0.5 rounded-[4px]">
                              MEDIUM
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#39735B] bg-[#39735B]/10 px-2 py-0.5 rounded-[4px]">
                              PASS
                            </span>
                          )}
                          <h4 className="text-sm font-semibold text-[#111318]">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-[#4B515D]">
                          {item.value}
                        </span>
                      </div>

                      <p className="text-xs text-[#6B7078] mb-3">
                        {item.desc}
                      </p>

                      <div className="relative bg-[#F7F6F2] border border-[#DEDFDA] rounded-[6px] p-3 text-xs font-mono text-[#30343B]">
                        <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed">
                          <code>{item.snippet}</code>
                        </pre>

                        {item.remediation && (
                          <div className="mt-2.5 pt-2 border-t border-[#DEDFDA]/60">
                            <span className="block text-[10px] font-mono font-semibold text-[#3156D9] uppercase mb-1">
                              {t.evidenceSection.remediationLabel}
                            </span>
                            <pre className="overflow-x-auto text-[11px] text-[#111318] bg-[#FFFFFF] p-2 rounded-[4px] border border-[#DEDFDA]">
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
                {/* Summary Scoreboard (Linear DevTools Style) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]">
                    <span className="text-[11px] font-mono uppercase text-[#6B7078] block">
                      {t.verificationTab.resolvedCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#39735B] mt-1 block">
                      4
                    </span>
                    <span className="text-[11px] text-[#6B7078] mt-0.5 block">
                      Defects eliminated
                    </span>
                  </div>

                  <div className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]">
                    <span className="text-[11px] font-mono uppercase text-[#6B7078] block">
                      {t.verificationTab.remainingCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#A56A19] mt-1 block">
                      1
                    </span>
                    <span className="text-[11px] text-[#6B7078] mt-0.5 block">
                      Requires PR fix
                    </span>
                  </div>

                  <div className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]">
                    <span className="text-[11px] font-mono uppercase text-[#6B7078] block">
                      {t.verificationTab.newCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#111318] mt-1 block">
                      0
                    </span>
                    <span className="text-[11px] text-[#6B7078] mt-0.5 block">
                      No regressions
                    </span>
                  </div>

                  <div className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]">
                    <span className="text-[11px] font-mono uppercase text-[#6B7078] block">
                      {t.verificationTab.unknownCountLabel}
                    </span>
                    <span className="text-2xl font-bold font-mono text-[#6B7078] mt-1 block">
                      1
                    </span>
                    <span className="text-[11px] text-[#6B7078] mt-0.5 block">
                      Crawler cache sync
                    </span>
                  </div>
                </div>

                {/* View Mode Segmented Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 border border-[#DEDFDA] rounded-md p-1 bg-[#F1F1EE] text-xs font-mono">
                    <button
                      onClick={() => setVerifyViewMode('diff')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'diff'
                          ? 'bg-[#FFFFFF] text-[#111318] shadow-xs'
                          : 'text-[#6B7078] hover:text-[#111318]'
                      }`}
                    >
                      Side-by-Side Diff
                    </button>
                    <button
                      onClick={() => setVerifyViewMode('after')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'after'
                          ? 'bg-[#FFFFFF] text-[#111318] shadow-xs'
                          : 'text-[#6B7078] hover:text-[#111318]'
                      }`}
                    >
                      {t.verificationTab.afterLabel}
                    </button>
                    <button
                      onClick={() => setVerifyViewMode('before')}
                      className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                        verifyViewMode === 'before'
                          ? 'bg-[#FFFFFF] text-[#111318] shadow-xs'
                          : 'text-[#6B7078] hover:text-[#111318]'
                      }`}
                    >
                      {t.verificationTab.beforeLabel}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#6B7078] hidden sm:inline">
                    Baseline: commit 8f9b2d · Current: HEAD
                  </span>
                </div>

                {/* Verification Items List */}
                <div className="space-y-4">
                  {report.verification.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#DEDFDA] rounded-[8px] p-4 bg-[#FFFFFF]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {item.status === 'resolved' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#39735B] bg-[#39735B]/10 px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {t.verificationTab.statusResolved}
                            </span>
                          ) : item.status === 'remaining' ? (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#A56A19] bg-[#A56A19]/10 px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {t.verificationTab.statusRemaining}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold uppercase text-[#6B7078] bg-[#DEDFDA] px-2 py-0.5 rounded-[4px]">
                              {t.verificationTab.statusUnknown}
                            </span>
                          )}
                          <span className="text-xs font-semibold text-[#111318]">
                            {t.findingsContent[item.itemKey]?.title || item.itemKey}
                          </span>
                        </div>
                      </div>

                      {/* Code Diff Display */}
                      {verifyViewMode === 'diff' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                          <div className="bg-[#B64C4C]/5 border border-[#B64C4C]/20 rounded-[6px] p-3">
                            <span className="block text-[10px] uppercase font-bold text-[#B64C4C] mb-1">
                              - BEFORE FIX (BASELINE)
                            </span>
                            <pre className="text-[11px] text-[#B64C4C] overflow-x-auto whitespace-pre">
                              <code>{item.beforeSnippet}</code>
                            </pre>
                          </div>
                          <div className="bg-[#39735B]/5 border border-[#39735B]/20 rounded-[6px] p-3">
                            <span className="block text-[10px] uppercase font-bold text-[#39735B] mb-1">
                              + AFTER FIX (POST-DEPLOY)
                            </span>
                            <pre className="text-[11px] text-[#39735B] overflow-x-auto whitespace-pre">
                              <code>{item.afterSnippet}</code>
                            </pre>
                          </div>
                        </div>
                      ) : verifyViewMode === 'after' ? (
                        <div className="bg-[#F7F6F2] border border-[#DEDFDA] rounded-[6px] p-3 text-xs font-mono">
                          <pre className="text-[11px] text-[#111318] overflow-x-auto whitespace-pre">
                            <code>{item.afterSnippet}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="bg-[#F7F6F2] border border-[#DEDFDA] rounded-[6px] p-3 text-xs font-mono">
                          <pre className="text-[11px] text-[#111318] overflow-x-auto whitespace-pre">
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
