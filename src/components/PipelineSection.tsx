import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Database, Search, Target, FileText, Eye } from 'lucide-react';

interface PipelineSectionProps {
  currentLang: Language;
}

export const PipelineSection: React.FC<PipelineSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].pipelineSection;

  const pipeline = [
    {
      id: 'audit',
      label: t.stepAudit,
      desc: t.stepAuditDesc,
      status: 'live',
      icon: ShieldCheck,
    },
    {
      id: 'verify',
      label: t.stepVerify,
      desc: t.stepVerifyDesc,
      status: 'live',
      icon: CheckCircle2,
    },
    {
      id: 'demand',
      label: t.stepDemand,
      desc: t.stepDemandDesc,
      status: 'coming',
      icon: Search,
    },
    {
      id: 'opportunity',
      label: t.stepOpportunity,
      desc: t.stepOpportunityDesc,
      status: 'coming',
      icon: Target,
    },
    {
      id: 'brief',
      label: t.stepBrief,
      desc: t.stepBriefDesc,
      status: 'coming',
      icon: FileText,
    },
    {
      id: 'visibility',
      label: t.stepVisibility,
      desc: t.stepVisibilityDesc,
      status: 'coming',
      icon: Eye,
    },
  ];

  return (
    <section id="pipeline" className="py-16 md:py-24 bg-[#FFFFFF] border-t border-[#DEDFDA]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#3156D9] mb-2 px-2.5 py-1 rounded bg-[#3156D9]/8 border border-[#3156D9]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3156D9]"></span>
            ENGINEERING PIPELINE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111318] tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4B515D] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pipeline.map((item, idx) => {
            const Icon = item.icon;
            const isLive = item.status === 'live';

            return (
              <div
                key={item.id}
                className={`relative border rounded-[10px] p-5 transition-all ${
                  isLive
                    ? 'border-[#DEDFDA] bg-[#FFFFFF] shadow-xs'
                    : 'border-[#DEDFDA]/70 bg-[#F7F6F2]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6B7078]">
                      0{idx + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isLive ? 'text-[#3156D9]' : 'text-[#969AA1]'}`} />
                  </div>

                  {isLive ? (
                    <span className="text-[10px] font-mono font-bold uppercase text-[#39735B] bg-[#39735B]/10 px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39735B]"></span>
                      {t.liveBadge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-semibold uppercase text-[#6B7078] bg-[#DEDFDA] px-2 py-0.5 rounded-[4px]">
                      {t.comingBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[#111318] mb-2">
                  {item.label}
                </h3>

                <p className="text-xs text-[#6B7078] leading-relaxed mb-3">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-[#F1F1EE] flex items-center text-[11px] font-mono">
                  {isLive ? (
                    <span className="text-[#3156D9] font-medium flex items-center gap-1">
                      Production ready <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-[#969AA1] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> In specification
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Anti-Slop Disclaimer Box */}
        <div className="mt-8 p-4 rounded-[8px] bg-[#F1F1EE]/80 border border-[#DEDFDA] flex items-center gap-3 text-xs text-[#6B7078]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3156D9] shrink-0"></span>
          <span>{t.disclaimer}</span>
        </div>
      </div>
    </section>
  );
};
