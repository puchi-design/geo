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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#DEDFDA] rounded-[12px] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DEDFDA] flex items-center justify-between bg-[#F1F1EE]/60 sticky top-0 bg-[#FFFFFF] z-10">
          <div className="flex items-center gap-2.5">
            {finding.severity === 'high' ? (
              <span className="text-[10px] font-mono font-bold uppercase text-[#B64C4C] bg-[#B64C4C]/10 px-2 py-0.5 rounded-[4px]">
                HIGH PRIORITY
              </span>
            ) : finding.severity === 'medium' ? (
              <span className="text-[10px] font-mono font-bold uppercase text-[#A56A19] bg-[#A56A19]/10 px-2 py-0.5 rounded-[4px]">
                MEDIUM ATTENTION
              </span>
            ) : (
              <span className="text-[10px] font-mono font-bold uppercase text-[#39735B] bg-[#39735B]/10 px-2 py-0.5 rounded-[4px]">
                PASS VERIFIED
              </span>
            )}
            <span className="text-xs font-mono text-[#6B7078]">
              Line {finding.line || 'header'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#6B7078] hover:text-[#111318] rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-[#111318] mb-2">
              {findingContent.title}
            </h3>
            <p className="text-sm text-[#4B515D] leading-relaxed">
              {findingContent.desc}
            </p>
          </div>

          {/* Raw Capture Snippet */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#6B7078] mb-1.5">
              <span className="uppercase tracking-wider">
                {t.evidenceSection.rawSnippet}
              </span>
              <button
                onClick={() => copyText(finding.rawEvidence, 'raw')}
                className="hover:text-[#111318] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedRaw ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#39735B]" />
                    <span className="text-[#39735B]">{t.evidenceSection.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.evidenceSection.copyCode}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-[#F7F6F2] border border-[#DEDFDA] rounded-[6px] p-3 text-xs font-mono text-[#30343B] overflow-x-auto whitespace-pre">
              <code>{finding.rawEvidence}</code>
            </pre>
          </div>

          {/* Impact and Remediation */}
          {finding.remediationCode && (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#3156D9] mb-1.5">
                <span className="uppercase tracking-wider font-semibold">
                  {t.evidenceSection.remediationLabel}
                </span>
                <button
                  onClick={() => copyText(finding.remediationCode!, 'remediation')}
                  className="hover:text-[#2648BC] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedRemediation ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#39735B]" />
                      <span className="text-[#39735B]">{t.evidenceSection.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.evidenceSection.copyCode}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-[#FFFFFF] border border-[#3156D9]/30 rounded-[6px] p-3 text-xs font-mono text-[#111318] overflow-x-auto whitespace-pre">
                <code>{finding.remediationCode}</code>
              </pre>
            </div>
          )}

          {/* Root cause / Why it matters */}
          <div className="bg-[#F1F1EE]/70 border border-[#DEDFDA] rounded-[8px] p-4 text-xs">
            <span className="block font-mono font-semibold text-[#111318] uppercase tracking-wider mb-1">
              {t.evidenceSection.whyItMatters}
            </span>
            <p className="text-[#4B515D] leading-relaxed">
              {findingContent.impact}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#DEDFDA] bg-[#F1F1EE]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#111318] bg-[#FFFFFF] border border-[#DEDFDA] hover:bg-[#F1F1EE] rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
