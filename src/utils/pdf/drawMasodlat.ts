import { jsPDF } from 'jspdf';
import { cm, formatCurrentDateHu } from './types';

/**
 * 5. rész: MÁSODLAT blokk (feltételes overlay)
 * Csak akkor jelenik meg, ha data.duplicate === true
 */
export const drawMasodlat = (
  doc: jsPDF,
  rightX: number,
  anchorY: number
) => {
  const label = 'MÁSODLAT!';
  const printedText = `Nyomtatva: ${formatCurrentDateHu()}`;

  doc.setFont('Roboto', 'bold');
  doc.setFontSize(11);
  const labelW = doc.getTextWidth(label);
  const labelDims = doc.getTextDimensions(label);
  const spaceW = doc.getTextWidth(' ');

  const labelY = anchorY + cm(0.1);
  const printedY = anchorY + 12 + cm(0.1);

  // Inverse label (black bg, white text)
  doc.setFillColor(0, 0, 0);
  doc.setTextColor(255);
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(11);

  const rectW = labelW + spaceW * 2;
  const rectX = rightX - rectW;
  const rectY = labelY - labelDims.h + 2 - cm(0.1);
  doc.rect(rectX, rectY, rectW, labelDims.h + 4, 'F');

  const labelTextX = rectX + rectW - spaceW;
  doc.text(label, labelTextX, labelY, { align: 'right' });

  // Print date
  doc.setTextColor(0);
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(8);
  doc.text(printedText, rightX, printedY, { align: 'right' });
};
