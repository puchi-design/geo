import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateSection,
}) => {
  const t = translations[currentLang];
  const isZh = currentLang === 'zh';
  const isPt = currentLang === 'pt';

  return (
    <footer className="border-t border-[#202636] bg-[#090C12] py-14 text-[#94A3B8] text-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Wordmark & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded-[4px] bg-[#161B26] border border-[#2D3548] flex items-center justify-center text-white">
                <svg
                  className="w-3 h-3 text-[#F3F4F6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
                  <path d="M7 17L17 7" stroke="#3156D9" strokeWidth="2.2" />
                  <path d="M11 7h6v6" stroke="#3156D9" strokeWidth="2.2" />
                </svg>
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white">
                MandAPI
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#3156D9]/20 text-[#60A5FA] border border-[#3156D9]/40 uppercase">
                GEO
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              {t.footer.productDesc}
            </p>
            <p className="text-[11px] font-mono text-[#64748B]">
              {t.footer.privacyNotice}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="block font-mono font-semibold uppercase tracking-wider text-white text-[11px]">
              ARCHITECTURE
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('workspace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.techChecks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.aiChecks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('evidence')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.remediation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pipeline')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.verification}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Language */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono font-semibold uppercase tracking-wider text-white text-[11px]">
              GOVERNANCE PRINCIPLE
            </span>
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              {isZh
                ? '所有检查均直接源自 W3C 规范与 Schema.org 权威标准。拒绝无依据的黑盒评分或流量虚假承诺。'
                : isPt
                ? 'Todas as verificações derivam diretamente dos padrões W3C e Schema.org. Sem notas opacas ou promessas irreais.'
                : 'All assertions derive directly from W3C standards and Schema.org specifications. No black-box guesses or vanity traffic promises.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#64748B]">Language:</span>
              <div className="inline-flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    currentLang === 'en' ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  English
                </button>
                <span className="text-[#2D3548]">·</span>
                <button
                  onClick={() => onLanguageChange('zh')}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    currentLang === 'zh' ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  中文
                </button>
                <span className="text-[#2D3548]">·</span>
                <button
                  onClick={() => onLanguageChange('pt')}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    currentLang === 'pt' ? 'text-[#60A5FA] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  Português
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[#1C2230] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} MandAPI GEO. {t.footer.allRightsReserved}
          </div>
          <div className="flex items-center gap-4">
            <span>RFC 9110 HTTP/2</span>
            <span>·</span>
            <span>Schema.org 2026</span>
            <span>·</span>
            <span>W3C Validated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
