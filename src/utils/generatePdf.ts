 import { jsPDF } from 'jspdf';
 import QRCode from 'qrcode';
 import { addRobotoFonts } from './fonts';
 
 interface TalaltTargyLapData {
   targyNev: string;
   targyLeiras: string;
   helyszin: string;
   datum: string;
   azonosito: string;
   nyomtatasDatum: string;
   talaloNev?: string;
   talaloLakcim?: string;
 }
 
 export const generateTalaltTargyPdf = async (data: TalaltTargyLapData): Promise<void> => {
   const {
     targyNev,
     targyLeiras,
     helyszin,
     datum,
     azonosito,
     nyomtatasDatum,
     talaloNev = 'Név',
     talaloLakcim = 'lakcím',
   } = data;
 
   const fullDatum = `${helyszin}, ${datum}`;
 
   // Generate QR code as base64
   const qrDataUrl = await QRCode.toDataURL(azonosito, {
     width: 200,
     margin: 0,
     color: { dark: '#000000', light: '#ffffff' },
   });
 
   // Create PDF - A4 size in mm
   const doc = new jsPDF({
     orientation: 'portrait',
     unit: 'mm',
     format: 'a4',
   });
 
   // Add Roboto fonts
   await addRobotoFonts(doc);
 
   // Page dimensions
   const pageWidth = 210;
   const marginLeft = 20;
   const marginRight = 20;
   const contentWidth = pageWidth - marginLeft - marginRight;
   const contentRight = pageWidth - marginRight;
   
   // Sidebar configuration
   const sidebarWidth = 10;
   const mainContentRight = contentRight - sidebarWidth - 2;
   
   // Signature positions (from page left edge)
   const sig1Center = 50;
   const sig2Center = 107.5;
   const sig3Center = 160;
   const sigWidth = 35;
 
   // Line height for text
   const lineHeight = 4;
 
   let y = 6; // Top margin 6mm
 
   // Helper function to draw dashed line
   const drawDashedLine = (yPos: number) => {
     doc.setLineDashPattern([2, 2], 0);
     doc.setLineWidth(0.3);
     doc.line(marginLeft, yPos, pageWidth - marginRight, yPos);
     doc.setLineDashPattern([], 0);
   };
 
   // Helper function to draw solid line
   const drawSolidLine = (x1: number, yPos: number, x2: number) => {
     doc.setLineDashPattern([], 0);
     doc.setLineWidth(0.3);
     doc.line(x1, yPos, x2, yPos);
   };
 
   // === SECTION 1: Label with QR code ===
   doc.setFontSize(18);
   doc.setFont('Roboto', 'bolditalic');
   doc.text(targyNev, marginLeft, y + 6);
   
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   doc.text(targyLeiras, marginLeft, y + 11);
   doc.text(fullDatum, marginLeft, y + 15);
 
   // QR Code
   const qrSize = 20;
   const qrX = pageWidth - marginRight - qrSize;
   const qrY = y;
   doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
   
   // Identifier right-aligned under QR
   doc.setFontSize(10);
   doc.text(azonosito, pageWidth - marginRight, y + 24, { align: 'right' });
 
   y += 28;
 
   // First dashed separator
   drawDashedLine(y);
   y += 6;
 
   // === SECTION 2: Main form (middle section) ===
   const section2Start = y;
   
   // Header
   doc.setFontSize(18);
   doc.setFont('Roboto', 'bolditalic');
   doc.text(targyNev, marginLeft, y + 6);
   
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   doc.text(targyLeiras, marginLeft, y + 11);
   doc.text(fullDatum, marginLeft, y + 15);
 
   // Right side - identifier and MÁSODLAT box
   doc.setFontSize(10);
   doc.text(azonosito, mainContentRight, y + 4, { align: 'right' });
   
   // MÁSODLAT box
   doc.setFont('Roboto', 'bold');
   const masodlatText = 'MÁSODLAT!';
   const masodlatWidth = doc.getTextWidth(masodlatText) + 6;
   const masodlatX = mainContentRight - masodlatWidth;
   doc.setFillColor(0, 0, 0);
   doc.rect(masodlatX, y + 6, masodlatWidth, 5, 'F');
   doc.setTextColor(255, 255, 255);
   doc.text(masodlatText, masodlatX + 3, y + 9.5);
   doc.setTextColor(0, 0, 0);
   doc.setFont('Roboto', 'normal');
   
   // Print date
   doc.setFontSize(9);
   doc.text(`Nyomtatva: ${nyomtatasDatum}`, mainContentRight, y + 15, { align: 'right' });
 
   y += 22;
 
   // Form fields
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   doc.text('Átvevő neve:', marginLeft, y);
   drawSolidLine(marginLeft + 25, y, mainContentRight);
   
   y += 6;
   doc.text('Átvevő lakcíme:', marginLeft, y);
   drawSolidLine(marginLeft + 30, y, mainContentRight);
   
   y += 5;
   drawSolidLine(marginLeft, y, mainContentRight);
   
   y += 6;
   doc.text('Személyazonosító okmány típusa és azonosítója:', marginLeft, y);
   drawSolidLine(marginLeft + 85, y, mainContentRight);
 
   y += 8;
 
   // Declaration text
   const declarationText = "Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a 'CÉG' képviselője, a megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a 'CÉG' felé, egyidejűleg elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi változásaiért a 'CÉG' nem tartozik felelősséggel. Meggyőződtem arról, hogy a 'CÉG' a tárgyat annak megtalálásától az elvárható gondossággal őrizte meg.";
   
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   const splitDeclaration = doc.splitTextToSize(declarationText, mainContentRight - marginLeft);
   doc.text(splitDeclaration, marginLeft, y);
   y += splitDeclaration.length * lineHeight + 6;
 
   // First signature row
   drawSolidLine(sig1Center - sigWidth/2, y, sig1Center + sigWidth/2);
   doc.setFontSize(9);
   doc.text('dátum', sig1Center, y + 4, { align: 'center' });
   
   drawSolidLine(sig2Center - sigWidth/2, y, sig2Center + sigWidth/2);
   doc.text('átadó', sig2Center, y + 4, { align: 'center' });
   
   drawSolidLine(sig3Center - sigWidth/2, y, sig3Center + sigWidth/2);
   doc.text('átvevő', sig3Center, y + 4, { align: 'center' });
 
   y += 12;
 
   // Finder declaration (bold name + address)
   doc.setFontSize(10);
   doc.setFont('Roboto', 'bold');
   doc.text(`${talaloNev} (${talaloLakcim})`, marginLeft, y);
   doc.setFont('Roboto', 'normal');
   
   y += 5;
   const finderDeclaration = "mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy kiadására.";
   
   const splitFinderDecl = doc.splitTextToSize(finderDeclaration, mainContentRight - marginLeft);
   doc.text(splitFinderDecl, marginLeft, y);
   y += splitFinderDecl.length * lineHeight + 6;
 
   // Second signature row
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   doc.text(datum, sig1Center, y, { align: 'center' });
   
   drawSolidLine(sig2Center - sigWidth/2, y, sig2Center + sigWidth/2);
   doc.setFontSize(9);
   doc.text('átadó', sig2Center, y + 4, { align: 'center' });
   doc.text(talaloNev, sig2Center, y + 8, { align: 'center' });
   
   drawSolidLine(sig3Center - sigWidth/2, y, sig3Center + sigWidth/2);
   doc.text('cég képviselője', sig3Center, y + 4, { align: 'center' });
   doc.text('Név', sig3Center, y + 8, { align: 'center' });
 
   const section2End = y + 12;
 
   // Draw black sidebar on the right margin (inside section 2 only)
   const sidebarX = pageWidth - marginRight;
   doc.setFillColor(0, 0, 0);
   doc.rect(sidebarX, section2Start - 6, sidebarWidth, section2End - section2Start + 6, 'F');
   
   // Sidebar text (rotated)
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(9);
   doc.setFont('Roboto', 'bold');
   
   // Calculate sidebar text positions
   const sidebarCenterX = sidebarX + sidebarWidth / 2;
   const sidebarMidY = (section2Start - 6 + section2End) / 2;
   
   // Top bullet and identifier
   doc.text('•', sidebarCenterX, section2Start, { align: 'center', angle: 90 });
   doc.text(azonosito, sidebarCenterX, section2Start + 4, { align: 'center', angle: 90 });
   
   // Middle - item name
   doc.setFontSize(12);
   doc.text(targyNev, sidebarCenterX, sidebarMidY, { align: 'center', angle: 90 });
   
   // Bottom - date and bullet
   doc.setFontSize(9);
   doc.text(datum, sidebarCenterX, section2End - 4, { align: 'center', angle: 90 });
   doc.text('•', sidebarCenterX, section2End, { align: 'center', angle: 90 });
   
   doc.setTextColor(0, 0, 0);
   doc.setFont('Roboto', 'normal');
 
   y = section2End + 2;
 
   // Second dashed separator
   drawDashedLine(y);
   y += 6;
 
   // === SECTION 3: Receipt (bottom section) ===
   doc.setFontSize(18);
   doc.setFont('Roboto', 'bolditalic');
   doc.text('Átvételi elismervény', marginLeft, y + 5);
   
   y += 12;
   
   doc.setFontSize(10);
   doc.setFont('Roboto', 'bold');
   doc.text(targyNev, marginLeft, y);
   doc.setFont('Roboto', 'normal');
   doc.text(targyLeiras, marginLeft, y + 4);
 
   y += 10;
   
   doc.setFont('Roboto', 'bold');
   doc.text(`${talaloNev} (${talaloLakcim})`, marginLeft, y);
   doc.setFont('Roboto', 'normal');
 
   y += 5;
   
   const receiptText = 'A „cég" képviseletében elismerem, hogy a fent megnevezett tárgyat, megnevezett találótól átvettük. Egyben tájékoztattam a találót, hogy ezen átvételi elismervény NEM jogosít a talált tárgy találó részére történő kiadására.';
   const splitReceipt = doc.splitTextToSize(receiptText, contentWidth);
   doc.text(splitReceipt, marginLeft, y);
   
   y += splitReceipt.length * lineHeight + 6;
 
   // Bottom signature row
   doc.setFontSize(10);
   doc.setFont('Roboto', 'normal');
   doc.text(datum, marginLeft, y);
   
   // ph and signature on right
   doc.text('ph', contentRight - 50, y);
   drawSolidLine(contentRight - 40, y, contentRight);
   doc.setFontSize(9);
   doc.text('Név', contentRight - 20, y + 4, { align: 'center' });
 
   // Save PDF
   doc.save(`talalt_targy_${azonosito}.pdf`);
 };