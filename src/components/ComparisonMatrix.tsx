import React from 'react';
import { Language } from '../types';
import { Check, X, Minus, HelpCircle, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface ComparisonMatrixProps {
  currentLang: Language;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ currentLang }) => {
  const isZh = currentLang === 'zh';
  const isPt = currentLang === 'pt';

  const title = isZh
    ? '为什么工程团队选择确定性证据，而非黑盒打分'
    : isPt
    ? 'Por que equipes de engenharia escolhem evidências em vez de scores opacos'
    : 'Why engineering teams choose deterministic evidence over black-box scores';

  const subtitle = isZh
    ? '对比传统 SEO 爬虫、通用 AI 营销打分器与 MandAPI GEO 证据引擎的核心差异'
    : isPt
    ? 'Comparação estruturada entre ferramentas clássicas de SEO, checkers genéricos de IA e o motor MandAPI GEO'
    : 'Structured architectural comparison: Traditional SEO tools vs generic AI score checkers vs MandAPI GEO Evidence Engine';

  const rows = [
    {
      feature: isZh ? '原始 HTML/Header 确定性代码证据' : isPt ? 'Evidência de código bruto HTML/Header' : 'Deterministic HTML & Header Code Evidence',
      trad: '部分提供 (Partly)',
      genericAi: '无 (基于黑盒概率打分)',
      geo: '100% 行级代码抓取与高亮',
      geoAdvantage: true,
    },
    {
      feature: isZh ? 'AI 搜索引擎爬虫专属规则验证 (OAI / Perplexity / Claude)' : isPt ? 'Regras para robôs de busca por IA' : 'AI Search Bot Directives (OAI / Perplexity / Claude)',
      trad: '仅标准通用爬虫',
      genericAi: '伪造或无感知',
      geo: '实时匹配 robots.txt 与响应码',
      geoAdvantage: true,
    },
    {
      feature: isZh ? '修改前后 Baseline Diff 验证 (防止修复回退)' : isPt ? 'Diff de linha de base antes e depois' : 'Post-Fix Baseline Diff Verification',
      trad: '需重新全站爬取',
      genericAi: '不支持',
      geo: 'Git-like 行级 DOM 差异比对',
      geoAdvantage: true,
    },
    {
      feature: isZh ? 'Schema.org 实体图谱与作者 (Authorship) 深度检查' : isPt ? 'Validação de grafo Schema.org e autoria' : 'Schema.org Entity Graph & Authorship Validation',
      trad: '仅基础语法报错',
      genericAi: '忽略实体权威性',
      geo: '解析 Entity Graph 与时效时间戳',
      geoAdvantage: true,
    },
    {
      feature: isZh ? '免登录即开即测 (单页高精 Headless 提取)' : isPt ? 'Auditoria instantânea de página única' : 'Instant Single-Page Headless Extraction',
      trad: '强制绑定全站项目',
      genericAi: '常附带销售漏斗',
      geo: '直接输入即刻读取，零阻碍',
      geoAdvantage: true,
    },
    {
      feature: isZh ? '可直接复制的工程修复代码 (Pull Request Checklist)' : isPt ? 'Snippets prontos para Pull Requests' : 'Actionable PR-Ready Remediation Snippets',
      trad: '抽象建议 (如“优化元标签”)',
      genericAi: '不可执行泛泛而谈',
      geo: '精准给出具体 <link> 或 JSON-LD 修复',
      geoAdvantage: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[#DEDFDA]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#3156D9] mb-2 px-2.5 py-1 rounded bg-[#3156D9]/8 border border-[#3156D9]/20">
            <span>SPECIFICATION BENCHMARK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111318] tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#4B515D] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-[#DEDFDA] rounded-[12px] overflow-hidden shadow-xs bg-[#FFFFFF]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DEDFDA] bg-[#F7F6F2]/60 text-xs font-mono">
                  <th className="py-4 px-5 text-[#6B7078] font-semibold w-2/5">
                    {isZh ? '功能与架构维度' : isPt ? 'Dimensão Arquitetural' : 'Capability & Architectural Dimension'}
                  </th>
                  <th className="py-4 px-4 text-[#6B7078] font-medium w-1/5">
                    {isZh ? '传统 SEO 爬虫工具' : isPt ? 'Ferramentas Clássicas' : 'Traditional SEO Tools'}
                  </th>
                  <th className="py-4 px-4 text-[#6B7078] font-medium w-1/5">
                    {isZh ? '通用 AI 营销打分器' : isPt ? 'Checkers Genéricos de IA' : 'Generic AI Score Checkers'}
                  </th>
                  <th className="py-4 px-5 text-[#3156D9] font-bold w-1/5 bg-[#EEF2FF]/60 border-l border-[#DEDFDA]">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#3156D9]" />
                      <span>MandAPI GEO Engine</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F1EE] text-xs">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F7F6F2]/40 transition-colors">
                    <td className="py-4 px-5 font-medium text-[#111318]">
                      {r.feature}
                    </td>
                    <td className="py-4 px-4 text-[#6B7078] font-mono">
                      {r.trad}
                    </td>
                    <td className="py-4 px-4 text-[#A56A19] font-mono">
                      {r.genericAi}
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#111318] bg-[#EEF2FF]/30 border-l border-[#DEDFDA] font-mono">
                      <div className="flex items-center gap-2 text-[#3156D9]">
                        <Check className="w-4 h-4 text-[#39735B] shrink-0" />
                        <span>{r.geo}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
