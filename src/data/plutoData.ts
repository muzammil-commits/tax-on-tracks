import { ServiceItem, TestimonialItem, SiteStatistics } from '../types';

export const BUSINESS_INFO = {
  name: 'PlutoTax Consulting & Advisory LLC',
  shortName: 'PlutoTax',
  tagline: 'Your Trusted Partner in Tax Planning, Filing & Financial Confidence',
  address: '814 San Jacinto Suite 400, Austin, TX 78701, USA',
  phone: '+1 (254) 221-0222',
  phoneRaw: '+12542210222',
  email: 'support@plutotax.com',
  whatsappUrl: 'https://wa.me/12542210222',
  irsTrackingUrl: 'https://irs.gov/wheres-my-refund',
  workingHours: 'Monday – Friday: 8:00 AM – 7:00 PM CST | Saturday: 9:00 AM – 3:00 PM CST',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/plutotax',
    twitter: 'https://twitter.com/plutotax',
    facebook: 'https://facebook.com/plutotax',
    instagram: 'https://instagram.com/plutotax',
  },
};

export const DEFAULT_STATS: SiteStatistics = {
  returnsFiled: '15,000+',
  refundsMaximized: '$12M+',
  clientSatisfaction: '99.8%',
  isOwnerVerified: false,
  notes: 'Reference values from design mockups. Mark for business owner review before treating as verified audited claims.',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'tax-planning',
    slug: 'tax-planning',
    title: 'Advance Tax Planning & Tax Strategy',
    tagline: 'Proactive strategic tax structuring to protect wealth and minimize liabilities.',
    shortDescription:
      'Proactive tax planning to minimize future tax liabilities, optimize investments, maximize eligible deductions and strategically manage stock options and financial decisions.',
    fullDescription:
      "True financial success isn't just about filing taxes accurately at year-end; it's about making strategic, forward-looking decisions throughout the year. PlutoTax Advance Tax Planning delivers tailored advisory for high-earning professionals, entrepreneurs, and families with complex assets. We model multi-year tax projections, explore legal tax credits, structure retirement contributions, optimize equity grants (RSUs, ISOs, ESPP), and design entity structures that legally insulate your wealth.",
    heroImage: '/assets/services/tax-planning.jpg',
    iconName: 'TrendingUp',
    whoNeedsThis: [
      'High-earning W-2 tech professionals with substantial equity compensation (RSUs, ISOs, ESPP)',
      'Business owners, LLC founders, and partners looking for tax shelter strategies',
      'Investors with growing capital gains, real estate holdings, or cryptocurrency portfolios',
      'Individuals experiencing major life milestones: home purchases, marriage, or corporate exits',
    ],
    keyBenefits: [
      'Substantial multi-year tax liability reductions through proactive structuring',
      'Strategic timing of stock option exercises to mitigate Alternative Minimum Tax (AMT)',
      'Retirement optimization including Backdoor Roth IRA and Mega-Backdoor 401(k) blueprints',
      'Legally maximized depreciation schedules and 1031 like-kind exchange guidance',
    ],
    processSteps: [
      { step: '01', title: 'Comprehensive Financial Audit', description: 'We analyze your prior 3 years of tax returns, asset statements, and upcoming income streams.' },
      { step: '02', title: 'Scenario & Multi-Year Modeling', description: 'Our CPAs simulate various tax strategies comparing traditional vs. aggressive legal deductions.' },
      { step: '03', title: 'Customized Strategy Blueprint', description: 'We deliver an actionable, step-by-step roadmap specifying action items and key calendar deadlines.' },
      { step: '04', title: 'Quarterly Review & Execution', description: 'Ongoing check-ins ensure your strategies adapt dynamically to changes in IRS tax laws.' },
    ],
    requiredDocuments: [
      'Prior 3 years of Federal and State tax returns (Forms 1040)',
      'Stock vesting schedules, grant agreements, and brokerage statements',
      'Retirement plan contribution summaries (401k, IRA, HSA)',
      'Estimates of anticipated capital gains, real estate sales, or business income',
    ],
    faqs: [
      {
        question: 'How does tax planning differ from ordinary tax preparation?',
        answer: 'Tax preparation is backward-looking—recording what happened in the prior tax year. Tax planning is forward-looking—creating strategies before the year closes so you pay significantly less tax.',
      },
      {
        question: 'When should I begin tax planning?',
        answer: 'The earlier in the tax year, the greater the tax savings. Q1 and Q2 offer maximum flexibility for retirement structuring, entity elections, and harvesting strategies.',
      },
      {
        question: 'Can you help with AMT on ISO stock options?',
        answer: 'Yes. We model your AMT crossover point to minimize or eliminate Alternative Minimum Tax surprise bills upon exercise.',
      },
    ],
    relatedServices: ['wealth-advisory', 'federal-tax-preparation', 'business-tax'],
  },
  {
    id: 'federal-tax-preparation',
    slug: 'federal-tax-preparation',
    title: 'Federal & Multi-State Tax Preparation',
    tagline: 'Precision individual tax preparation for residents, non-residents, and visa holders.',
    shortDescription:
      'Professional federal and state tax return preparation for US citizens, Green Card holders, H1B, L1 and F1 OPT visa holders, including resident, non-resident and dual-status returns.',
    fullDescription:
      'Navigating US Federal and 50-state tax rules requires meticulous compliance. PlutoTax specializes in individual tax filings with particular depth in foreign visa residency rules, multi-state tax apportionments, remote work state nexus, and resident alien status determination. Whether you file standard Form 1040, non-resident Form 1040-NR, or require a First-Year Choice dual-status return, our licensed CPAs ensure 100% precision and maximum allowable deductions.',
    heroImage: '/assets/services/federal-tax.jpg',
    iconName: 'FileSpreadsheet',
    whoNeedsThis: [
      'US Citizens and Permanent Residents (Green Card holders) with domestic and multi-state income',
      'Visa holders on H-1B, L-1, O-1, TN, and E-3 status needing Substantial Presence Test evaluation',
      'Students and scholars on F-1, J-1, or OPT status requiring 1040-NR and tax treaty exemption claims',
      'Remote workers and mobile employees receiving W-2s from multiple US states',
    ],
    keyBenefits: [
      'Accurate determination of residency status under the IRS Substantial Presence Test',
      'Maximization of credits (Child Tax Credit, EV Credits, Education Credits, Energy Efficiency)',
      'Precise multi-state allocation to avoid double state taxation on mobile earnings',
      'Direct IRS electronic filing with instant acceptance confirmation',
    ],
    processSteps: [
      { step: '01', title: 'Document Upload & Residency Check', description: 'Upload your W-2s, 1099s, and visa travel history via our secure portal.' },
      { step: '02', title: 'CPA Analysis & Form Drafting', description: 'Our CPA calculates your federal and state tax liabilities and identifies all legal deductions.' },
      { step: '03', title: 'Draft Review & Signature', description: 'Review your transparent tax summary, ask questions, and digitally authorize e-filing.' },
      { step: '04', title: 'IRS Transmission & Tracking', description: 'We e-file with the IRS and State Departments of Revenue, providing live tracking numbers.' },
    ],
    requiredDocuments: [
      'Forms W-2, 1099-INT, 1099-DIV, 1099-B, 1099-NEC, 1099-MISC',
      'US Travel Entry/Exit records (I-94) and Visa documents for Substantial Presence Test',
      'Form 1098 for Mortgage Interest and Property Tax statements',
      'Health coverage forms (Form 1095-A, 1095-B, or 1095-C)',
    ],
    faqs: [
      {
        question: 'How do I know if I should file 1040 or 1040-NR?',
        answer: 'This depends on the IRS Substantial Presence Test and your visa category. F-1 students are generally exempt for 5 calendar years, while H-1B holders typically become resident aliens after meeting the 183-day rule. We evaluate this for you automatically.',
      },
      {
        question: 'What if I worked in two or more states during the year?',
        answer: 'We prepare part-year resident returns or non-resident state returns for each state, ensuring credit for taxes paid to other states is calculated properly to prevent double taxation.',
      },
    ],
    relatedServices: ['tax-planning', 'itin-processing', 'fbar-fatca'],
  },
  {
    id: 'fbar-fatca',
    slug: 'fbar-fatca',
    title: 'FBAR & FATCA Compliance',
    tagline: 'Shield yourself from severe penalties with bulletproof foreign asset disclosure.',
    shortDescription:
      'Foreign financial account and asset reporting, including FBAR (FinCEN Form 114), FATCA (Form 8938) and related international tax compliance.',
    fullDescription:
      'US tax law requires US persons—including citizens, Green Card holders, and resident aliens (H-1B, L-1)—to disclose offshore financial accounts exceeding specified statutory thresholds. Failure to file FinCEN Form 114 (FBAR) or IRS Form 8938 (FATCA) triggers civil penalties starting at $10,000+ per non-willful violation, and up to 50% of account balances for willful omissions. PlutoTax guides you through complete, compliant foreign asset reporting with zero stress.',
    heroImage: '/assets/services/fbar-fatca.jpg',
    iconName: 'ShieldAlert',
    whoNeedsThis: [
      'US residents holding foreign bank savings, fixed deposits (FD), or NRE/NRO accounts exceeding $10,000 aggregate balance',
      'Owners of foreign mutual funds, PFICs, offshore pension schemes (PPF, EPF), or foreign life insurance policies',
      'Holders of foreign brokerage and investment accounts with offshore stocks or mutual funds',
      'Expats and individuals inheriting offshore cash or financial assets',
    ],
    keyBenefits: [
      'Rigorous calculation of peak account balances using official Treasury exchange rates',
      'Complete protection against severe civil and criminal FinCEN reporting penalties',
      'Streamlined filing guidance for prior-year delinquent disclosures (SDOP / SFOP)',
      'Direct BSA E-Filing system submission with official FinCEN acknowledgment',
    ],
    processSteps: [
      { step: '01', title: 'Offshore Account Inventory', description: 'We gather statements for all foreign checking, savings, fixed deposit, and investment accounts.' },
      { step: '02', title: 'Peak Balance Currency Conversion', description: 'Convert maximum foreign currency balances to USD using official US Treasury exchange rates.' },
      { step: '03', title: 'FinCEN 114 & Form 8938 Preparation', description: 'Prepare precise disclosure schedules matching your Federal 1040 return.' },
      { step: '04', title: 'Secure Transmission & Receipt', description: 'Submit via the official FinCEN BSA e-filing portal and archive confirmed filing receipts.' },
    ],
    requiredDocuments: [
      'Statements for all foreign bank accounts (NRE, NRO, Savings, FCNR) showing peak balance in the calendar year',
      'Foreign mutual fund, equity portfolio, and PPF/EPF ledger statements',
      'Foreign life insurance policy cash surrender value statements',
      'Official bank details (Bank Name, Branch Address, Account Numbers, SWIFT/BIC codes)',
    ],
    faqs: [
      {
        question: 'What is the threshold for filing FBAR?',
        answer: 'You must file an FBAR if the aggregate highest value of all your foreign financial accounts exceeded $10,000 USD at any point during the calendar year, even for a single day.',
      },
      {
        question: 'What is the difference between FBAR and FATCA Form 8938?',
        answer: 'FBAR is an annual report filed directly with the Financial Crimes Enforcement Network (FinCEN). Form 8938 is filed with the IRS attached to your Form 1040 return and has higher reporting thresholds ($50,000 to $100,000+ depending on filing status).',
      },
    ],
    relatedServices: ['nri-tax-solutions', 'federal-tax-preparation', 'wealth-advisory'],
  },
  {
    id: 'itin-processing',
    slug: 'itin-processing',
    title: 'ITIN Processing (IRS CAA)',
    tagline: 'IRS-authorized ITIN applications without mailing away original passports.',
    shortDescription:
      'Assistance with obtaining or renewing Individual Taxpayer Identification Numbers, including Form W-7 preparation and eligible identity-document verification.',
    fullDescription:
      'Applying for an Individual Taxpayer Identification Number (ITIN) through conventional mail often means mailing your original passport to the IRS for months with significant risk of loss or travel disruption. As an authorized IRS Certifying Acceptance Agent (CAA), PlutoTax is legally licensed by the IRS to verify your original identity documents in-person or via secure video verification, issue an official Certificate of Accuracy (Form W-7 COA), and file your application so you never part with your passport.',
    heroImage: '/assets/services/itin-processing.jpg',
    iconName: 'FileBadge',
    whoNeedsThis: [
      'Spouses and dependent children of H-1B, L-1, or green card holders needing ITINs to file Married Filing Jointly',
      'Non-resident aliens receiving US taxable income or claiming tax treaty benefits',
      'Foreign investors purchasing US real estate, founding US LLCs, or opening US bank accounts',
      'Holders of expired ITIN numbers requiring IRS renewal before tax filing',
    ],
    keyBenefits: [
      'Keep your original passport safely in your possession—no mailing to the IRS',
      'Authorized CAA issuance of IRS Form W-7 Certificate of Accuracy',
      'Significant reduction in IRS rejection rates and expedited document verification',
      'Simultaneous filing of your joint Federal tax return to unlock maximum tax refunds',
    ],
    processSteps: [
      { step: '01', title: 'Document Review & Eligibility Check', description: 'Review applicant eligibility under IRS W-7 tax filing or exception categories.' },
      { step: '02', title: 'In-Person or Secure CAA Verification', description: 'Our Certifying Acceptance Agent verifies the authentic passport and secondary identification.' },
      { step: '03', title: 'W-7 Preparation & CAA Certification', description: 'We prepare Form W-7 and execute the official CAA Certificate of Accuracy (COA).' },
      { step: '04', title: 'Submission & Assignment Tracking', description: 'We submit the certified package directly to the IRS ITIN Unit and track issuance of the CP565 letter.' },
    ],
    requiredDocuments: [
      'Original Passport of applicant (verified by our CAA)',
      'Foreign birth certificate or national ID card (for minor children dependents)',
      'US Visa copy and entry stamp (Form I-94)',
      'Federal tax return (Form 1040) to which the ITIN application attaches',
    ],
    faqs: [
      {
        question: 'Why should I use a CAA instead of filing Form W-7 on my own?',
        answer: 'When filing on your own, you must mail your physical original passport to the IRS, which can take 9 to 14 weeks. A CAA is authorized by the IRS to verify your passport on the spot, allowing you to keep your passport safe at all times.',
      },
      {
        question: 'Can my spouse get an ITIN without visiting Austin, TX?',
        answer: 'Yes, we facilitate authorized document verification workflows and remote scheduling following IRS CAA guidelines.',
      },
    ],
    relatedServices: ['federal-tax-preparation', 'nri-tax-solutions', 'business-tax'],
  },
  {
    id: 'business-tax',
    slug: 'business-tax',
    title: 'Business Tax Filing & Bookkeeping',
    tagline: 'Corporate tax optimization, payroll, and bookkeeping for startups and enterprises.',
    shortDescription:
      'Business tax preparation, accounting, bookkeeping, payroll and corporate tax filing for LLCs, S-Corporations, C-Corporations, startups and small businesses.',
    fullDescription:
      'From early-stage startups and consulting LLCs to mature S-Corporations and multi-state C-Corporations, PlutoTax provides comprehensive bookkeeping, payroll, and corporate tax compliance. We manage corporate returns (Forms 1065, 1120, 1120-S), Schedule C sole proprietorships, franchise tax filings, quarterly estimated taxes, and financial statement compilation, giving you the clarity needed to scale profitably.',
    heroImage: '/assets/services/business-tax.jpg',
    iconName: 'Building2',
    whoNeedsThis: [
      'Single-member and multi-member LLCs, S-Corps, and C-Corps seeking accurate corporate returns',
      'Tech founders, consultants, and IT staffing agencies needing organized monthly bookkeeping',
      'Foreign-owned US LLCs requiring Form 5472 and Form 1120 non-resident compliance',
      'Growing companies needing payroll processing, 1099-NEC contractor filings, and sales tax filings',
    ],
    keyBenefits: [
      'Strategic S-Corp election analysis (Form 2553) to minimize FICA self-employment taxes',
      'Clean, audit-ready Profit & Loss statements and Balance Sheets generated monthly',
      'Maximization of business deductions: Section 179 depreciation, home office, and vehicle expenses',
      'Comprehensive multi-state corporate franchise and sales tax compliance',
    ],
    processSteps: [
      { step: '01', title: 'Financial Accounts Onboarding', description: 'Connect business bank feeds and reconcile prior books into clean ledger accounts.' },
      { step: '02', title: 'Quarterly Review & Bookkeeping', description: 'Categorize business revenue and expenses, reconciling accounts monthly.' },
      { step: '03', title: 'Corporate Return Preparation', description: 'Prepare Form 1120-S, Form 1065, or Form 1120 along with Schedule K-1s for all shareholders.' },
      { step: '04', title: 'State Franchise Filing & K-1 Distribution', description: 'Submit state franchise reports and issue K-1 forms to owners for personal return filing.' },
    ],
    requiredDocuments: [
      'Company Articles of Organization / Incorporation and IRS EIN Confirmation Letter (CP 575)',
      'Profit & Loss statement, Balance sheet, or business bank statements for the tax year',
      'Prior year business tax returns (Forms 1065, 1120-S, or 1120)',
      'Payroll summary reports (Forms 940, 941, W-3, W-2s) and 1099-NEC records',
    ],
    faqs: [
      {
        question: 'When does an LLC benefit from electing S-Corporation status?',
        answer: 'Once an LLC generates over $60,000 to $80,000 in net profit, an S-Corp election can save thousands of dollars in self-employment taxes by splitting income between reasonable W-2 salary and distributions.',
      },
      {
        question: 'Do you handle Form 5472 for foreign-owned single-member LLCs?',
        answer: 'Yes, this is a core specialty. Failure to file Form 5472 incurs a strict $25,000 IRS penalty. We ensure full compliance.',
      },
    ],
    relatedServices: ['tax-planning', 'federal-tax-preparation', 'wealth-advisory'],
  },
  {
    id: 'nri-tax-solutions',
    slug: 'nri-tax-solutions',
    title: 'Indian Cross-Border Tax (NRI)',
    tagline: 'Seamless US-India tax reconciliation, DTAA treaty optimization, and repatriation.',
    shortDescription:
      'US-India cross-border tax assistance, Indian income tax returns, DTAA tax credit claims, NRI property transaction guidance and international tax reconciliation.',
    fullDescription:
      'Indian professionals and NRIs living in the United States face complex tax requirements spanning two sovereign tax jurisdictions: the US Internal Revenue Service and the Indian Income Tax Department. PlutoTax bridges this gap with dual-jurisdiction expertise. We harmonize Indian ITR filings, capital gains on Indian mutual funds, ancestral property sales, TDS on NRO accounts, and claim maximum Foreign Tax Credits (Form 1116) under Article 25 of the US-India Double Tax Avoidance Agreement (DTAA).',
    heroImage: '/assets/services/nri-tax.jpg',
    iconName: 'Globe2',
    whoNeedsThis: [
      'Non-Resident Indians (NRIs) in the US with interest income, NRE/NRO accounts, or mutual funds in India',
      'Individuals selling residential, commercial, or agricultural property in India and repatriating funds to the US',
      'Professionals moving between the US and India needing residency transition tax planning',
      'NRIs who experienced heavy 20% or 30% TDS in India and need Indian tax refunds',
    ],
    keyBenefits: [
      'Elimination of double taxation through precise application of US-India DTAA tax credits',
      'Expert calculation of capital gains on Indian real estate sales and indexed cost of acquisition',
      'Filing of Form 15CA / 15CB for smooth, compliant outward fund remittances to US bank accounts',
      'Harmonized filing of both US Form 1040 and Indian ITR-2 / ITR-3',
    ],
    processSteps: [
      { step: '01', title: 'Dual-Country Portfolio Review', description: 'Review Indian bank statements, Form 26AS, AIS/TIS, and US income records.' },
      { step: '02', title: 'Indian ITR Preparation', description: 'Prepare and file Indian Income Tax Return claiming all eligible Section 80C deductions and TDS credits.' },
      { step: '03', title: 'US Foreign Tax Credit (FTC) Calculation', description: 'Apply Indian taxes paid as a dollar-for-dollar offset on your US Form 1040 via Form 1116.' },
      { step: '04', title: 'FBAR & FATCA Disclosure Alignment', description: 'Ensure offshore balances declared on ITR reconcile 100% with FinCEN Form 114.' },
    ],
    requiredDocuments: [
      'Indian Form 26AS, Annual Information Statement (AIS), and Taxpayer Information Summary (TIS)',
      'Bank interest certificates for NRE, NRO, and FCNR accounts',
      'Sale deed, purchase deed, and indexed cost records for any Indian property sold',
      'Indian capital gains statements from CAMS, KFintech, or brokerage accounts',
    ],
    faqs: [
      {
        question: 'Is NRE bank interest taxable in the United States?',
        answer: 'Yes. While NRE interest is tax-exempt in India under Section 10(4), it is considered taxable worldwide income by the US IRS for US tax residents.',
      },
      {
        question: 'How do I claim credit for 31.2% TDS deducted in India?',
        answer: 'We claim Foreign Tax Credit on US Form 1116, offsetting the US tax liability on the same income so you avoid paying tax twice.',
      },
    ],
    relatedServices: ['fbar-fatca', 'federal-tax-preparation', 'wealth-advisory'],
  },
  {
    id: 'tax-extension',
    slug: 'tax-extension',
    title: 'Tax Extension Filing (4868 / 7004)',
    tagline: 'Secure an automatic 6-month extension and shield yourself from IRS late penalties.',
    shortDescription:
      'Individual and business tax extension preparation and filing to help clients manage tax deadlines and applicable filing penalties.',
    fullDescription:
      'Tax deadlines can be stressful when missing critical K-1 statements, 1099-B revisions, foreign account values, or complex business ledgers. Filing an official extension with the IRS grants an automatic six-month extension—moving individual deadlines from April 15 to October 15, and business deadlines from March 15 to September 15. PlutoTax prepares and e-files your extension swiftly while calculating estimated payments to eliminate costly late-filing penalties.',
    heroImage: '/assets/services/tax-extension.jpg',
    iconName: 'Clock',
    whoNeedsThis: [
      'Individuals waiting on delayed Schedule K-1s from private equity, syndicates, or partnerships',
      'Expatriates and NRI taxpayers gathering offshore documentation and bank balance records',
      'Business entities needing extra time to finalize financial statements and bookkeeping',
      'Anyone experiencing unexpected personal or professional disruptions during tax season',
    ],
    keyBenefits: [
      'Automatic, guaranteed 6-month extension with certified IRS electronic confirmation',
      'Complete elimination of the severe 5%-per-month IRS Failure-to-File penalty',
      'Accurate estimated tax payment vouchers (Form 1040-V / EFTPS) to minimize interest',
      'Immediate state extension submissions for states requiring separate state filings',
    ],
    processSteps: [
      { step: '01', title: 'Income & Withholding Estimation', description: 'We run a fast assessment of your expected income and taxes already withheld.' },
      { step: '02', title: 'Estimated Payment Calculation', description: 'Calculate optimal tax deposit if a balance is projected, avoiding underpayment interest.' },
      { step: '03', title: 'Direct IRS E-Filing', description: 'Transmit Form 4868 or Form 7004 electronically with instantaneous IRS acknowledgment.' },
      { step: '04', title: 'Extended Season Strategy', description: 'Establish a smooth timeline to prepare and file your finalized returns before October 15.' },
    ],
    requiredDocuments: [
      'Latest pay stubs or estimates of W-2 and 1099 income received',
      'Summary of federal and state taxes withheld to date',
      'Prior year tax return summary for Safe Harbor calculation',
      'Entity information (EIN, legal name, tax year) for corporate Form 7004 extensions',
    ],
    faqs: [
      {
        question: 'Does filing an extension give me more time to pay my taxes?',
        answer: 'An extension grants 6 additional months to file your forms, but any taxes owed must be paid by April 15 to avoid interest. We calculate safe-harbor payments so you owe zero penalties.',
      },
      {
        question: 'Does filing an extension increase my risk of an audit?',
        answer: 'No. The IRS treats extensions as standard procedure, and studies show that extended returns often have fewer clerical errors.',
      },
    ],
    relatedServices: ['federal-tax-preparation', 'business-tax', 'tax-planning'],
  },
  {
    id: 'audit-assistance',
    slug: 'audit-assistance',
    title: 'Audit Assistance & IRS Representation',
    tagline: 'Certified CPA and EA defense against IRS inquiries, CP2000 notices, and state audits.',
    shortDescription:
      'Professional support for IRS and state tax notices, audit documentation, response preparation and applicable tax resolution processes.',
    fullDescription:
      'Receiving an unexpected notice from the IRS or a State Department of Revenue (such as CP2000, CP504, or an audit inquiry) can be alarming. Many notices contain automated calculation errors or overlook qualifying deductions. PlutoTax provides formal representation led by licensed Certified Public Accountants (CPAs) and Enrolled Agents. We handle all correspondence directly with tax authorities, assemble substantiating documentation, and defend your rights aggressively.',
    heroImage: '/assets/services/audit-assistance.jpg',
    iconName: 'ShieldCheck',
    whoNeedsThis: [
      'Taxpayers who received IRS Notice CP2000 proposing additional taxes and penalties',
      'Individuals facing IRS audit examinations of itemized deductions, business expenses, or foreign credits',
      'Business owners undergoing state sales tax or employee classification audits',
      'Taxpayers with disputed tax debts seeking Installment Agreements or Penalty Abatements',
    ],
    keyBenefits: [
      'Direct representation: We speak with the IRS so you never have to face an auditor alone',
      'Thorough review to identify errors in IRS automated matching algorithms',
      'Preparation of formal written legal responses with supporting substantiation',
      'Penalty abatement requests under IRS First-Time Abate and Reasonable Cause doctrines',
    ],
    processSteps: [
      { step: '01', title: 'Notice Analysis & Transcript Pull', description: 'We inspect your official notice and pull IRS master transcripts to identify the exact discrepancy.' },
      { step: '02', title: 'Power of Attorney (Form 2848)', description: 'You authorize us as your official representative, redirecting all IRS calls to our office.' },
      { step: '03', title: 'Document Substantiation Package', description: 'We compile receipts, brokerage records, and legal briefs refuting incorrect IRS claims.' },
      { step: '04', title: 'Case Resolution & Penalty Relief', description: 'We negotiate settlement, close the inquiry, and file for abatement of failure-to-pay penalties.' },
    ],
    requiredDocuments: [
      'Complete copy of the IRS or State tax notice (all pages including response forms)',
      'Copy of the tax return for the tax year in question (Form 1040, 1120, etc.)',
      'Supporting documentation related to the disputed items (bank statements, receipts, 1099s)',
      'Prior correspondence with the tax agency',
    ],
    faqs: [
      {
        question: 'What is an IRS CP2000 notice?',
        answer: 'A CP2000 is an automated notice sent when the income reported by banks or employers doesn’t match what was filed on your return. Very frequently, the IRS forgets cost basis on stock sales, resulting in wildly exaggerated tax bills. We correct this routinely.',
      },
      {
        question: 'Do I have to appear in person before an IRS agent?',
        answer: 'In almost all cases, no. Under Form 2848 Power of Attorney, our CPA or Enrolled Agent handles all communications and meetings on your behalf.',
      },
    ],
    relatedServices: ['federal-tax-preparation', 'fbar-fatca', 'business-tax'],
  },
  {
    id: 'wealth-advisory',
    slug: 'wealth-advisory',
    title: 'Year-Round Advisory & Wealth Tax',
    tagline: 'Comprehensive equity compensation, real estate, cryptocurrency, and family wealth strategy.',
    shortDescription:
      'Ongoing tax advisory for cryptocurrency, stock sales, RSUs, ESPP, ISOs, rental properties, investments and wealth transfers.',
    fullDescription:
      'Wealth creation brings multi-layered tax obligations. From high-volume cryptocurrency trading and DeFi yields to executive stock vesting, real estate syndications, and intergenerational family wealth transfers, PlutoTax offers year-round advisory that keeps you ahead. We ensure every transaction is structured for maximum capital efficiency, utilizing legal strategies like tax-loss harvesting, QSBS exclusions, Opportunity Zones, and charitable trusts.',
    heroImage: '/assets/services/wealth-advisory.jpg',
    iconName: 'Coins',
    whoNeedsThis: [
      'Tech executives and senior engineers with recurring RSU vests, ESPP purchases, and ISO stock grants',
      'Real estate investors managing multi-unit rentals, short-term rentals (Airbnb), and 1031 exchanges',
      'Cryptocurrency investors trading across centralized exchanges, hardware wallets, and staking pools',
      'Families seeking tax-efficient wealth transfers, trusts, and gifting strategies',
    ],
    keyBenefits: [
      'Elimination of double taxation on RSU Form 1099-B cost basis reporting errors',
      'Accelerated real estate depreciation via Cost Segregation and REPS qualification',
      'Accurate FIFO/LIFO/HIFO crypto tax reconciliation across wallets and DeFi protocols',
      'Year-round access to senior wealth CPAs before executing major liquidity events',
    ],
    processSteps: [
      { step: '01', title: 'Equity & Asset Portfolio Mapping', description: 'Catalog all brokerage, RSU/ISO, real estate, and digital asset holdings.' },
      { step: '02', title: 'Tax-Loss Harvesting & Basis Adjustment', description: 'Correct Form 1099-B basis errors and offset gains with strategic tax losses.' },
      { step: '03', title: 'Real Estate & Tax Shelter Structuring', description: 'Implement real estate professional status (REPS), material participation, or 1031 rules.' },
      { step: '04', title: 'Quarterly Advisory Check-Ins', description: 'Regular strategy sessions before major vesting dates, sales, or fiscal year-ends.' },
    ],
    requiredDocuments: [
      'Brokerage statements showing equity grants (E*TRADE, Morgan Stanley, Schwab, Fidelity)',
      'Form 3921 (for ISO exercises) and Form 3922 (for ESPP share acquisitions)',
      'Real estate settlement statements (HUD-1 / Closing Disclosures) and rental income ledgers',
      'Cryptocurrency transaction history exports or CoinTracker / Koinly API reports',
    ],
    faqs: [
      {
        question: 'Why do brokers often report the wrong cost basis for RSUs on Form 1099-B?',
        answer: 'IRS rules prohibit brokers from including the income already taxed on your W-2 in Box 1e of Form 1099-B. If unadjusted, you get double-taxed on the same compensation! We adjust Box 1e using supplemental reports to prevent this error.',
      },
      {
        question: 'How does cost segregation save money on rental property taxes?',
        answer: 'Cost segregation breaks down a building into 5, 7, and 15-year components (carpeting, appliances, landscaping), allowing massive accelerated depreciation in Year 1 to shelter active or passive income.',
      },
    ],
    relatedServices: ['tax-planning', 'federal-tax-preparation', 'nri-tax-solutions'],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Sandeep Verma',
    role: 'Senior Director of Engineering',
    company: 'Tech Enterprise (Austin, TX)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      'PlutoTax navigated my multi-state RSU vestings and Indian property sale with complete masterfulness. Claiming the US-India DTAA tax credit saved me over $24,000 in double taxation. Their CPA was responsive, proactive, and exceptionally thorough.',
    isApproved: true,
    serviceCategory: 'Indian Cross-Border Tax Filing',
  },
  {
    id: 'rev-2',
    name: 'Rachel Thornton',
    role: 'Founder & Managing Member',
    company: 'Apex Strategy Group LLC',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      'Transitioning our LLC to an S-Corporation through PlutoTax saved our company more than $18,000 in self-employment taxes this year alone. Their monthly bookkeeping and corporate tax preparation are flawless. Truly a first-class financial partner.',
    isApproved: true,
    serviceCategory: 'Business Tax & Bookkeeping',
  },
  {
    id: 'rev-3',
    name: 'Karthik Subramanian',
    role: 'Principal Software Architect',
    company: 'Cloud Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      "Getting my spouse's ITIN without having to mail our physical original passport to the IRS was a lifesaver. As a Certifying Acceptance Agent, PlutoTax verified her documents securely in-office, and the ITIN and joint refund arrived smoothly.",
    isApproved: true,
    serviceCategory: 'ITIN Processing (CAA)',
  },
  {
    id: 'rev-4',
    name: 'Michael Chen',
    role: 'Real Estate Investor & VP',
    company: 'Austin Capital Holdings',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      "Their strategic tax planning around cost segregation for my rental properties and cryptocurrency trading records was incredible. They don't just file your returns—they architect legal strategies that protect your wealth for the long run.",
    isApproved: true,
    serviceCategory: 'Advance Tax Planning',
  },
];

