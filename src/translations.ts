import { Language } from './types';

export interface TranslationDictionary {
  brand: {
    name: string;
    product: string;
    tagline: string;
  };
  nav: {
    product: string;
    workflow: string;
    methodology: string;
    geoGuide: string;
    analyzeBtn: string;
    baselineToggle: string;
  };
  hero: {
    kicker: string;
    h1Line1: string;
    h1Line2: string;
    subtitle: string;
    inputPlaceholder: string;
    analyzeBtn: string;
    analyzing: string;
    badge: string;
    quickSamples: string;
    previewTitle: string;
    readinessLabel: string;
    singlePageAudit: string;
    findingsCount: string;
    viewEvidenceBtn: string;
    scoreHelper: string;
  };
  processRail: {
    step1Tag: string;
    step1Title: string;
    step1Desc: string;
    step2Tag: string;
    step2Title: string;
    step2Desc: string;
    step3Tag: string;
    step3Title: string;
    step3Desc: string;
    step4Tag: string;
    step4Title: string;
    step4Desc: string;
  };
  evidenceSection: {
    title: string;
    subtitle: string;
    tabTech: string;
    tabAi: string;
    tabVerification: string;
    inspectCode: string;
    copyCode: string;
    copied: string;
    severityHigh: string;
    severityMedium: string;
    severityPass: string;
    rawSnippet: string;
    remediationLabel: string;
    whyItMatters: string;
    botDirectivesTitle: string;
    botDirectivesDesc: string;
  };
  verificationTab: {
    title: string;
    subtitle: string;
    toggleLabel: string;
    beforeLabel: string;
    afterLabel: string;
    resolvedCountLabel: string;
    remainingCountLabel: string;
    newCountLabel: string;
    unknownCountLabel: string;
    statusResolved: string;
    statusRemaining: string;
    statusNew: string;
    statusUnknown: string;
    diffBefore: string;
    diffAfter: string;
  };
  pipelineSection: {
    title: string;
    subtitle: string;
    liveBadge: string;
    comingBadge: string;
    stepAudit: string;
    stepAuditDesc: string;
    stepVerify: string;
    stepVerifyDesc: string;
    stepDemand: string;
    stepDemandDesc: string;
    stepOpportunity: string;
    stepOpportunityDesc: string;
    stepBrief: string;
    stepBriefDesc: string;
    stepVisibility: string;
    stepVisibilityDesc: string;
    disclaimer: string;
  };
  footer: {
    productDesc: string;
    techChecks: string;
    aiChecks: string;
    remediation: string;
    verification: string;
    githubRepo: string;
    privacyNotice: string;
    allRightsReserved: string;
  };
  findingsContent: Record<string, { title: string; desc: string; remediation: string; impact: string }>;
  botContent: Record<string, { desc: string }>;
}

