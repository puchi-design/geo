import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ArrowRight, ChevronRight, Binary, ScanSearch, CheckCheck, GitMerge } from 'lucide-react';

interface ProcessRailProps {
  currentLang: Language;
}

export const ProcessRail: React.FC<ProcessRailProps> = ({ currentLang }) => {
  const t = translations[currentLang].processRail;

  const steps = [
    {
      tag: t.step1Tag,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Binary,
      code: 'curl -s -L -A "MandAPI-Engine/4.0"',
    },
    {
      tag: t.step2Tag,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: ScanSearch,
      code: 'validate_canonical() && parse_jsonld()',
    },
    {
      tag: t.step3Tag,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: CheckCheck,
      code: 'sort_by_crawl_friction(High -> Low)',
    },
    {
      tag: t.step4Tag,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: GitMerge,
      code: 'git_diff(baseline.dom, current.dom)',
    },
  ];

  return (
    <section id="process" className="py-12 border-y border-[#DEDFDA] bg-[#FFFFFF] relative overflow-hidden">
      {/* Subtle tech background line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DEDFDA] to-transparent pointer-events-none hidden lg:block"></div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative">
        {/* Desktop Process Rail (4 columns in line with arrows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="relative group p-4 rounded-[10px] bg-[#F7F6F2]/30 hover:bg-[#FFFFFF] border border-transparent hover:border-[#3156D9]/30 hover:shadow-xs transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[5px] bg-[#FFFFFF] border border-[#DEDFDA] group-hover:border-[#3156D9] group-hover:bg-[#3156D9]/5 flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5 text-[#3156D9]" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-[#3156D9]">
                      {step.tag}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block text-[#C8CAC4] group-hover:text-[#3156D9] transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <h3 className="font-display text-base font-bold text-[#111318] mb-1.5 group-hover:text-[#3156D9] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#6B7078] leading-relaxed mb-3">
                  {step.desc}
                </p>

                {/* Micro tech expression */}
                <div className="pt-2 border-t border-[#DEDFDA]/50 text-[10px] font-mono text-[#969AA1] group-hover:text-[#3156D9] transition-colors truncate">
                  <code>&gt; {step.code}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
