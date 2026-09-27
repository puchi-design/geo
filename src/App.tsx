import React, { useState, useEffect } from 'react';
import { Language, Finding, AuditReport } from './types';
import { translations } from './translations';
import { defaultAuditReport, generateAuditForUrl } from './data/mockAudits';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TelemetryBar } from './components/TelemetryBar';
import { ProcessRail } from './components/ProcessRail';
import { EvidenceSection } from './components/EvidenceSection';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { DeveloperCliSection } from './components/DeveloperCliSection';
import { PipelineSection } from './components/PipelineSection';
import { EvidenceModal } from './components/EvidenceModal';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [urlInput, setUrlInput] = useState<string>('https://mandapi.net');
  const [report, setReport] = useState<AuditReport>(defaultAuditReport);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Sync document html lang attribute and title
  useEffect(() => {
    document.documentElement.lang = currentLang;
    const t = translations[currentLang];
    document.title = `MandAPI GEO — ${t.hero.h1Line1} ${t.hero.h1Line2}`;
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleAnalyze = (targetUrl?: string) => {
    const urlToUse = targetUrl || urlInput;
    if (!urlToUse.trim()) return;

    setIsAnalyzing(true);
    // Simulate real DOM and header fetch latency
    setTimeout(() => {
      const generated = generateAuditForUrl(urlToUse);
      setReport(generated);
      setIsAnalyzing(false);
    }, 700);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#111318] flex flex-col font-sans selection:bg-[#3156D9]/15 selection:text-[#111318]">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onAnalyzeClick={() => handleNavigateSection('workspace')}
        onNavigateSection={handleNavigateSection}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Desktop Hero & Interactive Workspace Slice */}
        <Hero
          currentLang={currentLang}
          report={report}
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          onInspectFinding={(finding) => setSelectedFinding(finding)}
          onNavigateSection={handleNavigateSection}
        />

        {/* Real-time Enterprise Telemetry Bar & Live AI Crawler Network Ticker */}
        <TelemetryBar currentLang={currentLang} />

        {/* Process Rail: 01 FETCH -> 02 VERIFY -> 03 PRIORITIZE -> 04 COMPARE */}
        <ProcessRail currentLang={currentLang} />

        {/* Section 2: Every recommendation should have evidence (A - Tech SEO, B - AI Search Readiness, C - Verification Diff) */}
        <EvidenceSection
          currentLang={currentLang}
          report={report}
          onInspectFinding={(finding) => setSelectedFinding(finding)}
        />

        {/* Architectural Comparison Matrix (Traditional SEO vs Generic AI Checker vs MandAPI GEO Engine) */}
        <ComparisonMatrix currentLang={currentLang} />

        {/* Developer Integration: CI/CD, cURL CLI & GitHub Action Pipeline */}
        <DeveloperCliSection currentLang={currentLang} />

        {/* Section 3: Engineering Pipeline (LIVE vs COMING) */}
        <PipelineSection currentLang={currentLang} />
      </main>

      {/* Detailed Code Evidence Inspector Modal */}
      <EvidenceModal
        finding={selectedFinding}
        onClose={() => setSelectedFinding(null)}
        currentLang={currentLang}
      />

      {/* Developer Export Modal (JSON / Markdown) */}
      {isExportOpen && (
        <ExportModal
          report={report}
          onClose={() => setIsExportOpen(false)}
          currentLang={currentLang}
        />
      )}

      {/* Professional developer footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
