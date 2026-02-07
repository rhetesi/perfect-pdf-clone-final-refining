import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout } from './types';

/**
 * 5. rész: MÁSODLAT rész (a nyilvántartási lap jobb felső sarkában)
 */
export const drawMasodlat = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
) => {
  const { azonosito, nyomtatasDatum } = data;

  const y = layout.topSeparatorY + 6;

  // MÁSODLAT box
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(10);
  const masodlatText = 'MÁSODLAT!';
  const masodlatWidth = doc.getTextWidth(masodlatText) + 6;
  const masodlatX = layout.mainContentRight - masodlatWidth;
  doc.setFillColor(0, 0, 0);
  doc.rect(masodlatX, y + 6, masodlatWidth, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(masodlatText, masodlatX + 3, y + 9.5);
  doc.setTextColor(0, 0, 0);
  doc.setFont('Roboto', 'normal');

  // Print date
  doc.setFontSize(9);
  doc.text(`Nyomtatva: ${nyomtatasDatum}`, layout.mainContentRight, y + 15, { align: 'right' });
};
