import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Cpu, ShieldCheck, Activity, Terminal, Radio, CheckCircle, Zap, Globe, Layers } from 'lucide-react';

interface TelemetryBarProps {
  currentLang: Language;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({ currentLang }) => {
  const isZh = currentLang === 'zh';
  const isPt = currentLang === 'pt';

  const metrics = [
    {
      label: isZh ? '确定性核验规则' : isPt ? 'Regras Determinísticas' : 'Deterministic Rules',
      value: '42 Checks',
      sub: isZh ? 'DOM & Header 静态断言' : isPt ? 'Assertivas DOM & Header' : 'DOM & Header Assertions',
      icon: Layers,
    },
    {
      label: isZh ? 'AI 搜索爬虫矩阵' : isPt ? 'Agentes de Busca IA' : 'AI Search Bot Matrix',
      value: '12 Agents',
      sub: isZh ? '实时 robots.txt 匹配' : isPt ? 'Validação robots.txt em tempo real' : 'Real-time robots.txt match',
      icon: Cpu,
    },
    {
      label: isZh ? '基线修改比对 (Diff)' : isPt ? 'Validação de Baseline' : 'Baseline Diff Engine',
      value: 'Git-Style',
      sub: isZh ? '双版本 DOM 代码前后比对' : isPt ? 'Diff de código antes e depois' : 'Before/after DOM code diff',
      icon: Activity,
    },
    {
      label: isZh ? '核验结果交付标准' : isPt ? 'Padrão de Entrega' : 'Delivery Standard',
      value: 'W3C / Schema',
      sub: isZh ? '无黑盒猜测 · 100% 原始代码' : isPt ? '100% código bruto verificável' : '100% Raw code evidence',
      icon: ShieldCheck,
    },
  ];

  const crawlerAgents = [
    { name: 'OAI-SearchBot', status: 'Active (200 OK)', color: 'text-[#39735B]' },
    { name: 'PerplexityBot', status: 'Active (200 OK)', color: 'text-[#39735B]' },
    { name: 'Claude-SearchBot', status: 'Monitoring', color: 'text-[#3156D9]' },
    { name: 'Google-Extended', status: 'Active (200 OK)', color: 'text-[#39735B]' },
    { name: 'Applebot-Extended', status: 'Compliant', color: 'text-[#39735B]' },
    { name: 'Bytespider', status: 'Indexed', color: 'text-[#39735B]' },
  ];

  return (
    <section className="border-b border-[#DEDFDA] bg-[#FFFFFF] py-6 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Metric Cards Row (Siteimprove / Semrush high-density telemetry) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-[#F1F1EE]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-[8px] bg-[#F7F6F2]/40 border border-[#DEDFDA]/70 hover:border-[#3156D9]/40 hover:bg-[#FFFFFF] transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-[4px] bg-[#FFFFFF] border border-[#DEDFDA] text-[#3156D9]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B7078] truncate">
                    {m.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-[#111318] tracking-tight">
                    {m.value}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7078] font-mono mt-0.5 truncate">
                  {m.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Bot Crawler Network Status Ticker */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="font-semibold text-[#111318]">
              {isZh ? 'AI 搜索引擎爬虫实时监听网络' : isPt ? 'Rede de Rastreadores de IA Ativa' : 'Live AI Crawler Network Telemetry'}
            </span>
            <span className="text-[#DEDFDA]">|</span>
            <span className="text-[#6B7078]">v4.2 Engine</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-[11px]">
            {crawlerAgents.map((bot, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#F7F6F2] border border-[#DEDFDA] shrink-0 text-[#30343B]"
              >
                <span className="font-medium">{bot.name}:</span>
                <span className={`font-semibold ${bot.color}`}>{bot.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
