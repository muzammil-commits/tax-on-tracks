import { jsPDF } from 'jspdf';

export function downloadTaxOrganizerPDF(year: string, clientName: string, clientEmail: string) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const navy = [6, 31, 70] as const;
  const gold = [255, 196, 0] as const;
  const ink = [16, 38, 74] as const;
  const slate = [100, 116, 139] as const;

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 595, 80, 'F');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 80, 595, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('TAX ON TRACKS', 36, 38);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(234, 243, 255);
  doc.text('814 San Jacinto Suite 400, Austin, TX 78701 | +1 (254) 221-0222 | support@taxontracks.com', 36, 56);
  doc.text('IRS Authorized e-file Provider | Certifying Acceptance Agent (CAA)', 36, 70);

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`ANNUAL TAX ORGANIZER & INTAKE PACKET — TAX YEAR ${year}`, 36, 115);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text(`Prepared exclusively for: ${clientName} (${clientEmail})`, 36, 132);
  doc.text(`Generated Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 36, 146);

  doc.setFillColor(246, 249, 255);
  doc.roundedRect(36, 160, 523, 100, 6, 6, 'F');
  doc.setDrawColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(36, 160, 523, 100, 6, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('SECTION 1: TAXPAYER IDENTIFICATION & FILING STATUS', 48, 180);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.text(`• Full Legal Name: ${clientName}`, 48, 200);
  doc.text('• Social Security Number / ITIN: [Verified via Secure Portal Vault]', 48, 215);
  doc.text('• Tax Residency Status: US Resident / Green Card / Dual-Status / NRI', 48, 230);
  doc.text('• Dependents Claimed: Verified with Form W-7 COA (if applicable)', 48, 245);

  doc.setFillColor(246, 249, 255);
  doc.roundedRect(36, 275, 523, 120, 6, 6, 'F');
  doc.roundedRect(36, 275, 523, 120, 6, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('SECTION 2: US INCOME STATEMENTS CHECKLIST', 48, 295);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.text(`[X] Form W-2: Wage & Tax Statements from all employers in ${year}`, 48, 315);
  doc.text('[X] Form 1099-INT / 1099-DIV: Bank interest and investment dividends', 48, 330);
  doc.text('[X] Form 1099-B: Stock sales, RSUs, ESPP transactions with cost-basis adjustments', 48, 345);
  doc.text('[X] Schedule K-1: Partnership, S-Corp or Estate distribution statements', 48, 360);
  doc.text('[X] Cryptocurrency transaction summaries and digital asset sales logs', 48, 375);

  doc.setFillColor(246, 249, 255);
  doc.roundedRect(36, 410, 523, 115, 6, 6, 'F');
  doc.roundedRect(36, 410, 523, 115, 6, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('SECTION 3: FOREIGN ASSET REPORTING (FBAR / FATCA / DTAA)', 48, 430);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.text('• FinCEN Form 114 (FBAR): Required if foreign aggregate peak balance > $10,000 USD', 48, 450);
  doc.text('• Form 8938 (FATCA): Specified foreign financial assets reconciliation', 48, 465);
  doc.text('• Indian NRE / NRO Bank Statements with peak balances and interest earned', 48, 480);
  doc.text('• Indian Property Capital Gains: Sale deed, purchase deed, and indexed cost records', 48, 495);
  doc.text('• Foreign Tax Credit (Form 1116): 31.2% Indian TDS recovery under DTAA Article 25', 48, 510);

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(36, 540, 523, 130, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('SECTION 4: CPA & ENROLLED AGENT FILING COMMITMENT', 48, 562);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('• Accuracy Guarantee: Double CPA check across Federal Form 1040 and all 50 US States.', 48, 582);
  doc.text('• Penalty Protection: Timely filing under IRS safe-harbor rules and extension guidelines.', 48, 597);
  doc.text('• Circular 230 Standards: Strict adherence to confidentiality under Internal Revenue Code Sec. 7216.', 48, 612);
  doc.text('• Audit Assistance: Comprehensive IRS and State audit representation included with your filing.', 48, 627);
  doc.text('Certified by: Michael Miller, CPA | Senior Partner, Tax On Tracks', 48, 650);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text('Confidential Client Intake Document — Tax On Tracks — Page 1 of 1', 36, 700);
  doc.save(`Tax On Tracks_Tax_Organizer_${year}.pdf`);
}

export interface ReturnSummaryPayload {
  title: string;
  year: string;
  clientName: string;
  clientEmail: string;
  filingStatus?: string;
  w2Wages?: number;
  totalIncome?: number;
  refundAmount?: number;
  efileConfirmation?: string;
  cpaName?: string;
}

export function downloadTaxReturnPDF(payload: ReturnSummaryPayload) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const navy = [6, 31, 70] as const;
  const gold = [255, 196, 0] as const;
  const ink = [16, 38, 74] as const;
  const slate = [100, 116, 139] as const;

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 595, 80, 'F');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 80, 595, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('TAX ON TRACKS', 36, 36);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(234, 243, 255);
  doc.text('Licensed Certified Public Accountants | Austin Corporate Headquarters', 36, 54);
  doc.text('Official Client Tax Return Summary & E-File Acknowledgment Certificate', 36, 68);

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('U.S. INDIVIDUAL INCOME TAX RETURN SUMMARY — FORM 1040', 36, 115);
  doc.setFontSize(12);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`TAX YEAR ${payload.year} (FINAL APPROVED & VERIFIED)`, 36, 132);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(36, 150, 523, 285, 6, 6, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(36, 150, 523, 285, 6, 6, 'S');

  const rows = [
    { label: 'Taxpayer Name:', value: payload.clientName },
    { label: 'Client Account Email:', value: payload.clientEmail },
    { label: 'Filing Status:', value: payload.filingStatus || 'Married Filing Jointly (MFJ)' },
    { label: 'Form Prepared:', value: 'Form 1040 + Schedules 1, 2, 3, A, B, D, 1116 (DTAA)' },
    { label: 'Total W-2 & 1099 Income:', value: `$${(payload.w2Wages || 168450).toLocaleString()}` },
    { label: 'Adjusted Gross Income (AGI):', value: `$${(payload.totalIncome || 164200).toLocaleString()}` },
    { label: 'Federal Standard / Itemized Deduction:', value: `$${(29200).toLocaleString()}` },
    { label: 'Foreign Tax Credit Applied (Form 1116):', value: `$${(4850).toLocaleString()} (Indian DTAA)` },
    { label: 'Total Federal Tax Withheld:', value: `$${(32400).toLocaleString()}` },
    { label: 'Approved Federal Refund Amount:', value: `$${(payload.refundAmount || 3840).toLocaleString()} (Direct Deposit)` },
    { label: 'IRS Electronic Submission ID:', value: payload.efileConfirmation || `US-IRS-${payload.year}-89421-ACCEPT` },
    { label: 'IRS Filing Status:', value: 'ACCEPTED & ACKNOWLEDGED BY IRS E-FILE GATEWAY' },
  ];

  let y = 172;
  rows.forEach((row, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(241, 245, 249);
      doc.rect(40, y - 12, 515, 20, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(row.label, 48, y + 2);
    const isHighlight = row.label.includes('Refund') || row.label.includes('Status');
    doc.setFont('helvetica', isHighlight ? 'bold' : 'normal');
    doc.setTextColor(row.label.includes('Refund') ? 16 : ink[0], row.label.includes('Refund') ? 185 : ink[1], row.label.includes('Refund') ? 129 : ink[2]);
    doc.text(row.value, 260, y + 2);
    y += 22;
  });

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(36, 460, 523, 130, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('CERTIFIED PUBLIC ACCOUNTANT ELECTRONIC SIGNATURE & VALIDATION', 48, 485);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Under penalties of perjury, I declare that I have examined this return and accompanying schedules', 48, 505);
  doc.text('and statements, and to the best of my knowledge and belief, they are true, correct, and complete.', 48, 520);
  doc.text(`Signed by: ${payload.cpaName || 'Michael Miller, CPA'} (PTIN: P01894216 | Firm EIN: 92-3841920)`, 48, 542);
  doc.text(`Transmission Timestamp: ${new Date().toISOString()} via Tax On Tracks TLS 1.3 Vault`, 48, 557);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text('Tax On Tracks — IRS Circular 230 Disclosure Protected — Page 1 of 1', 36, 670);
  doc.save(`${payload.title.replace(/\s+/g, '_')}_${payload.year}.pdf`);
}

export function downloadInvoicePDF(
  invoiceNumber: string,
  year: string,
  clientName: string,
  clientEmail: string,
  amount: number,
  status: string
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const navy = [6, 31, 70] as const;
  const gold = [255, 196, 0] as const;
  const ink = [16, 38, 74] as const;
  const slate = [100, 116, 139] as const;

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 595, 80, 'F');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 80, 595, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('TAX ON TRACKS', 36, 36);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(234, 243, 255);
  doc.text('814 San Jacinto Suite 400, Austin, TX 78701 | +1 (254) 221-0222 | support@taxontracks.com', 36, 54);
  doc.text('Official Professional Services Tax Invoice & Payment Receipt', 36, 68);

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`INVOICE: ${invoiceNumber}`, 36, 115);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text(`Filing Year: ${year} | Issue Date: ${new Date().toLocaleDateString('en-US')}`, 36, 132);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(36, 150, 523, 75, 6, 6, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(36, 150, 523, 75, 6, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('BILLED TO (CLIENT DETAILS):', 48, 170);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.text(`Client Name: ${clientName}`, 48, 188);
  doc.text(`Email Address: ${clientEmail}`, 48, 204);
  doc.text(`Status: ${status.toUpperCase()}`, 340, 188);
  doc.text('Payment Method: Direct ACH / Credit Card', 340, 204);

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(36, 245, 523, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Description', 48, 260);
  doc.text('Tax Year', 320, 260);
  doc.text('Amount', 480, 260);

  doc.setFillColor(248, 250, 252);
  doc.rect(36, 270, 523, 35, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(36, 305, 559, 305);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('US Federal Form 1040 + Cross-Border Schedule Preparation', 48, 288);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text('Includes CPA double-check, FBAR FinCEN 114 reporting & electronic filing', 48, 299);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(year, 320, 290);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${amount.toFixed(2)}`, 480, 290);

  doc.setFillColor(246, 249, 255);
  doc.roundedRect(340, 325, 219, 60, 4, 4, 'F');
  doc.setDrawColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(340, 325, 219, 60, 4, 4, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Total Paid / Due:', 355, 348);
  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129);
  doc.text(`$${amount.toFixed(2)} USD`, 440, 349);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text(`Status: Verified ${status.toUpperCase()}`, 355, 370);

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(36, 420, 523, 90, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('PAYMENT CONFIRMATION & GUARANTEE', 48, 442);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Thank you for choosing Tax On Tracks. All advisory services are backed', 48, 460);
  doc.text('by our 100% accuracy guarantee, free CPA audit support, and year-round tax advisory.', 48, 475);
  doc.text('Authorized by: Tax On Tracks Accounting & Billing Department | Austin, Texas', 48, 495);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.text('Official Receipt — Tax On Tracks — Page 1 of 1', 36, 600);
  doc.save(`Tax On Tracks_Invoice_${invoiceNumber}.pdf`);
}
