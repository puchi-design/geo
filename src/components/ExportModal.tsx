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
    const filename = `mandapi-geo-${report.url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_')}.${
      format === 'json' ? 'json' : 'md'
    }`;
    const blob = new Blob([currentContent], {
      type: format === 'json' ? 'application/json' : 'text/markdown',
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#121620] border border-[#262E40] rounded-[12px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-[#F3F4F6]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#202636] flex items-center justify-between bg-[#0E121B]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-white">
              Export Audit Evidence
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              ({report.url.replace(/^https?:\/\//, '')})
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

        {/* Format Selector Bar */}
        <div className="px-6 py-3 border-b border-[#202636] bg-[#141824] flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#0E121B] border border-[#262E40] rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => setFormat('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                format === 'json'
                  ? 'bg-[#3156D9] text-white font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON Payload</span>
            </button>
            <button
              onClick={() => setFormat('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                format === 'markdown'
                  ? 'bg-[#3156D9] text-white font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown Summary</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#262E40] bg-[#181D2A] text-xs font-mono text-white hover:bg-[#202738] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="text-[#34D399]">Copied</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#3156D9] hover:bg-[#2546BC] text-xs font-mono text-white font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .{format === 'json' ? 'json' : 'md'}</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="p-6 flex-1 overflow-y-auto font-mono text-xs bg-[#0E121B]">
          <pre className="text-[#CBD5E1] whitespace-pre-wrap leading-relaxed">
            <code>{currentContent}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#202636] bg-[#0E121B] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <span>Exported format is schema-compliant for automated CI checks</span>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
