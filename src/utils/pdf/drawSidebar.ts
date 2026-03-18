import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, cm } from './types';

/**
 * 4. rész: Nyilvántartó függőleges sáv (jobb oldali fekete sáv)
 * Elforgatott fehér szöveggel
 */
export const drawSidebar = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  pageWidth: number
) => {
  const { targyNev, datum, azonosito } = data;
  const itemId = azonosito.toUpperCase();
  const BULLET = '\u2022';

  const barThickness = cm(1);
  const barX = pageWidth - cm(0.6) - barThickness;
  const barY = cm(4); // starts at top separator
  const barLength = cm(17);

  // Draw black bar
  doc.setFillColor(0, 0, 0);
  doc.rect(barX, barY, barThickness, barLength, 'F');

  // White text, rotated 90°
  doc.setTextColor(255);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(12);

  const inset = cm(0.2);
  const textX = barX + barThickness / 2 + cm(0.15);
  const centerY = barY + barLength / 2;

  // Build the line with space-based tab simulation
  const spaceW = doc.getTextWidth(' ');
  const leftPos = barY + inset;
  const centerPos = barY + barLength / 2;
  const rightPos = barY + barLength - inset;

  const leftText = targyNev ? (datum ? `${targyNev} ${BULLET}` : targyNev) : '';
  const midText = datum || '';
  const rightText = itemId ? (datum ? `${BULLET} ${itemId}` : itemId) : '';

  let line = leftText;
  let cursor = leftText ? leftPos + doc.getTextWidth(leftText) : leftPos;

  if (midText) {
    const targetStart = centerPos - doc.getTextWidth(midText) / 2;
    const needed = Math.max(0, targetStart - cursor);
    const spaces = Math.max(1, Math.round(needed / spaceW));
    line += ' '.repeat(spaces) + midText;
    cursor = targetStart + doc.getTextWidth(midText);
  }

  if (rightText) {
    const targetStart = rightPos - doc.getTextWidth(rightText);
    const needed = Math.max(0, targetStart - cursor);
    const spaces = Math.max(1, Math.round(needed / spaceW));
    line += ' '.repeat(spaces) + rightText;
  }

  const textWidth = doc.getTextWidth(line);
  const yCentered = centerY + textWidth / 2;

  doc.text(line, textX, yCentered, undefined, 90);

  // Reset colors
  doc.setTextColor(0);
  doc.setFont('Roboto', 'normal');
};
