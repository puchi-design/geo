import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ArrowUpRight, Menu, X, Check, Code2, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onAnalyzeClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onAnalyzeClick,
  onNavigateSection,
  onOpenExport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1017]/95 backdrop-blur-md border-b border-[#202533] text-[#F3F4F6] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Logo 1 — Signal & Frame */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3156D9] rounded-md py-1"
          >
            {/* Logo 1: Signal & Frame (Document frame + diagonal signal ray + live probe dot) */}
            <div className="relative w-7 h-7 rounded-[5px] bg-[#161B26] border border-[#2D3548] group-hover:border-[#3156D9] flex items-center justify-center text-white shadow-sm transition-all">
              {/* Outer Document / Window Frame representation */}
              <svg
                className="w-4 h-4 text-[#F3F4F6] group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Clean Frame Box */}
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
                {/* Diagonal Signal Emitter Probe */}
                <path d="M7 17L17 7" stroke="#3156D9" strokeWidth="2.2" />
                <path d="M11 7h6v6" stroke="#3156D9" strokeWidth="2.2" />
              </svg>
              {/* Tiny live ping beacon on corner */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3156D9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3156D9]"></span>
              </span>
            </div>

            {/* Wordmark Hierarchy: MandAPI (Solid Base) + GEO (Search Specifier) */}
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-[17px] tracking-tight text-white group-hover:text-[#F3F4F6] transition-colors">
                MandAPI
              </span>
              <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#3156D9]/20 text-[#60A5FA] tracking-wider border border-[#3156D9]/40 uppercase">
                GEO
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9CA3AF]">
          <button
            onClick={() => handleNavClick('workspace')}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.product}
          </button>
          <button
            onClick={() => handleNavClick('process')}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.workflow}
          </button>
          <button
            onClick={() => handleNavClick('evidence')}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.methodology}
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.geoGuide}
          </button>
        </nav>

        {/* Zone 3: Language Switcher + Primary Action */}
        <div className="flex items-center gap-3">
          {onOpenExport && (
            <button
              onClick={onOpenExport}
              title="Export JSON / Markdown Audit Data"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#9CA3AF] bg-[#161B26] hover:text-white hover:border-[#3B4660] border border-[#2D3548] rounded-md transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Export</span>
            </button>
          )}

          {/* Segmented language selector */}
          <div className="flex items-center border border-[#2D3548] rounded-md p-0.5 bg-[#161B26] text-xs font-mono">
            <button
              onClick={() => onLanguageChange('pt')}
              aria-label="Português"
              className={`px-2 py-1 rounded-[4px] font-medium transition-all ${
                currentLang === 'pt'
                  ? 'bg-[#3156D9] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              aria-label="English"
              className={`px-2 py-1 rounded-[4px] font-medium transition-all ${
                currentLang === 'en'
                  ? 'bg-[#3156D9] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('zh')}
              aria-label="中文"
              className={`px-2 py-1 rounded-[4px] font-medium transition-all ${
                currentLang === 'zh'
                  ? 'bg-[#3156D9] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              中文
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onAnalyzeClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#3156D9] hover:bg-[#2648BC] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3156D9] focus-visible:ring-offset-1"
          >
            <span>{t.nav.analyzeBtn}</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9CA3AF] hover:text-white rounded-md border border-[#2D3548] bg-[#161B26]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#202533] bg-[#0D1017] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#9CA3AF]">
            <button
              onClick={() => handleNavClick('workspace')}
              className="text-left py-2 hover:text-white border-b border-[#202533]"
            >
              {t.nav.product}
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className="text-left py-2 hover:text-white border-b border-[#202533]"
            >
              {t.nav.workflow}
            </button>
            <button
              onClick={() => handleNavClick('evidence')}
              className="text-left py-2 hover:text-white border-b border-[#202533]"
            >
              {t.nav.methodology}
            </button>
            <button
              onClick={() => handleNavClick('pipeline')}
              className="text-left py-2 hover:text-white border-b border-[#202533]"
            >
              {t.nav.geoGuide}
            </button>
          </div>
          <button
            onClick={() => {
              onAnalyzeClick();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-2.5 text-xs font-semibold text-white bg-[#3156D9] rounded-md text-center"
          >
            {t.nav.analyzeBtn}
          </button>
        </div>
      )}
    </header>
  );
};
