import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout } from './types';

/**
 * 1. rész: Nyilvántartó címke QR kóddal
 * Függőleges pozíció: 6mm - 35mm (29mm magas terület)
 */
export const drawCimke = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout,
  qrDataUrl: string
) => {
  const { targyNev, targyLeiras, helyszin, datum, azonosito } = data;
  const fullDatum = `${helyszin}, ${datum}`;

  const y = layout.cimkeTop; // 6mm

  doc.setFontSize(18);
  doc.setFont('Roboto', 'bolditalic');
  doc.text(targyNev, layout.marginLeft, y + 6);

  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text(targyLeiras, layout.marginLeft, y + 11);
  doc.text(fullDatum, layout.marginLeft, y + 15);

  // QR Code
  const qrSize = 20;
  const qrX = layout.contentRight - qrSize;
  const qrY = y;
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  // Identifier right-aligned under QR
  doc.setFontSize(10);
  doc.text(azonosito, layout.contentRight, y + 24, { align: 'right' });
};