export const translations: Record<Language, TranslationDictionary> = {
  zh: {
    brand: {
      name: 'MandAPI',
      product: 'GEO',
      tagline: '技术 SEO 与 AI 搜索准备度工程工具',
    },
    nav: {
      product: '产品功能',
      workflow: '工作流',
      methodology: '核对方法论',
      geoGuide: 'GEO 手册',
      analyzeBtn: '分析网站 →',
      baselineToggle: '基线对比',
    },
    hero: {
      kicker: 'SEO + GEO 事实核对工具',
      h1Line1: '看见搜索引擎看到的内容。',
      h1Line2: '知道下一步该改什么。',
      subtitle: '检查技术 SEO、AI 搜索准备度和页面结构，得到可核对的证据、修复优先级和修改后的验证结果。',
      inputPlaceholder: 'https://your-site.com',
      analyzeBtn: '分析页面 →',
      analyzing: '正在抓取并核对标记...',
      badge: '无需注册 · 免费单页检查 · 附带证据代码',
      quickSamples: '快速体验：',
      previewTitle: '页面证据切片',
      readinessLabel: '准备度评分',
      singlePageAudit: '单页技术审计',
      findingsCount: '3 个重点关注项 · 7 项通过',
      viewEvidenceBtn: '查看完整证据明细 →',
      scoreHelper: '准备度评分仅作综合参考，核心在于各项事实证据与修复优先级。',
    },
    processRail: {
      step1Tag: '01 FETCH',
      step1Title: '读取公开页面',
      step1Desc: '抓取真实 HTML 结构、HTTP 响应头与元数据，排除客户端混淆。',
      step2Tag: '02 VERIFY',
      step2Title: '核对事实证据',
      step2Desc: '严格比对 canonical、JSON-LD、语义区块与爬虫访问规则。',
      step3Tag: '03 PRIORITIZE',
      step3Title: '确定修复顺序',
      step3Desc: '依据搜索引擎索引阻断程度排定优先级（High / Medium / Pass）。',
      step4Tag: '04 COMPARE',
      step4Title: '修改后重新验证',
      step4Desc: '保存基线并在发布后比对 diff，确认缺陷已被真实消除。',
    },
    evidenceSection: {
      title: '每一个建议，都应该有证据。',
      subtitle: '不是抽象评分或黑盒结论。每一项检查都提供匹配的原始 HTML 标记、HTTP 响应头或爬虫规则，方便工程师直接排查。',
      tabTech: '技术 SEO 检查',
      tabAi: 'AI 搜索准备度',
      tabVerification: '改动验证对比 (Diff)',
      inspectCode: '查看证据代码',
      copyCode: '复制代码',
      copied: '已复制',
      severityHigh: 'HIGH 优先修复',
      severityMedium: 'MEDIUM 次要改进',
      severityPass: 'PASS 已通过',
      rawSnippet: '抓取到的原始标记 / 响应',
      remediationLabel: '推荐修复代码',
      whyItMatters: '问题原因与影响分析',
      botDirectivesTitle: 'AI 爬虫访问状态 (robots.txt 规则)',
      botDirectivesDesc: '核对主流 AI 搜索引擎爬虫是否被明确允许或误阻拦。',
    },
    verificationTab: {
      title: '验证改动是否真正生效',
      subtitle: '将当前页面与历史基准版本对比，直观验证已解决问题、遗留项与新增变动。',
      toggleLabel: '切换基线对比视图',
      beforeLabel: '修复前 (基线)',
      afterLabel: '修复后 (当前扫描)',
      resolvedCountLabel: '已解决',
      remainingCountLabel: '仍遗留',
      newCountLabel: '新增问题',
      unknownCountLabel: '待复核',
      statusResolved: '已解决',
      statusRemaining: '待处理',
      statusNew: '新增',
      statusUnknown: '未确定',
      diffBefore: '修改前代码',
      diffAfter: '修复后代码',
    },
    pipelineSection: {
      title: '从一次扫描，到持续优化。',
      subtitle: 'MandAPI GEO 遵循严谨的工程落地路径，目前已开放单页审计与验证核对，后续模块正在研发中。',
      liveBadge: '已上线 LIVE',
      comingBadge: '研发中 COMING',
      stepAudit: 'AUDIT 事实审计',
      stepAuditDesc: '单页技术 SEO 与 AI 搜索规范的完整事实证据抓取与问题归集。',
      stepVerify: 'VERIFY 修复验证',
      stepVerifyDesc: '部署后即时对比新旧 DOM 与头信息，确认修复代码已如期生效。',
      stepDemand: 'SEARCH DEMAND 搜索需求',
      stepDemandDesc: '结合真实搜索意图与语义查询模式，分析内容覆盖缺口。',
      stepOpportunity: 'OPPORTUNITY 结构机会',
      stepOpportunityDesc: '挖掘页面实体图谱、Schema 与多模态信息提取机会。',
      stepBrief: 'BRIEF 优化指引',
      stepBriefDesc: '针对前端工程师与内容团队生成精准的技术规范与改动清单。',
      stepVisibility: 'AI VISIBILITY 引用监测',
      stepVisibilityDesc: '监测主要 AI 搜索引擎对页面事实实体的引用及来源注明。',
      disclaimer: '承诺：不提供虚构排名预测、不伪造外链数据、不提供未验证的黑盒得分。',
    },
    footer: {
      productDesc: 'MandAPI GEO 是面向工程师的 Technical SEO & AI Search Readiness 事实核对工具。',
      techChecks: '技术 SEO 核心检查',
      aiChecks: 'AI 检索准备度规范',
      remediation: '可执行修复代码',
      verification: '修改前后验证对比',
      githubRepo: 'GitHub 仓库',
      privacyNotice: '不存储未授权私有页面 · 纯公开技术核验',
      allRightsReserved: '保留所有权利 · MandAPI GEO v4',
    },
    findingsContent: {
      canonicalMismatch: {
        title: '规范链接 (Canonical) 与当前请求路径不一致',
        desc: '页面声明的 canonical 指向 https://mandapi.net/en/，而当前请求路径为根路径 /，可能导致搜索引擎将权重归并至未本地化的英文页面。',
        remediation: '<link rel="canonical" href="https://mandapi.net/" />',
        impact: '搜索引擎可能忽略当前页面的本地化内容，并在索引库中折叠收录。',
      },
      authorMissing: {
        title: '未在结构化数据中声明作者 (Authorship Entity)',
        desc: 'HTML 头部与 JSON-LD 中缺少 Author / Person 实体声明，降低了 AI 引擎对专业技术内容的权威性评估置信度。',
        remediation: '"author": {\n  "@type": "Person",\n  "name": "MandAPI Engineering Team",\n  "url": "https://mandapi.net/about"\n}',
        impact: 'AI 搜索摘要（Perplexity / ChatGPT Search）更偏好有明确作者或组织背书的内容源。',
      },
      schemaValid: {
        title: 'JSON-LD 语法结构有效且符合 Schema.org 规范',
        desc: '检测到有效的 WebSite 与 SoftwareApplication 结构化数据，无未闭合括号或非法字段。',
        remediation: '当前有效，保持即可。',
        impact: '提升富媒体摘要与实体图谱解析成功率。',
      },
      headingsHierarchy: {
        title: '标题层级结构规范 (单 H1，无跳跃层级)',
        desc: '页面仅包含唯一个 H1 标题，且后续二级与三级标题顺序为 H1 -> H2 -> H3，无乱序跳级。',
        remediation: '保持规范层级。',
        impact: '便于爬虫构建清晰的文档纲要大纲（Outline）。',
      },
      robotsAiSearch: {
        title: 'AI 搜索主流爬虫访问规则明确允许',
        desc: 'robots.txt 中未对 OAI-SearchBot 与 PerplexityBot 施加 Disallow 限制，允许检索公开页面。',
        remediation: 'User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /',
        impact: '保证新内容能在 AI 实时搜索引流时被即时索引。',
      },
      metaDescription: {
        title: '元描述长度适中 (142 字符)',
        desc: 'meta[name="description"] 长度为 142 字符，处于 120-160 最佳区间，且包含主要实体关键词。',
        remediation: '<meta name="description" content="..." />',
        impact: '保证在搜索结果摘要中完整展示，避免被自动截断。',
      },
      freshnessDate: {
        title: '缺少明确的内容发布与更新时间戳 (DateModified)',
        desc: '页面正文及 JSON-LD 中未包含符合 ISO 8601 / RFC 3339 格式的 dateModified 属性。',
        remediation: '<meta property="article:modified_time" content="2026-09-27T00:00:00Z" />',
        impact: 'AI 搜索更青睐时效性明确的内容，缺少时间戳可能被误判为陈旧页面。',
      },
    },
    botContent: {
      oai: {
        desc: 'OpenAI 实时搜索引擎爬虫，用于 ChatGPT 网页搜索引用。',
      },
      perplexity: {
        desc: 'Perplexity 索引与检索代理，用于生成带来源角标的回答。',
      },
      claude: {
        desc: 'Anthropic 网页搜索代理，当前未检测到明确的用户代理规则，继承缺省策略。',
      },
      googleExtended: {
        desc: 'Google Gemini 扩展训练与提取控制，当前公开页面允许访问。',
      },
    },
  },

  en: {
    brand: {
      name: 'MandAPI',
      product: 'GEO',
      tagline: 'Technical SEO & AI Search Readiness Engineering Tool',
    },
    nav: {
      product: 'Product',
      workflow: 'Workflow',
      methodology: 'Methodology',
      geoGuide: 'GEO Guide',
      analyzeBtn: 'Analyze website →',
      baselineToggle: 'Baseline diff',
    },
    hero: {
      kicker: 'SEO + GEO EVIDENCE INSPECTOR',
      h1Line1: 'See what search engines see.',
      h1Line2: 'Know what to change next.',
      subtitle: 'Audit technical SEO, AI search readiness, and page structure. Get verifiable evidence, clear remediation priorities, and post-fix validation.',
      inputPlaceholder: 'https://your-site.com',
      analyzeBtn: 'Analyze site →',
      analyzing: 'Fetching DOM & verifying tags...',
      badge: 'No signup · Free page audit · Evidence-based',
      quickSamples: 'Quick samples:',
      previewTitle: 'Page Evidence Slice',
      readinessLabel: 'READINESS',
      singlePageAudit: 'Single page audit',
      findingsCount: '3 findings · 7 passed',
      viewEvidenceBtn: 'View evidence breakdown →',
      scoreHelper: 'The readiness score is a compact auxiliary index. The core value lies in code evidence and fix priorities.',
    },
    processRail: {
      step1Tag: '01 FETCH',
      step1Title: 'Fetch Public Page',
      step1Desc: 'Extract raw HTML structure, response headers, and document tags without client-side illusions.',
      step2Tag: '02 VERIFY',
      step2Title: 'Verify Tag Evidence',
      step2Desc: 'Check canonical tags, JSON-LD, headings hierarchy, and robots.txt directives against standards.',
      step3Tag: '03 PRIORITIZE',
      step3Title: 'Prioritize Fixes',
      step3Desc: 'Rank issues by indexation risk and crawler friction (High / Medium / Pass).',
      step4Tag: '04 COMPARE',
      step4Title: 'Validate Changes',
      step4Desc: 'Save a pre-fix baseline and re-crawl after deployment to verify issues are actually resolved.',
    },
    evidenceSection: {
      title: 'Every recommendation should have evidence.',
      subtitle: 'No black-box guesses or opaque scores. Every check presents the exact HTML snippet, HTTP header, or crawler directive for engineering verification.',
      tabTech: 'Technical SEO',
      tabAi: 'AI Search Readiness',
      tabVerification: 'Change Verification (Diff)',
      inspectCode: 'Inspect Evidence',
      copyCode: 'Copy Snippet',
      copied: 'Copied',
      severityHigh: 'HIGH Priority',
      severityMedium: 'MEDIUM Attention',
      severityPass: 'PASS Verified',
      rawSnippet: 'Matched Raw HTML / Response Header',
      remediationLabel: 'Recommended Remediation Code',
      whyItMatters: 'Engineering Impact & Root Cause',
      botDirectivesTitle: 'AI Search Bot Directives (robots.txt)',
      botDirectivesDesc: 'Verify whether dominant AI search agents are permitted or inadvertently blocked.',
    },
    verificationTab: {
      title: 'Verify that changes actually happened',
      subtitle: 'Compare the current crawl against your historical baseline to confirm resolved defects and ensure no regressions.',
      toggleLabel: 'Toggle baseline diff mode',
      beforeLabel: 'Before Fix (Baseline)',
      afterLabel: 'After Fix (Current Scan)',
      resolvedCountLabel: 'Resolved',
      remainingCountLabel: 'Remaining',
      newCountLabel: 'New Issues',
      unknownCountLabel: 'Unknown',
      statusResolved: 'Resolved',
      statusRemaining: 'Remaining',
      statusNew: 'New',
      statusUnknown: 'Unknown',
      diffBefore: 'Before-fix code',
      diffAfter: 'After-fix code',
    },
    pipelineSection: {
      title: 'From a single audit, to continuous optimization.',
      subtitle: 'MandAPI GEO is architected as an engineering pipeline. Single-page audits and verification are live today; downstream modules are currently in active development.',
      liveBadge: 'LIVE NOW',
      comingBadge: 'COMING',
      stepAudit: 'AUDIT',
      stepAuditDesc: 'Single-page technical SEO & AI search readiness fact-checking and code evidence collection.',
      stepVerify: 'VERIFY',
      stepVerifyDesc: 'Post-deployment DOM and header diffing to confirm engineering fixes took effect.',
      stepDemand: 'SEARCH DEMAND',
      stepDemandDesc: 'Semantic search intent and query cluster coverage analysis.',
      stepOpportunity: 'OPPORTUNITY',
      stepOpportunityDesc: 'Schema entity graph expansion and multi-modal content extraction opportunities.',
      stepBrief: 'BRIEF',
      stepBriefDesc: 'Machine-actionable engineering specs and pull-request checklists for developers.',
      stepVisibility: 'AI VISIBILITY',
      stepVisibilityDesc: 'Citation tracking across real AI engines with attributed factual source citations.',
      disclaimer: 'Commitment: No fabricated ranking predictions, no synthetic backlink counts, and no black-box scores.',
    },
    footer: {
      productDesc: 'MandAPI GEO is a developer-grade technical SEO and AI search readiness evidence platform.',
      techChecks: 'Core Technical SEO',
      aiChecks: 'AI Readiness Standards',
      remediation: 'Actionable Code Fixes',
      verification: 'Before / After Diffs',
      githubRepo: 'GitHub Repository',
      privacyNotice: 'Only analyzes publicly accessible URLs · No private data retention',
      allRightsReserved: 'All rights reserved · MandAPI GEO v4',
    },
    findingsContent: {
      canonicalMismatch: {
        title: 'Canonical URL mismatches current requested path',
        desc: 'The page declares canonical as https://mandapi.net/en/, whereas current request path is root /, which can cause search engines to consolidate equity away from the localized document.',
        remediation: '<link rel="canonical" href="https://mandapi.net/" />',
        impact: 'Search engines may drop localized variants from search indexes or attribute signals to the wrong locale.',
      },
      authorMissing: {
        title: 'Author entity missing from structured data',
        desc: 'HTML header and JSON-LD schema lack an explicit Author / Person entity, lowering confidence scores for technical content authority in AI engines.',
        remediation: '"author": {\n  "@type": "Person",\n  "name": "MandAPI Engineering Team",\n  "url": "https://mandapi.net/about"\n}',
        impact: 'AI search bots (Perplexity / ChatGPT Search) assign higher attribution confidence to author-verified sources.',
      },
      schemaValid: {
        title: 'JSON-LD syntax is valid and Schema.org compliant',
        desc: 'Valid WebSite and SoftwareApplication structured data detected without syntax errors or unescaped characters.',
        remediation: 'Compliant as tested. Maintain current structure.',
        impact: 'Ensures reliable entity graph construction and rich snippet eligibility.',
      },
      headingsHierarchy: {
        title: 'Heading hierarchy is orderly (Single H1, no skipped levels)',
        desc: 'Document has exactly one H1 element and follows standard sequential H1 -> H2 -> H3 outline structure.',
        remediation: 'Maintain current heading architecture.',
        impact: 'Enables deterministic content chunking by LLMs and search document parsers.',
      },
      robotsAiSearch: {
        title: 'Robots.txt explicitly allows major AI search engines',
        desc: 'No disallow directives prevent OAI-SearchBot and PerplexityBot from accessing public technical pages.',
        remediation: 'User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /',
        impact: 'Allows real-time generative search engines to index and cite current technical documentation.',
      },
      metaDescription: {
        title: 'Meta description length is balanced (142 characters)',
        desc: 'meta[name="description"] is 142 characters, well within the optimal 120-160 character boundary.',
        remediation: '<meta name="description" content="..." />',
        impact: 'Prevents mid-sentence SERP snippet truncation.',
      },
      freshnessDate: {
        title: 'Content timestamp (DateModified) missing from markup',
        desc: 'Neither article body nor JSON-LD specifies a valid ISO 8601 dateModified attribute.',
        remediation: '<meta property="article:modified_time" content="2026-09-27T00:00:00Z" />',
        impact: 'AI crawlers prioritize fresh, verifiable information; missing timestamps lead to stale-content penalties.',
      },
    },
    botContent: {
      oai: {
        desc: 'OpenAI search crawler powering real-time web retrieval in ChatGPT.',
      },
      perplexity: {
        desc: 'Perplexity retrieval agent indexing web sources for attributed citations.',
      },
      claude: {
        desc: 'Anthropic web search agent; currently inherits default crawler permissions.',
      },
      googleExtended: {
        desc: 'Controls data extraction for Google AI models and Gemini capabilities.',
      },
    },
  },

  pt: {
    brand: {
      name: 'MandAPI',
      product: 'GEO',
      tagline: 'Ferramenta de Engenharia para SEO Técnico e Prontidão de Busca por IA',
    },
    nav: {
      product: 'Produto',
      workflow: 'Fluxo',
      methodology: 'Metodologia',
      geoGuide: 'Guia GEO',
      analyzeBtn: 'Analisar site →',
      baselineToggle: 'Diff de baseline',
    },
    hero: {
      kicker: 'EVIDÊNCIAS DE SEO + GEO',
      h1Line1: 'Veja o que os motores de busca veem.',
      h1Line2: 'Saiba o que corrigir a seguir.',
      subtitle: 'Audite SEO técnico, prontidão para busca por IA e estrutura de página. Obtenha evidências verificáveis, prioridades claras e validação pós-ajuste.',
      inputPlaceholder: 'https://seu-site.com',
      analyzeBtn: 'Analisar site →',
      analyzing: 'Buscando DOM e verificando tags...',
      badge: 'Sem cadastro · Auditoria gratuita de página · Baseada em evidências',
      quickSamples: 'Exemplos rápidos:',
      previewTitle: 'Recorte de evidência de página',
      readinessLabel: 'PRONTIDÃO',
      singlePageAudit: 'Auditoria de página única',
      findingsCount: '3 pontos de atenção · 7 aprovados',
      viewEvidenceBtn: 'Ver detalhamento de evidências →',
      scoreHelper: 'A pontuação de prontidão é um índice auxiliar. O valor real reside nas evidências e prioridades de correção.',
    },
    processRail: {
      step1Tag: '01 FETCH',
      step1Title: 'Buscar página pública',
      step1Desc: 'Extrai a estrutura HTML real, cabeçalhos HTTP e metadados sem interferência client-side.',
      step2Tag: '02 VERIFY',
      step2Title: 'Verificar evidências',
      step2Desc: 'Compara canonicals, JSON-LD, hierarquia de cabeçalhos e diretivas do robots.txt.',
      step3Tag: '03 PRIORITIZE',
      step3Title: 'Priorizar correções',
      step3Desc: 'Classifica os problemas por risco de indexação e atrito de rastreamento (High / Medium / Pass).',
      step4Tag: '04 COMPARE',
      step4Title: 'Validar alterações',
      step4Desc: 'Salva uma linha de base antes do fix e reavalia após o deploy para confirmar o resultado.',
    },
    evidenceSection: {
      title: 'Cada recomendação deve ter evidência.',
      subtitle: 'Sem suposições de caixa preta. Cada verificação exibe o snippet de código HTML exato, cabeçalho HTTP ou diretiva de rastreador para inspeção técnica.',
      tabTech: 'SEO Técnico',
      tabAi: 'Prontidão para Busca por IA',
      tabVerification: 'Validação de Alterações (Diff)',
      inspectCode: 'Inspecionar código',
      copyCode: 'Copiar snippet',
      copied: 'Copiado',
      severityHigh: 'HIGH Prioridade alta',
      severityMedium: 'MEDIUM Atenção',
      severityPass: 'PASS Aprovado',
      rawSnippet: 'Snippet HTML / Cabeçalho HTTP capturado',
      remediationLabel: 'Código de correção recomendado',
      whyItMatters: 'Causa raiz e impacto técnico',
      botDirectivesTitle: 'Diretivas de Robôs de Busca por IA (robots.txt)',
      botDirectivesDesc: 'Verifique se os principais agentes de busca por IA têm permissão de leitura.',
    },
    verificationTab: {
      title: 'Validar se as correções realmente ocorreram',
      subtitle: 'Compare a varredura atual com a linha de base histórica para verificar problemas corrigidos e evitar regressões.',
      toggleLabel: 'Alternar modo de comparação',
      beforeLabel: 'Antes da Correção (Baseline)',
      afterLabel: 'Depois da Correção (Atual)',
      resolvedCountLabel: 'Resolvidos',
      remainingCountLabel: 'Restantes',
      newCountLabel: 'Novos',
      unknownCountLabel: 'Indefinidos',
      statusResolved: 'Resolvido',
      statusRemaining: 'Pendente',
      statusNew: 'Novo',
      statusUnknown: 'Indefinido',
      diffBefore: 'Código antes do ajuste',
      diffAfter: 'Código após o ajuste',
    },
    pipelineSection: {
      title: 'De uma única auditoria à otimização contínua.',
      subtitle: 'O MandAPI GEO foi concebido como um pipeline de engenharia. Auditoria de página e validação já estão ativas; etapas seguintes estão em desenvolvimento.',
      liveBadge: 'DISPONÍVEL LIVE',
      comingBadge: 'EM BREVE COMING',
      stepAudit: 'AUDIT Auditoria',
      stepAuditDesc: 'Auditoria de SEO técnico e prontidão para IA com evidências concretas de código.',
      stepVerify: 'VERIFY Validação',
      stepVerifyDesc: 'Comparação de DOM e headers pós-deploy para confirmar se os fixes surtiram efeito.',
      stepDemand: 'SEARCH DEMAND Demanda',
      stepDemandDesc: 'Análise de intenção de busca semântica e clusters de consultas.',
      stepOpportunity: 'OPPORTUNITY Oportunidade',
      stepOpportunityDesc: 'Expansão de grafos de entidade Schema e extração de conteúdo multimodal.',
      stepBrief: 'BRIEF Especificação',
      stepBriefDesc: 'Checklists técnicos acionáveis e especificações para pull requests de engenharia.',
      stepVisibility: 'AI VISIBILITY Visibilidade',
      stepVisibilityDesc: 'Monitoramento de citações com fontes atribuídas em motores de busca generativos.',
      disclaimer: 'Compromisso: sem previsões de ranking forjadas, sem backlinks fictícios e sem pontuações opacas.',
    },
    footer: {
      productDesc: 'MandAPI GEO é uma plataforma para desenvolvedores focada em evidências técnicas de SEO e prontidão para IA.',
      techChecks: 'Verificações de SEO Técnico',
      aiChecks: 'Padrões de Prontidão para IA',
      remediation: 'Código de Correção Direto',
      verification: 'Diff de Antes e Depois',
      githubRepo: 'Repositório GitHub',
      privacyNotice: 'Analisa apenas páginas públicas · Sem retenção de dados privados',
      allRightsReserved: 'Todos os direitos reservados · MandAPI GEO v4',
    },
    findingsContent: {
      canonicalMismatch: {
        title: 'Canonical divergente da URL requisitada',
        desc: 'A página declara canonical como https://mandapi.net/en/, mas a requisição atual é na raiz /, o que pode fazer motores de busca consolidarem a autoridade na variante errada.',
        remediation: '<link rel="canonical" href="https://mandapi.net/" />',
        impact: 'Mecanismos de busca podem desconsiderar a versão localizada ou omiti-la do índice primário.',
      },
      authorMissing: {
        title: 'Entidade de autor ausente nos dados estruturados',
        desc: 'O cabeçalho HTML e os dados JSON-LD carecem de especificação clara de Autor / Person, reduzindo a autoridade em mecanismos de IA.',
        remediation: '"author": {\n  "@type": "Person",\n  "name": "MandAPI Engineering Team",\n  "url": "https://mandapi.net/about"\n}',
        impact: 'Buscadores de IA (Perplexity / ChatGPT Search) priorizam conteúdos com autoria e organização comprováveis.',
      },
      schemaValid: {
        title: 'Sintaxe JSON-LD válida e conforme Schema.org',
        desc: 'Estruturas WebSite e SoftwareApplication válidas detectadas sem erros de parse ou caracteres inválidos.',
        remediation: 'Conforme avaliado. Mantenha a estrutura atual.',
        impact: 'Garante a correta extração do grafo de entidades e qualificação para rich snippets.',
      },
      headingsHierarchy: {
        title: 'Hierarquia de cabeçalhos íntegra (H1 único, sem saltos)',
        desc: 'O documento possui exatamente uma tag H1 e respeita a sequência estrutural H1 -> H2 -> H3.',
        remediation: 'Mantenha a ordenação semântica.',
        impact: 'Facilita a segmentação do conteúdo por LLMs e crawlers de busca.',
      },
      robotsAiSearch: {
        title: 'Robots.txt permite os principais bots de busca por IA',
        desc: 'Sem regras de Disallow para OAI-SearchBot e PerplexityBot, garantindo a indexação das páginas técnicas.',
        remediation: 'User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /',
        impact: 'Permite que motores de busca em tempo real citem os documentos como fonte de resposta.',
      },
      metaDescription: {
        title: 'Comprimento da meta description adequado (142 caracteres)',
        desc: 'meta[name="description"] tem 142 caracteres, dentro do intervalo recomendado de 120 a 160 caracteres.',
        remediation: '<meta name="description" content="..." />',
        impact: 'Evita cortes visuais no snippet da página de resultados de busca.',
      },
      freshnessDate: {
        title: 'Timestamp de atualização (DateModified) ausente',
        desc: 'Nem o HTML nem o JSON-LD especificam uma data válida no padrão ISO 8601.',
        remediation: '<meta property="article:modified_time" content="2026-09-27T00:00:00Z" />',
        impact: 'Rastreadores de IA priorizam conteúdos recentes; a falta de data pode sugerir documento desatualizado.',
      },
    },
    botContent: {
      oai: {
        desc: 'Rastreador de busca da OpenAI para respostas web em tempo real no ChatGPT.',
      },
      perplexity: {
        desc: 'Agente de recuperação da Perplexity para atribuição de fontes com citações.',
      },
      claude: {
        desc: 'Agente de busca da Anthropic; herda diretivas padrão quando não especificado.',
      },
      googleExtended: {
        desc: 'Controla extração de conteúdo para modelos Google Gemini e recursos de IA.',
      },
    },
  },
};
