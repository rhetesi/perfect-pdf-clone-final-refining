import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout, drawSolidLine } from './types';

/**
 * 2. rész: Nyilvántartási lap (középső fő rész)
 */
export const drawNyilvantartoLap = (
  doc: jsPDF,
  data: TalaltTargyLapData,
  layout: PdfLayout
) => {
  const {
    targyNev,
    targyLeiras,
    helyszin,
    datum,
    azonosito,
    talaloNev = 'Név',
    talaloLakcim = 'lakcím',
  } = data;
  const fullDatum = `${helyszin}, ${datum}`;

  // Signature positions (from page left edge)
  const sig1Center = 50;
  const sig2Center = 107.5;
  const sig3Center = 160;
  const sigWidth = 35;

  let y = layout.topSeparatorY + 6;

  // Header
  doc.setFontSize(18);
  doc.setFont('Roboto', 'bolditalic');
  doc.text(targyNev, layout.marginLeft, y + 6);

  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text(targyLeiras, layout.marginLeft, y + 11);
  doc.text(fullDatum, layout.marginLeft, y + 15);

  // Right side - identifier
  doc.setFontSize(10);
  doc.text(azonosito, layout.mainContentRight, y + 4, { align: 'right' });

  y += 22;

  // Form fields
  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text('Átvevő neve:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 25, y, layout.mainContentRight);

  y += 6;
  doc.text('Átvevő lakcíme:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 30, y, layout.mainContentRight);

  y += 5;
  drawSolidLine(doc, layout.marginLeft, y, layout.mainContentRight);

  y += 6;
  doc.text('Személyazonosító okmány típusa és azonosítója:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 85, y, layout.mainContentRight);

  y += 8;

  // Declaration text
  const declarationText = "Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a 'CÉG' képviselője, a megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a 'CÉG' felé, egyidejűleg elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi változásaiért a 'CÉG' nem tartozik felelősséggel. Meggyőződtem arról, hogy a 'CÉG' a tárgyat annak megtalálásától az elvárható gondossággal őrizte meg.";

  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  const splitDeclaration = doc.splitTextToSize(declarationText, layout.mainContentRight - layout.marginLeft);
  doc.text(splitDeclaration, layout.marginLeft, y);
  y += splitDeclaration.length * layout.lineHeight + 6;

  // First signature row
  drawSolidLine(doc, sig1Center - sigWidth / 2, y, sig1Center + sigWidth / 2);
  doc.setFontSize(9);
  doc.text('dátum', sig1Center, y + 4, { align: 'center' });

  drawSolidLine(doc, sig2Center - sigWidth / 2, y, sig2Center + sigWidth / 2);
  doc.text('átadó', sig2Center, y + 4, { align: 'center' });

  drawSolidLine(doc, sig3Center - sigWidth / 2, y, sig3Center + sigWidth / 2);
  doc.text('átvevő', sig3Center, y + 4, { align: 'center' });

  y += 12;

  // Finder declaration (bold name + address)
  doc.setFontSize(10);
  doc.setFont('Roboto', 'bold');
  doc.text(`${talaloNev} (${talaloLakcim})`, layout.marginLeft, y);
  doc.setFont('Roboto', 'normal');

  y += 5;
  const finderDeclaration = "mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy kiadására.";

  const splitFinderDecl = doc.splitTextToSize(finderDeclaration, layout.mainContentRight - layout.marginLeft);
  doc.text(splitFinderDecl, layout.marginLeft, y);
  y += splitFinderDecl.length * layout.lineHeight + 6;

  // Second signature row
  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text(datum, sig1Center, y, { align: 'center' });

  drawSolidLine(doc, sig2Center - sigWidth / 2, y, sig2Center + sigWidth / 2);
  doc.setFontSize(9);
  doc.text('átadó', sig2Center, y + 4, { align: 'center' });
  doc.text(talaloNev, sig2Center, y + 8, { align: 'center' });

  drawSolidLine(doc, sig3Center - sigWidth / 2, y, sig3Center + sigWidth / 2);
  doc.text('cég képviselője', sig3Center, y + 4, { align: 'center' });
  doc.text('Név', sig3Center, y + 8, { align: 'center' });
};
