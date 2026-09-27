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

  return (
    <footer className="border-t border-[#DEDFDA] bg-[#F7F6F2] py-12 text-[#4B515D] text-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Wordmark & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[4px] bg-[#10B981] flex items-center justify-center text-white">
                <span className="font-mono text-[10px] font-bold leading-none">M</span>
              </div>
              <span className="font-semibold text-base tracking-tight text-[#111318]">
                MandAPI
              </span>
              <span className="font-medium text-xs text-[#4B515D]">
                GEO
              </span>
            </div>
            <p className="text-xs text-[#6B7078] leading-relaxed max-w-sm">
              {t.footer.productDesc}
            </p>
            <p className="text-[11px] font-mono text-[#969AA1]">
              {t.footer.privacyNotice}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="block font-mono font-semibold uppercase tracking-wider text-[#111318] text-[11px]">
              ARCHITECTURE
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('workspace')}
                  className="hover:text-[#111318] transition-colors"
                >
                  {t.footer.techChecks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('evidence')}
                  className="hover:text-[#111318] transition-colors"
                >
                  {t.footer.aiChecks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('process')}
                  className="hover:text-[#111318] transition-colors"
                >
                  {t.footer.verification}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pipeline')}
                  className="hover:text-[#111318] transition-colors"
                >
                  {t.footer.remediation}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Repositories & Languages */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono font-semibold uppercase tracking-wider text-[#111318] text-[11px]">
              ENGINEERING REPO
            </span>
            <div>
              <a
                href="https://github.com/saleiyi/geo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#DEDFDA] hover:border-[#C8CAC4] rounded-md text-xs font-mono text-[#111318] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>saleiyi/geo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#969AA1]" />
              </a>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] text-[#969AA1] mb-1.5 font-mono">
                Language / 语言 / Idioma:
              </span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`hover:text-[#111318] ${currentLang === 'en' ? 'text-[#3156D9] font-bold' : ''}`}
                >
                  English
                </button>
                <span className="text-[#DEDFDA]">/</span>
                <button
                  onClick={() => onLanguageChange('zh')}
                  className={`hover:text-[#111318] ${currentLang === 'zh' ? 'text-[#3156D9] font-bold' : ''}`}
                >
                  简体中文
                </button>
                <span className="text-[#DEDFDA]">/</span>
                <button
                  onClick={() => onLanguageChange('pt')}
                  className={`hover:text-[#111318] ${currentLang === 'pt' ? 'text-[#3156D9] font-bold' : ''}`}
                >
                  Português (BR)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#DEDFDA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#969AA1]">
          <div>
            © 2026 MandAPI GEO. {t.footer.allRightsReserved}
          </div>
          <div className="font-mono flex items-center gap-2">
            <span>Branch: frontend-v4-gemini</span>
            <span>·</span>
            <span>Design tokens: Cobalt / Paper Gray</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
