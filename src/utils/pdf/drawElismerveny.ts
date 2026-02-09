import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout, drawSolidLine } from './types';

/**
 * 3. rész: Átvételi elismervény (alsó rész)
 * Függőleges pozíció: 222mm - 291mm (69mm magas terület)
 */
export const drawElismerveny = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
) => {
  const {
    targyNev,
    targyLeiras,
    datum,
    talaloNev = 'Név',
    talaloLakcim = 'lakcím',
  } = data;

  let y = layout.elismTop; // 222mm

  doc.setFontSize(18);
  doc.setFont('Roboto', 'bolditalic');
  doc.text('Átvételi elismervény', layout.marginLeft, y + 5);

  y += 12;

  doc.setFontSize(10);
  doc.setFont('Roboto', 'bold');
  doc.text(targyNev, layout.marginLeft, y);
  doc.setFont('Roboto', 'normal');
  doc.text(targyLeiras, layout.marginLeft, y + 4);

  y += 15;

  doc.setFont('Roboto', 'bold');
  doc.text(`${talaloNev} (${talaloLakcim})`, layout.marginLeft, y);
  doc.setFont('Roboto', 'normal');

  y += 5;

  const receiptText = 'A „cég" képviseletében elismerem, hogy a fent megnevezett tárgyat, megnevezett találótól átvettük. Egyben tájékoztattam a találót, hogy ezen átvételi elismervény NEM jogosít a talált tárgy találó részére történő kiadására.';
  const splitReceipt = doc.splitTextToSize(receiptText, layout.contentWidth);
  doc.text(splitReceipt, layout.marginLeft, y);

  y += splitReceipt.length * layout.lineHeight + 6;

  // Alsó aláírás sor
  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text(datum, layout.marginLeft, y);

  // ph és aláírás jobb oldalon
  doc.text('ph', layout.contentRight - 50, y);
  drawSolidLine(doc, layout.contentRight - 40, y, layout.contentRight);
  doc.setFontSize(9);
  doc.text('Név', layout.contentRight - 20, y + 4, { align: 'center' });
};
