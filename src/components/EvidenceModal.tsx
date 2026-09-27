import React, { useState } from 'react';
import { Finding, Language } from '../types';
import { translations } from '../translations';
import { X, Copy, Check, ExternalLink, Code2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EvidenceModalProps {
  finding: Finding | null;
  onClose: () => void;
  currentLang: Language;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  finding,
  onClose,
  currentLang,
}) => {
  if (!finding) return null;

  const t = translations[currentLang];
  const findingContent = t.findingsContent[finding.titleKey] || {
    title: finding.id,
    desc: 'Detailed engineering analysis for this DOM attribute.',
    remediation: finding.remediationCode || '',
    impact: 'Affects crawler parsing accuracy and index status.',
  };

  const isZh = currentLang === 'zh';
  const isPt = currentLang === 'pt';

  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedRemediation, setCopiedRemediation] = useState(false);

  const copyText = (text: string, type: 'raw' | 'remediation') => {
    navigator.clipboard.writeText(text);
    if (type === 'raw') {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopiedRemediation(true);
      setTimeout(() => setCopiedRemediation(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#121620] border border-[#262E40] rounded-[12px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-[#F3F4F6]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between bg-[#0E121B] sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            {finding.severity === 'high' ? (
              <span className="text-[10px] font-mono font-bold uppercase text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded-[4px] border border-[#EF4444]/30">
                HIGH PRIORITY
              </span>
            ) : finding.severity === 'medium' ? (
              <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30">
                MEDIUM ATTENTION
              </span>
            ) : (
              <span className="text-[10px] font-mono font-bold uppercase text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded-[4px] border border-[#10B981]/30">
                PASS VERIFIED
              </span>
            )}
            <span className="text-xs font-mono text-[#94A3B8]">
              Line {finding.line || '1'} · {finding.evidenceType.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-[4px] text-[#94A3B8] hover:text-white hover:bg-[#1E2433] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Title & Desc */}
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {findingContent.title}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {findingContent.desc}
            </p>
          </div>

          {/* Section 1: Raw Evidence Found */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
              <span className="font-semibold uppercase text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#EF4444]" />
                {isZh ? '原始捕获代码证据' : isPt ? 'Evidência Bruta Capturada' : 'Raw Captured Evidence'}
              </span>
              <button
                onClick={() => copyText(finding.rawEvidence, 'raw')}
                className="hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                {copiedRaw ? (
                  <>
                    <Check className="w-3 h-3 text-[#34D399]" />
                    <span className="text-[#34D399]">{t.evidenceSection.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{t.evidenceSection.copyCode}</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#0E121B] border border-[#202636] rounded-[6px] p-3 text-xs font-mono text-[#E2E8F0] overflow-x-auto whitespace-pre">
              <code>{finding.rawEvidence}</code>
            </div>
          </div>

          {/* Section 2: Why it matters */}
          <div className="space-y-2">
            <span className="block text-xs font-mono font-semibold uppercase text-white">
              {t.evidenceSection.whyItMatters}
            </span>
            <div className="p-3.5 rounded-[8px] bg-[#161B26] border border-[#262E40] text-xs text-[#CBD5E1] leading-relaxed">
              {findingContent.impact}
            </div>
          </div>

          {/* Section 3: Recommended PR Patch */}
          {findingContent.remediation && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span className="font-semibold uppercase text-[#34D399] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  {t.evidenceSection.remediationLabel}
                </span>
                <button
                  onClick={() => copyText(findingContent.remediation, 'remediation')}
                  className="hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                >
                  {copiedRemediation ? (
                    <>
                      <Check className="w-3 h-3 text-[#34D399]" />
                      <span className="text-[#34D399]">{t.evidenceSection.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t.evidenceSection.copyCode}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#0E121B] border border-[#202636] rounded-[6px] p-3 text-xs font-mono text-[#34D399] overflow-x-auto whitespace-pre">
                <code>{findingContent.remediation}</code>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#202636] bg-[#0E121B] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#64748B]">
            Assertion Rule: {finding.category.toUpperCase()}_CHECK
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-[6px] bg-[#1E2433] hover:bg-[#283247] text-white text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            {isZh ? '关闭' : isPt ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
