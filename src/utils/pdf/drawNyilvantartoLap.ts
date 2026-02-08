import { jsPDF } from 'jspdf';
import { TalaltTargyLapData, PdfLayout, drawSolidLine } from './types';

/**
 * 2. rész: Nyilvántartási lap (középső fő rész)
 * Függőleges pozíció: 47mm - 210mm (163mm magas terület)
 * Vízszintes: marginLeft - mainContentRight (a sidebar előtti terület)
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

  // A sidebar 194mm-nél kezdődik, tehát a fő tartalom jobb széle ~192mm
  const mainContentRight = 192;

  // Aláírás pozíciók (oldalszéltől mérve)
  const sig1Center = 50;
  const sig2Center = 107.5;
  const sig3Center = 160;
  const sigWidth = 35;

  let y = layout.nyilvTop; // 47mm

  // Header
  doc.setFontSize(18);
  doc.setFont('Roboto', 'bolditalic');
  doc.text(targyNev, layout.marginLeft, y + 6);

  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text(targyLeiras, layout.marginLeft, y + 11);
  doc.text(fullDatum, layout.marginLeft, y + 15);

  // Jobb oldal - azonosító
  doc.setFontSize(10);
  doc.text(azonosito, mainContentRight, y + 4, { align: 'right' });

  y += 22;

  // Üres sorok beszúrása, hogy a "cég képviselője" aláírási sor
  // 6 mm-rel az alsó szaggatott vonal (216mm) felett legyen → y=210mm
  y += 42;

  // Űrlapmezők
  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  doc.text('Átvevő neve:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 25, y, mainContentRight);

  y += 6;
  doc.text('Átvevő lakcíme:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 30, y, mainContentRight);

  y += 5;
  drawSolidLine(doc, layout.marginLeft, y, mainContentRight);

  y += 6;
  doc.text('Személyazonosító okmány típusa és azonosítója:', layout.marginLeft, y);
  drawSolidLine(doc, layout.marginLeft + 85, y, mainContentRight);

  y += 8;

  // Nyilatkozat szöveg
  const declarationText = "Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a 'CÉG' képviselője, a megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a 'CÉG' felé, egyidejűleg elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi változásaiért a 'CÉG' nem tartozik felelősséggel. Meggyőződtem arról, hogy a 'CÉG' a tárgyat annak megtalálásától az elvárható gondossággal őrizte meg.";

  doc.setFontSize(10);
  doc.setFont('Roboto', 'normal');
  const splitDeclaration = doc.splitTextToSize(declarationText, mainContentRight - layout.marginLeft);
  doc.text(splitDeclaration, layout.marginLeft, y);
  y += splitDeclaration.length * layout.lineHeight + 6;

  // Első aláírás sor
  drawSolidLine(doc, sig1Center - sigWidth / 2, y, sig1Center + sigWidth / 2);
  doc.setFontSize(9);
  doc.text('dátum', sig1Center, y + 4, { align: 'center' });

  drawSolidLine(doc, sig2Center - sigWidth / 2, y, sig2Center + sigWidth / 2);
  doc.text('átadó', sig2Center, y + 4, { align: 'center' });

  drawSolidLine(doc, sig3Center - sigWidth / 2, y, sig3Center + sigWidth / 2);
  doc.text('átvevő', sig3Center, y + 4, { align: 'center' });

  y += 12;

  // Találó nyilatkozat
  doc.setFontSize(10);
  doc.setFont('Roboto', 'bold');
  doc.text(`${talaloNev} (${talaloLakcim})`, layout.marginLeft, y);
  doc.setFont('Roboto', 'normal');

  y += 5;
  const finderDeclaration = "mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy kiadására.";

  const splitFinderDecl = doc.splitTextToSize(finderDeclaration, mainContentRight - layout.marginLeft);
  doc.text(splitFinderDecl, layout.marginLeft, y);
  y += splitFinderDecl.length * layout.lineHeight + 6;

  // Második aláírás sor
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
