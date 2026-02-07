import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout } from './types';

/**
 * 4. rész: Nyilvántartó függőleges sáv (jobb oldali fekete sáv a 2. szeleten)
 */
export const drawSidebar = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
) => {
  const { targyNev, datum, azonosito } = data;

  const sectionStart = layout.topSeparatorY;
  const sectionEnd = layout.bottomSeparatorY;

  // Draw black sidebar rectangle
  const sidebarX = layout.contentRight;
  doc.setFillColor(0, 0, 0);
  doc.rect(sidebarX, sectionStart, layout.sidebarWidth, sectionEnd - sectionStart, 'F');

  // Sidebar text (rotated, white)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('Roboto', 'bold');

  const sidebarCenterX = sidebarX + layout.sidebarWidth / 2;
  const sidebarMidY = (sectionStart + sectionEnd) / 2;

  // Top bullet and identifier
  doc.text('•', sidebarCenterX, sectionStart + 6, { align: 'center', angle: 90 });
  doc.text(azonosito, sidebarCenterX, sectionStart + 10, { align: 'center', angle: 90 });

  // Middle - item name
  doc.setFontSize(12);
  doc.text(targyNev, sidebarCenterX, sidebarMidY, { align: 'center', angle: 90 });

  // Bottom - date and bullet
  doc.setFontSize(9);
  doc.text(datum, sidebarCenterX, sectionEnd - 10, { align: 'center', angle: 90 });
  doc.text('•', sidebarCenterX, sectionEnd - 6, { align: 'center', angle: 90 });

  // Reset colors
  doc.setTextColor(0, 0, 0);
  doc.setFont('Roboto', 'normal');
};
