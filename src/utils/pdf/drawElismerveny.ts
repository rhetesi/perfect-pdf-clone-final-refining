import { jsPDF } from 'jspdf';
import {
  TalaltTargyLapData,
  PdfLayout,
  cm,
  drawWrappedText,
  drawJustifiedParagraph,
  drawCenteredLine,
  getFounderLine,
  getCompanyName,
} from './types';

/**
 * 3. rész: Átvételi elismervény (alsó rész)
 * Az alsó elválasztó vonal (21cm) alatt
 */
export const drawElismerveny = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
) => {
  const { targyNev, targyLeiras, datum } = data;
  const companyName = getCompanyName(data);
  const founderLine = getFounderLine(data);

  // Start below bottom separator + offset
  let y = layout.bottomSeparatorY + cm(0.8) + 6;

  // Title
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(20);
  doc.text('Átvételi elismervény', layout.marginLeft, y);
  y += 20;

  // Item info
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(10.5);
  y = drawWrappedText(doc, targyNev, layout.marginLeft, y, layout.contentWidth, 14);
  y = drawWrappedText(doc, targyLeiras, layout.marginLeft, y, layout.contentWidth, 14);

  y += 20;

  // Founder line
  doc.setFont('Roboto', 'bold');
  y = drawWrappedText(doc, founderLine, layout.marginLeft, y, layout.contentWidth, 14);

  // Receipt paragraph (justified)
  doc.setFont('Roboto', 'normal');
  const para3 = `A ${companyName} (továbbiakban: Vállalkozás) képviseletében elismerem, hogy a fent megnevezett tárgyat, megnevezett találótól átvettem. Egyben tájékoztattam a találót, hogy ezen átvételi elismervény NEM jogosít a talált tárgy találó részére történő kiadására.`;
  y = drawJustifiedParagraph(doc, para3, layout.marginLeft, y, layout.contentWidth, 14) + 8;

  // Signature row
  y += 22;
  doc.text(datum, layout.tab1, y, { align: 'center' });
  drawCenteredLine(doc, layout.tab3, y, layout.signLineWidth);

  y += 16;
  doc.text('ph', layout.tab2, y, { align: 'center' });
  doc.text('Vállalkozás képviselője', layout.tab3, y, { align: 'center' });
};
