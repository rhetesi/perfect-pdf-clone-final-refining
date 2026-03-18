import { jsPDF } from 'jspdf';

export interface TalaltTargyLapData {
  targyNev: string;        // itemName
  targyLeiras: string;     // details (formatted description)
  helyszin: string;        // foundLocation
  datum: string;           // foundDate
  azonosito: string;       // id
  nyomtatasDatum: string;  // print date
  talaloNev?: string;      // finderName
  talaloLakcim?: string;   // finderContact/address
  companyName?: string;    // company name (default: 'CÉG')
  duplicate?: boolean;     // if true, show MÁSODLAT overlay
}

/** Convert cm to pt */
export const cm = (value: number): number => value * 28.3464567;

export interface PdfLayout {
  pageWidth: number;
  pageHeight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  contentWidth: number;
  rightX: number;
  // Separator lines (in pt)
  topSeparatorY: number;    // 4cm
  bottomSeparatorY: number; // 21cm
  // Signature tab positions (from left edge)
  tab1: number;
  tab2: number;
  tab3: number;
  signLineWidth: number;
}

export const createLayout = (): PdfLayout => {
  const pageWidth = 595.28;  // A4 in pt
  const pageHeight = 841.89;
  const marginTop = cm(0.51);
  const marginBottom = cm(0.51);
  const marginLeft = cm(2.5);
  const marginRight = cm(2.0);
  const contentWidth = pageWidth - marginLeft - marginRight;
  const rightX = pageWidth - marginRight;

  return {
    pageWidth,
    pageHeight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    contentWidth,
    rightX,
    topSeparatorY: cm(4),
    bottomSeparatorY: cm(21),
    // Signature tabs (from left margin)
    tab1: marginLeft + cm(3),
    tab2: marginLeft + cm(8.25),
    tab3: marginLeft + cm(13.5),
    signLineWidth: cm(3.6),
  };
};

/** Draw dashed separator line */
export const drawDashedLine = (doc: jsPDF, layout: PdfLayout, yPos: number) => {
  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.setLineDashPattern([4, 3], 0);
  doc.line(layout.marginLeft, yPos, layout.rightX, yPos);
  doc.setLineDashPattern([], 0);
};

/** Draw solid line */
export const drawSolidLine = (doc: jsPDF, x1: number, yPos: number, x2: number) => {
  doc.setLineDashPattern([], 0);
  doc.setLineWidth(0.3);
  doc.line(x1, yPos, x2, yPos);
};

/** Draw centered line for signatures */
export const drawCenteredLine = (doc: jsPDF, centerX: number, y: number, width: number) => {
  const half = width / 2;
  const lineY = y + 2;
  doc.line(centerX - half, lineY, centerX + half, lineY);
};

/** Draw label with underline extending to rightX */
export const drawLabelWithLine = (doc: jsPDF, label: string, x: number, y: number, rightX: number) => {
  const gap = cm(0.2);
  const labelWidth = label ? doc.getTextWidth(label) : 0;
  const lineStart = labelWidth > 0 ? x + labelWidth + gap : x;
  if (label) {
    doc.text(label, x, y);
  }
  const lineY = y + 2;
  doc.line(lineStart, lineY, rightX, lineY);
};

/** Draw justified paragraph (word-by-word spacing) */
export const drawJustifiedParagraph = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number
): number => {
  const lines = doc.splitTextToSize(text, width);
  let cursorY = y;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isLastLine = i === lines.length - 1;

    if (isLastLine) {
      doc.text(line, x, cursorY);
      cursorY += lineHeight;
      continue;
    }

    const words = line.trim().split(/\s+/);
    if (words.length <= 1) {
      doc.text(line, x, cursorY);
      cursorY += lineHeight;
      continue;
    }

    const lineWidth = doc.getTextWidth(line);
    const extra = Math.max(0, width - lineWidth);
    const gap = extra / (words.length - 1);

    let cursorX = x;
    for (let w = 0; w < words.length; w++) {
      doc.text(words[w], cursorX, cursorY);
      cursorX += doc.getTextWidth(words[w]);
      if (w < words.length - 1) {
        cursorX += doc.getTextWidth(' ') + gap;
      }
    }
    cursorY += lineHeight;
  }

  return cursorY;
};

/** Draw wrapped (non-justified) text, returns new Y */
export const drawWrappedText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number
): number => {
  if (!text) return y;
  const lines = doc.splitTextToSize(text, width);
  let cursorY = y;
  for (const line of lines) {
    doc.text(line, x, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
};

/** Format current date in Hungarian format */
export const formatCurrentDateHu = (): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  return `${now.getFullYear()}. ${pad(now.getMonth() + 1)}. ${pad(now.getDate())}.`;
};

/** Build filename */
export const buildFilename = (itemId: string): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `${stamp}_átvételi elismervény_${itemId}`;
};

/** Helper: get founder line "Név (lakcím)" */
export const getFounderLine = (data: TalaltTargyLapData): string => {
  const name = data.talaloNev || 'Név';
  const addr = data.talaloLakcim || 'lakcím';
  if (name && addr) return `${name} (${addr})`;
  return name || addr;
};

/** Helper: get place+date string */
export const getPlaceDate = (data: TalaltTargyLapData): string => {
  const place = data.helyszin;
  const date = data.datum;
  if (place && date) return `${place}, ${date}`;
  return place || date;
};

/** Helper: get company name with fallback */
export const getCompanyName = (data: TalaltTargyLapData): string => {
  return data.companyName || 'CÉG';
};