export const PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Register & Upload Documents',
    subtitle: 'Quick, encrypted document submission',
    summary: 'Create your secure PlutoTax portal account and upload your W-2s, 1099s, foreign bank statements, or business balance sheets in minutes.',
    icon: 'UploadCloud',
    estimatedTime: '5 - 10 Minutes',
  },
  {
    stepNumber: '02',
    title: 'CPA Review & Tax Calculation',
    subtitle: 'Thorough analysis & deduction maximization',
    summary: 'Our certified CPAs and tax advisors analyze your tax position, identify every eligible deduction, check treaty benefits, and calculate optimal credits.',
    icon: 'Calculator',
    estimatedTime: '24 - 48 Hours',
  },
  {
    stepNumber: '03',
    title: 'Review & Confirmation',
    subtitle: 'Complete transparency before filing',
    summary: 'We walk you through your draft tax return line-by-line via the portal or an optional one-on-one call, answering every question before you sign.',
    icon: 'FileCheck',
    estimatedTime: 'Client-Paced',
  },
  {
    stepNumber: '04',
    title: 'IRS E-Filing & Status Tracking',
    subtitle: 'Fast electronic submission & real-time tracking',
    summary: 'Your return is transmitted directly to the IRS and state tax departments via authorized IRS e-file channels, with live confirmation tracking.',
    icon: 'Send',
    estimatedTime: 'Instant E-File',
  },
];

