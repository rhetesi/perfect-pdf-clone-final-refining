import { jsPDF } from 'jspdf';

export interface TalaltTargyLapData {
  targyNev: string;
  targyLeiras: string;
  helyszin: string;
  datum: string;
  azonosito: string;
  nyomtatasDatum: string;
  talaloNev?: string;
  talaloLakcim?: string;
}

export interface PdfLayout {
  pageWidth: number;
  marginLeft: number;
  marginRight: number;
  contentWidth: number;
  contentRight: number;
  sidebarWidth: number;
  mainContentRight: number;
  lineHeight: number;
  topSeparatorY: number;   // 41mm
  bottomSeparatorY: number; // 216mm
}

export const createLayout = (): PdfLayout => {
  const pageWidth = 210;
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const contentRight = pageWidth - marginRight;
  const sidebarWidth = 10;
  const mainContentRight = contentRight - sidebarWidth - 2;

  return {
    pageWidth,
    marginLeft,
    marginRight,
    contentWidth,
    contentRight,
    sidebarWidth,
    mainContentRight,
    lineHeight: 4,
    topSeparatorY: 41,
    bottomSeparatorY: 216,
  };
};

// Helper: draw dashed line
export const drawDashedLine = (doc: jsPDF, layout: PdfLayout, yPos: number) => {
  doc.setLineDashPattern([2, 2], 0);
  doc.setLineWidth(0.3);
  doc.line(layout.marginLeft, yPos, layout.contentRight, yPos);
  doc.setLineDashPattern([], 0);
};

// Helper: draw solid line
export const drawSolidLine = (doc: jsPDF, x1: number, yPos: number, x2: number) => {
  doc.setLineDashPattern([], 0);
  doc.setLineWidth(0.3);
  doc.line(x1, yPos, x2, yPos);
};
