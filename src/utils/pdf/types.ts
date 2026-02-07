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
  pageHeight: number;
  marginLeft: number;
  marginRight: number;
  contentWidth: number;
  contentRight: number;
  lineHeight: number;
  // Szaggatott vonalak pozíciói
  topSeparatorY: number;    // 41mm
  bottomSeparatorY: number; // 216mm
  // 1) Címke szekció
  cimkeTop: number;         // 6mm
  cimkeBottom: number;      // 35mm
  // 2) Nyilvántartás szekció
  nyilvTop: number;         // 47mm
  nyilvBottom: number;      // 210mm
  // 3) Elismervény szekció
  elismTop: number;         // 222mm
  elismBottom: number;      // 291mm
}

export interface PdfGroupBox {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export const createLayout = (): PdfLayout => {
  const pageWidth = 210;
  const pageHeight = 297;
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const contentRight = pageWidth - marginRight;

  return {
    pageWidth,
    pageHeight,
    marginLeft,
    marginRight,
    contentWidth,
    contentRight,
    lineHeight: 4,
    // Szaggatott vonalak
    topSeparatorY: 41,
    bottomSeparatorY: 216,
    // 1) Címke
    cimkeTop: 6,
    cimkeBottom: 35,
    // 2) Nyilvántartás
    nyilvTop: 47,
    nyilvBottom: 210,
    // 3) Elismervény
    elismTop: 222,
    elismBottom: 291,
  };
};

/**
 * Virtuális doboz (group box) rajzoló segédfüggvény.
 * Az összes elem pozíciója a doboz bal felső sarkához képest relatív.
 */
export const drawGroup = (
  doc: jsPDF,
  box: PdfGroupBox,
  drawFn: (doc: jsPDF, offsetX: number, offsetY: number, width: number, height: number) => void
) => {
  drawFn(doc, box.startX, box.startY, box.width, box.height);
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
