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
    <header className="sticky top-0 z-40 w-full bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#DEDFDA] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3156D9] rounded-md py-1"
          >
            {/* Geometric tech logo mark for MandAPI */}
            <div className="relative w-7 h-7 rounded-[6px] bg-[#111318] border border-[#2A2E37] flex items-center justify-center text-white shadow-xs group-hover:border-[#3156D9] transition-all">
              <span className="font-mono text-xs font-bold leading-none tracking-tighter text-[#10B981]">
                M
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg tracking-tight text-[#111318]">
                MandAPI
              </span>
              <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded-[4px] bg-[#3156D9]/10 text-[#3156D9] tracking-wider border border-[#3156D9]/20">
                GEO v4
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4B515D]">
          <button
            onClick={() => handleNavClick('workspace')}
            className="hover:text-[#111318] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.product}
          </button>
          <button
            onClick={() => handleNavClick('process')}
            className="hover:text-[#111318] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.workflow}
          </button>
          <button
            onClick={() => handleNavClick('evidence')}
            className="hover:text-[#111318] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
          >
            {t.nav.methodology}
          </button>
          <button
            onClick={() => handleNavClick('pipeline')}
            className="hover:text-[#111318] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3156D9] py-1 cursor-pointer"
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
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#4B515D] bg-[#FFFFFF] hover:text-[#111318] hover:border-[#C8CAC4] border border-[#DEDFDA] rounded-md transition-colors cursor-pointer shadow-2xs"
            >
              <Code2 className="w-3.5 h-3.5 text-[#3156D9]" />
              <span>Export</span>
            </button>
          )}

          {/* Segmented language selector */}
          <div className="flex items-center border border-[#DEDFDA] rounded-md p-0.5 bg-[#FFFFFF] text-xs font-mono">
            <button
              onClick={() => onLanguageChange('pt')}
              aria-label="Português"
              className={`px-2 py-1 rounded-[4px] font-medium transition-all ${
                currentLang === 'pt'
                  ? 'bg-[#3156D9] text-white'
                  : 'text-[#4B515D] hover:text-[#111318]'
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
                  : 'text-[#4B515D] hover:text-[#111318]'
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
                  : 'text-[#4B515D] hover:text-[#111318]'
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
            className="md:hidden p-2 text-[#4B515D] hover:text-[#111318] rounded-md border border-[#DEDFDA] bg-[#FFFFFF]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DEDFDA] bg-[#FFFFFF] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4B515D]">
            <button
              onClick={() => handleNavClick('workspace')}
              className="text-left py-2 hover:text-[#111318] border-b border-[#F1F1EE]"
            >
              {t.nav.product}
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className="text-left py-2 hover:text-[#111318] border-b border-[#F1F1EE]"
            >
              {t.nav.workflow}
            </button>
            <button
              onClick={() => handleNavClick('evidence')}
              className="text-left py-2 hover:text-[#111318] border-b border-[#F1F1EE]"
            >
              {t.nav.methodology}
            </button>
            <button
              onClick={() => handleNavClick('pipeline')}
              className="text-left py-2 hover:text-[#111318] border-b border-[#F1F1EE]"
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
