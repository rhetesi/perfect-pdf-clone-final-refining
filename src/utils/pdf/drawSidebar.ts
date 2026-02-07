import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfGroupBox, drawGroup } from './types';

/**
 * 4. rész: Nyilvántartó függőleges sáv (jobb oldali fekete sáv)
 * Virtuális dobozban elhelyezve: startX=194, startY=47, width=10, height=163
 * A doboz pozíciójának módosításával az egész elem együtt mozgatható.
 */
export const createSidebarBox = (): PdfGroupBox => ({
  startX: 194,
  startY: 47,
  width: 10,
  height: 163,
});

export const drawSidebar = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  box: PdfGroupBox
) => {
  const { targyNev, datum, azonosito } = data;

  drawGroup(doc, box, (doc, offsetX, offsetY, width, height) => {
    // Fekete háttér téglalap
    doc.setFillColor(0, 0, 0);
    doc.rect(offsetX, offsetY, width, height, 'F');

    // Fehér szöveg, elforgatva
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('Roboto', 'bold');

    const centerX = offsetX + width / 2;
    const midY = offsetY + height / 2;

    // Felső pont és azonosító
    doc.text('•', centerX, offsetY + 6, { align: 'center', angle: 90 });
    doc.text(azonosito, centerX, offsetY + 10, { align: 'center', angle: 90 });

    // Középen - tárgy neve
    doc.setFontSize(12);
    doc.text(targyNev, centerX, midY, { align: 'center', angle: 90 });

    // Alul - dátum és pont
    doc.setFontSize(9);
    doc.text(datum, centerX, offsetY + height - 10, { align: 'center', angle: 90 });
    doc.text('•', centerX, offsetY + height - 6, { align: 'center', angle: 90 });

    // Színek visszaállítása
    doc.setTextColor(0, 0, 0);
    doc.setFont('Roboto', 'normal');
  });
};