export const CORE_VALUES = [
  {
    title: 'Accuracy & Compliance',
    description: 'Every return is triple-checked for statutory adherence to IRS tax code, state legislation, and foreign reporting protocols.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Trust & Transparency',
    description: 'Honest advice, no hidden costs, clear explanations of your numbers, and direct access to licensed professionals.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Dedicated account managers and CPAs who treat your financial goals with high responsiveness and genuine care.',
    icon: 'Smile',
  },
  {
    title: 'Data Security & Confidentiality',
    description: 'Bank-grade 256-bit encryption, strict IRS Section 7216 privacy compliance, and zero third-party disclosure.',
    icon: 'Lock',
  },
  {
    title: 'Professional Excellence',
    description: 'A seasoned roster of Certified Public Accountants (CPAs), Enrolled Agents (EAs), and Certifying Acceptance Agents (CAAs).',
    icon: 'Award',
  },
  {
    title: 'Global Tax Expertise',
    description: 'Unrivaled proficiency in US-India cross-border tax, NRI investments, FBAR/FATCA, and international treaties.',
    icon: 'Globe',
  },
  {
    title: 'Integrity & Accountability',
    description: 'Uncompromising ethical standards ensuring your filings withstand regulatory scrutiny and audits with confidence.',
    icon: 'Scale',
  },
];
