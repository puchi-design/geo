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
    <section id="pipeline" className="py-16 md:py-24 bg-[#0E121B] text-[#F3F4F6] border-b border-[#202636]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#60A5FA] mb-2 px-2.5 py-1 rounded bg-[#161B26] border border-[#2D3548]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3156D9]"></span>
            ENGINEERING PIPELINE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 6-step Rail (Linear DevTools Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pipeline.map((item, idx) => {
            const Icon = item.icon;
            const isLive = item.status === 'live';

            return (
              <div
                key={item.id}
                className={`relative border rounded-[10px] p-5 flex flex-col justify-between transition-all ${
                  isLive
                    ? 'border-[#263147] bg-[#141824] hover:border-[#3156D9] shadow-sm'
                    : 'border-[#1E2433] bg-[#0F131C] opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-[6px] flex items-center justify-center ${
                          isLive
                            ? 'bg-[#182030] text-[#60A5FA] border border-[#2D3850]'
                            : 'bg-[#141720] text-[#64748B] border border-[#1E2433]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-[#64748B]">
                        0{idx + 1}
                      </span>
                    </div>

                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        {t.liveBadge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#181D2A] text-[#94A3B8] border border-[#262E40] text-[10px] font-mono font-medium uppercase tracking-wider">
                        <Clock className="w-2.5 h-2.5" />
                        {t.comingBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {item.label}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1E2433] flex items-center justify-between text-[11px] font-mono">
                  {isLive ? (
                    <span className="text-[#34D399] font-medium flex items-center gap-1">
                      <span>Live in Engine</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-[#64748B]">
                      Phase 2 Spec
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
