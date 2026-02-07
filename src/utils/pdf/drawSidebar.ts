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

    // Fehér szöveg, elforgatva - egyetlen összefűzött sor
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('Roboto', 'bold');

    const centerX = offsetX + width / 2 + 0.5;
    const midY = offsetY + height / 2;

    const sidebarText = `${datum}  –  ${targyNev}  –  ${azonosito}`;
    doc.text(sidebarText, centerX, midY, { align: 'center', angle: 90 });

    // Színek visszaállítása
    doc.setTextColor(0, 0, 0);
    doc.setFont('Roboto', 'normal');
  });
};
