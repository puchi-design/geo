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
    <section id="process" className="py-12 border-b border-[#202636] bg-[#0B0E14] relative overflow-hidden text-[#F3F4F6]">
      {/* Subtle tech background line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#262E40] to-transparent pointer-events-none hidden lg:block"></div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative">
        {/* Desktop Process Rail (4 columns in line with arrows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="relative group p-4 rounded-[10px] bg-[#121620] hover:bg-[#161B26] border border-[#202636] hover:border-[#3156D9] shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[5px] bg-[#181D2A] border border-[#2D3548] group-hover:border-[#3156D9] group-hover:bg-[#3156D9]/15 flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5 text-[#60A5FA]" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-[#60A5FA]">
                      {step.tag}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block text-[#3B4660] group-hover:text-[#60A5FA] transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <h3 className="font-display text-base font-bold text-white mb-1.5 group-hover:text-[#60A5FA] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                  {step.desc}
                </p>

                {/* Micro tech expression */}
                <div className="pt-2 border-t border-[#202636] text-[10px] font-mono text-[#64748B] group-hover:text-[#CBD5E1] transition-colors truncate">
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
