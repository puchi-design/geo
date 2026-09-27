import React, { useState } from 'react';
import { AuditReport, Language } from '../types';
import { translations } from '../translations';
import { X, Copy, Check, Download, FileJson, FileText } from 'lucide-react';

interface ExportModalProps {
  report: AuditReport;
  onClose: () => void;
  currentLang: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  report,
  onClose,
  currentLang,
}) => {
  const [format, setFormat] = useState<'json' | 'markdown'>('json');
  const [copied, setCopied] = useState(false);

  const jsonContent = JSON.stringify(report, null, 2);

  const markdownContent = `# MandAPI GEO — Technical SEO & AI Readiness Audit
**Target URL:** ${report.url}  
**Timestamp:** ${report.timestamp}  
**Readiness Index:** ${report.score} / 100  
**Scope:** ${report.scope} (HTTP ${report.httpStatus}, ${report.responseTimeMs}ms)  

---

## 1. Prioritized Findings (${report.findings.length} checks)
${report.findings
  .map(
    (f) => `### [${f.severity.toUpperCase()}] ${f.id}
- **Evidence Line:** ${f.line || 'header'}
- **Captured Snippet:**
\`\`\`${f.evidenceType}
${f.rawEvidence}
\`\`\`
${f.remediationCode ? `- **Remediation Code:**\n\`\`\`html\n${f.remediationCode}\n\`\`\`` : ''}
`
  )
  .join('\n')}

---

## 2. AI Search Bot Directives (robots.txt)
${report.bots.map((b) => `- **${b.botName}**: ${b.status.toUpperCase()} (${b.agent})`).join('\n')}

---

## 3. Change Verification (Baseline Diff)
- **Resolved:** ${report.verification.resolved}
- **Remaining:** ${report.verification.remaining}
- **New Issues:** ${report.verification.newCount}
- **Unknown:** ${report.verification.unknownCount}
`;

  const currentContent = format === 'json' ? jsonContent : markdownContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], {
      type: format === 'json' ? 'application/json' : 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mandapi-geo-audit-${new Date().toISOString().split('T')[0]}.${format === 'json' ? 'json' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#DEDFDA] rounded-[12px] shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DEDFDA] flex items-center justify-between bg-[#F1F1EE]/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#111318]">
              Export Audit Findings
            </span>
            <span className="text-xs font-mono text-[#6B7078]">
              {report.url.replace(/^https?:\/\//, '')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#6B7078] hover:text-[#111318] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 py-3 border-b border-[#DEDFDA] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-1 border border-[#DEDFDA] rounded-md p-1 bg-[#F1F1EE] text-xs font-mono">
            <button
              onClick={() => setFormat('json')}
              className={`flex items-center gap-1 px-3 py-1 rounded-[4px] font-medium transition-all ${
                format === 'json'
                  ? 'bg-[#FFFFFF] text-[#111318] shadow-xs'
                  : 'text-[#6B7078] hover:text-[#111318]'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              JSON Payload
            </button>
            <button
              onClick={() => setFormat('markdown')}
              className={`flex items-center gap-1 px-3 py-1 rounded-[4px] font-medium transition-all ${
                format === 'markdown'
                  ? 'bg-[#FFFFFF] text-[#111318] shadow-xs'
                  : 'text-[#6B7078] hover:text-[#111318]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Markdown Report
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#111318] bg-[#FFFFFF] border border-[#DEDFDA] hover:bg-[#F1F1EE] rounded-md transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#39735B]" />
                  <span className="text-[#39735B]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#3156D9] hover:bg-[#2648BC] rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F7F6F2]">
          <pre className="text-xs font-mono text-[#30343B] bg-[#FFFFFF] p-4 rounded-[8px] border border-[#DEDFDA] overflow-x-auto whitespace-pre leading-relaxed">
            <code>{currentContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
