import { jsPDF } from 'jspdf';
import {
  TalaltTargyLapData,
  PdfLayout,
  cm,
  drawWrappedText,
  drawJustifiedParagraph,
  drawLabelWithLine,
  drawCenteredLine,
  getFounderLine,
  getCompanyName,
} from './types';

/**
 * 2. rész: Nyilvántartási lap (középső fő rész)
 * A felső elválasztó vonal (4cm) és alsó elválasztó vonal (21cm) között
 * Returns the masodlatAnchorY for positioning the MÁSODLAT overlay
 */
export const drawNyilvantartoLap = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
): number => {
  const { targyNev, targyLeiras, azonosito, datum } = data;
  const itemId = azonosito.toUpperCase();
  const companyName = getCompanyName(data);
  const founderLine = getFounderLine(data);
  const placeDate = data.helyszin && data.datum
    ? `${data.helyszin}, ${data.datum}`
    : data.helyszin || data.datum;

  // Start below top separator + offset
  let y = layout.topSeparatorY + cm(0.7) + 6;

  // Header - item name
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(20);
  const secondTitleY = y;
  const secondTitleEndY = drawWrappedText(doc, targyNev, layout.marginLeft, y, layout.contentWidth, 24);

  // ID right-aligned at title level
  doc.setFont('Roboto', 'normal');
  doc.setFontSize(10.5);
  doc.text(itemId, layout.rightX, secondTitleY, { align: 'right' });

  // MÁSODLAT anchor position
  const masodlatAnchorY = secondTitleY + 12;

  y = secondTitleEndY;

  // Details and place+date
  y = drawWrappedText(doc, targyLeiras, layout.marginLeft, y, layout.contentWidth, 14);
  y = drawWrappedText(doc, placeDate, layout.marginLeft, y, layout.contentWidth, 14);

  y += 20;

  // Form fields
  drawLabelWithLine(doc, 'Átvevő neve:', layout.marginLeft, y, layout.rightX);
  y += 18;
  drawLabelWithLine(doc, 'Átvevő lakcíme:', layout.marginLeft, y, layout.rightX);
  y += 18;
  drawLabelWithLine(doc, '', layout.marginLeft, y, layout.rightX);
  y += 18;
  drawLabelWithLine(doc, 'Személyazonosító okmány típusa és azonosítója:', layout.marginLeft, y, layout.rightX);
  y += 22;

  // Declaration paragraph (justified)
  const para1 = `Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a ${companyName} (továbbiakban: Vállalkozás) képviselője, a megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a Vállalkozás felé, egyidejűleg elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi változásaiért a Vállalkozás nem tartozik felelősséggel. Meggyőződtem arról, hogy a Vállalkozás a tárgyat annak megtalálásától az elvárható gondossággal őrizte meg.`;

  doc.setFontSize(10.5);
  doc.setFont('Roboto', 'normal');
  y = drawJustifiedParagraph(doc, para1, layout.marginLeft, y, layout.contentWidth, 14) + 6;

  // First signature row (2 empty lines before)
  y += 22;
  drawCenteredLine(doc, layout.tab1, y, layout.signLineWidth);
  drawCenteredLine(doc, layout.tab2, y, layout.signLineWidth);
  drawCenteredLine(doc, layout.tab3, y, layout.signLineWidth);

  y += 16;
  doc.setFontSize(10.5);
  doc.text('dátum', layout.tab1, y, { align: 'center' });
  doc.text('átadó', layout.tab2, y, { align: 'center' });
  doc.text('átvevő', layout.tab3, y, { align: 'center' });

  y += 20;

  // Half-line gap before finder name
  y += 6;

  // Finder declaration
  doc.setFont('Roboto', 'bold');
  doc.setFontSize(10.5);
  y = drawWrappedText(doc, founderLine, layout.marginLeft, y, layout.contentWidth, 14);

  doc.setFont('Roboto', 'normal');
  const para2 = 'mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy kiadására.';
  y = drawJustifiedParagraph(doc, para2, layout.marginLeft, y, layout.contentWidth, 14) + 8;

  // Second signature row
  y += 22;
  doc.text(datum, layout.tab1, y, { align: 'center' });
  drawCenteredLine(doc, layout.tab2, y, layout.signLineWidth);
  drawCenteredLine(doc, layout.tab3, y, layout.signLineWidth);

  y += 16;
  doc.text('Találó', layout.tab2, y, { align: 'center' });
  doc.text('Vállalkozás képviselője', layout.tab3, y, { align: 'center' });

  return masodlatAnchorY;
};
