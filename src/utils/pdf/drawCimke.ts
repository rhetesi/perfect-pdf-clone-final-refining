import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout, cm, drawWrappedText } from './types';

/**
 * 1. rész: Nyilvántartó címke QR kóddal
 * A felső elválasztó vonal (4cm) felett
 */
export const drawCimke = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout,
  qrDataUrl: string
) => {
  const { targyNev, targyLeiras, azonosito } = data;

  // Start position
  let y = layout.marginTop + cm(0.2) + 20;
  const firstTitleY = y;

  // Item name - bold, 20pt
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(20);
  y = drawWrappedText(doc, targyNev, layout.marginLeft, y, layout.contentWidth, 24);

  // Details
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(10.5);
  y = drawWrappedText(doc, targyLeiras, layout.marginLeft, y, layout.contentWidth, 14);

  // Place + date
  const placeDate = data.helyszin && data.datum
    ? `${data.helyszin}, ${data.datum}`
    : data.helyszin || data.datum;
  y = drawWrappedText(doc, placeDate, layout.marginLeft, y, layout.contentWidth, 14);

  // Identifier right-aligned
  y += 14;
  doc.text(azonosito.toUpperCase(), layout.rightX, y, { align: 'right' });

  // QR Code (2.5cm square), aligned to right margin, top edge at title top
  const qrSize = cm(2.5);
  const titleLines = doc.splitTextToSize(targyNev || '', layout.contentWidth);
  const titleFirstLine = titleLines[0] || '';
  const titleDims = doc.getTextDimensions(titleFirstLine);
  const titleTop = firstTitleY - titleDims.h;
  const qrX = layout.rightX - qrSize;
  const qrY = titleTop - cm(0.3);

  if (azonosito) {
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
  }
};
