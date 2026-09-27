import React, { useState } from 'react';
import { Language } from '../types';
import { Copy, Check, Terminal, Code2, GitBranch, ArrowRight } from 'lucide-react';

interface DeveloperCliSectionProps {
  currentLang: Language;
}

export const DeveloperCliSection: React.FC<DeveloperCliSectionProps> = ({ currentLang }) => {
  const isZh = currentLang === 'zh';
  const isPt = currentLang === 'pt';

  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'github'>('curl');
  const [copied, setCopied] = useState(false);

  const snippets = {
    curl: `# Run instant deterministic technical SEO and GEO check via CLI
curl -s -X POST "https://api.mandapi.net/v1/geo/audit" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://mandapi.net", "mode": "strict_headless"}' | jq .`,
    node: `import { MandApiGeo } from '@mandapi/geo-client';

const client = new MandApiGeo({ apiKey: process.env.MANDAPI_API_KEY });

const result = await client.audit({
  url: 'https://mandapi.net',
  assertRules: ['canonical_match', 'author_entity_declared', 'ai_crawler_access']
});

console.log(\`Audit Readiness: \${result.score}/100, High issues: \${result.highIssues.length}\`);`,
    github: `name: GEO & Technical SEO Baseline Guard
on: [pull_request]

jobs:
  geo-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify AI Search & Canonical Directives
        uses: mandapi/geo-audit-action@v1
        with:
          target_url: \${{ steps.deploy.outputs.preview_url }}
          fail_on_severity: 'high'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-20 bg-[#0B0E14] border-b border-[#202636] text-[#F3F4F6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161B26] border border-[#2D3548] text-[11px] font-mono font-semibold uppercase text-[#60A5FA]">
              <Terminal className="w-3.5 h-3.5" />
              <span>CI/CD & DEVELOPER API</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              {isZh
                ? '将技术 SEO 与 AI 准备度检查嵌入部署流水线'
                : isPt
                ? 'Integre verificações de SEO técnico e IA em seu pipeline CI/CD'
                : 'Integrate SEO & AI Readiness checks directly into your CI/CD pipeline'}
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {isZh
                ? '在每次 Git Pull Request 合并前自动抓取 Preview 页面，核对 Canonical、JSON-LD 与 AI 爬虫规则，防止意外 Disallow 或元数据错配上线。'
                : isPt
                ? 'Valide URLs de preview antes de cada merge no Git para prevenir canonicals errôneos e bloqueios acidentais no robots.txt.'
                : 'Automatically audit staging and preview deployments before merging PRs. Block regressions in canonical URLs, JSON-LD schemas, or AI crawler disallow rules.'}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                CLI / JSON API
              </span>
              <span>·</span>
              <span>GitHub Actions</span>
              <span>·</span>
              <span>Zero-Config cURL</span>
            </div>
          </div>

          {/* Right Terminal Window */}
          <div className="lg:col-span-7">
            <div className="bg-[#121620] border border-[#202636] rounded-[10px] shadow-2xl overflow-hidden text-[#F3F4F6]">
              {/* Terminal Title Bar */}
              <div className="px-4 py-2.5 border-b border-[#202636] flex items-center justify-between bg-[#0E1119]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/90"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/90"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/90"></span>
                  </div>
                  <div className="ml-3 flex items-center gap-1 font-mono text-xs">
                    <button
                      onClick={() => setActiveTab('curl')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'curl'
                          ? 'bg-[#3156D9] text-white font-semibold'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setActiveTab('node')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'node'
                          ? 'bg-[#3156D9] text-white font-semibold'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      Node.js (TS)
                    </button>
                    <button
                      onClick={() => setActiveTab('github')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'github'
                          ? 'bg-[#3156D9] text-white font-semibold'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      GitHub Action
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-[#94A3B8] hover:text-white hover:bg-[#1A202E] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34D399]" />
                      <span className="text-[#34D399]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto leading-relaxed bg-[#0E121B]">
                <pre className="text-[#E2E8F0]">
                  <code>{snippets[activeTab]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
