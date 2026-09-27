export type Language = 'en' | 'zh' | 'pt';

export type Severity = 'high' | 'medium' | 'pass';

export type Category = 'technical' | 'ai_readiness' | 'verification';

export interface Finding {
  id: string;
  category: Category;
  severity: Severity;
  titleKey: string;
  descriptionKey: string;
  rawEvidence: string;
  evidenceType: 'html' | 'header' | 'robots' | 'json';
  line?: number;
  remediationKey: string;
  remediationCode?: string;
  status: 'resolved' | 'active' | 'pass';
}

export interface BotStatus {
  botName: string;
  agent: string;
  status: 'allowed' | 'disallowed' | 'unknown';
  ruleSnippet: string;
  descriptionKey: string;
}

export interface ChangeVerificationItem {
  id: string;
  itemKey: string;
  status: 'resolved' | 'remaining' | 'new' | 'unknown';
  beforeSnippet: string;
  afterSnippet: string;
  impactKey: string;
}

export interface AuditReport {
  url: string;
  timestamp: string;
  score: number;
  scope: string;
  httpStatus: number;
  responseTimeMs: number;
  passedCount: number;
  attentionCount: number;
  findings: Finding[];
  bots: BotStatus[];
  verification: {
    resolved: number;
    remaining: number;
    newCount: number;
    unknownCount: number;
    items: ChangeVerificationItem[];
  };
}
