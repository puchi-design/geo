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
    { name: 'OAI-SearchBot', status: 'Active (200 OK)', color: 'text-[#34D399]' },
    { name: 'PerplexityBot', status: 'Active (200 OK)', color: 'text-[#34D399]' },
    { name: 'Claude-SearchBot', status: 'Monitoring', color: 'text-[#60A5FA]' },
    { name: 'Google-Extended', status: 'Active (200 OK)', color: 'text-[#34D399]' },
    { name: 'Applebot-Extended', status: 'Compliant', color: 'text-[#34D399]' },
    { name: 'Bytespider', status: 'Indexed', color: 'text-[#34D399]' },
  ];

  return (
    <section className="border-b border-[#202636] bg-[#0E121B] py-6 relative overflow-hidden text-[#F3F4F6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-[#1E2433]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-[8px] bg-[#141824] border border-[#262E40] hover:border-[#3156D9] hover:bg-[#181D2C] transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-[4px] bg-[#0E121B] border border-[#262E40] text-[#60A5FA]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] truncate">
                    {m.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-white tracking-tight">
                    {m.value}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8] font-mono mt-0.5 truncate">
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
            <span className="font-semibold text-white">
              {isZh ? 'AI 搜索引擎爬虫实时监听网络' : isPt ? 'Rede de Rastreadores de IA Ativa' : 'Live AI Crawler Network Telemetry'}
            </span>
            <span className="text-[#3B4660]">|</span>
            <span className="text-[#94A3B8]">v4.2 Engine</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-[11px]">
            {crawlerAgents.map((bot, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#141824] border border-[#262E40] shrink-0 text-[#CBD5E1]"
              >
                <span className="font-medium text-[#94A3B8]">{bot.name}:</span>
                <span className={`font-semibold ${bot.color}`}>{bot.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
