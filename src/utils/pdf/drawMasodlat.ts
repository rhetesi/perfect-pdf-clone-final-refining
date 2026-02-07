import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfGroupBox, drawGroup } from './types';

/**
 * 5. rész: MÁSODLAT rész (bekeretezett szövegmező)
 * Virtuális dobozban elhelyezve, így a pozíciója egyszerűen módosítható.
 * Alapértelmezett pozíció: a nyilvántartási lap jobb felső sarka.
 */
export const createMasodlatBox = (): PdfGroupBox => ({
  startX: 140,
  startY: 47,
  width: 50,
  height: 22,
});

export const drawMasodlat = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  box: PdfGroupBox
) => {
  const { azonosito, nyomtatasDatum } = data;

  drawGroup(doc, box, (doc, offsetX, offsetY, width, height) => {
    // Keret rajzolása a teljes doboz körül
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([1, 1], 0);
    doc.rect(offsetX, offsetY, width, height);
    doc.setLineDashPattern([], 0);
    doc.setDrawColor(0, 0, 0);

    // MÁSODLAT! felirat (inverz: fekete háttér, fehér szöveg)
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(10);
    const masodlatText = 'MÁSODLAT!';
    const masodlatTextWidth = doc.getTextWidth(masodlatText) + 6;
    const masodlatX = offsetX + width - masodlatTextWidth - 2;
    const masodlatY = offsetY + 4;
    doc.setFillColor(0, 0, 0);
    doc.rect(masodlatX, masodlatY, masodlatTextWidth, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(masodlatText, masodlatX + 3, masodlatY + 3.5);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Roboto', 'normal');

    // Nyomtatás dátuma
    doc.setFontSize(9);
    doc.text(`Nyomtatva: ${nyomtatasDatum}`, offsetX + width - 2, offsetY + 14, { align: 'right' });

    // Azonosító
    doc.setFontSize(9);
    doc.text(azonosito, offsetX + width - 2, offsetY + 19, { align: 'right' });
  });
};
