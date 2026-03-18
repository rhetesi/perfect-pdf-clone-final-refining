import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { addRobotoFonts } from './fonts';
import { TalaltTargyLapData, createLayout, drawDashedLine, buildFilename } from './pdf/types';
import { drawCimke } from './pdf/drawCimke';
import { drawNyilvantartoLap } from './pdf/drawNyilvantartoLap';
import { drawElismerveny } from './pdf/drawElismerveny';
import { drawSidebar } from './pdf/drawSidebar';
import { drawMasodlat } from './pdf/drawMasodlat';

export type { TalaltTargyLapData };

export const generateTalaltTargyPdf = async (data: TalaltTargyLapData): Promise<void> => {
  const layout = createLayout();

  // Generate QR code as base64
  const qrSize = Math.round(layout.pageWidth * 0.12); // ~2.5cm equivalent
  const qrDataUrl = await QRCode.toDataURL(data.azonosito.toUpperCase(), {
    width: qrSize,
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  // Create PDF - A4 size in pt
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Add Roboto fonts
  await addRobotoFonts(doc);

  // 1. Separator lines
  drawDashedLine(doc, layout, layout.topSeparatorY);
  drawDashedLine(doc, layout, layout.bottomSeparatorY);

  // 2. Top label with QR
  drawCimke(doc, data, layout, qrDataUrl);

  // 3. Main registry section (returns masodlat anchor Y)
  const masodlatAnchorY = drawNyilvantartoLap(doc, data, layout);

  // 4. Bottom receipt section
  drawElismerveny(doc, data, layout);

  // 5. Right sidebar bar
  drawSidebar(doc, data, layout.pageWidth);

  // 6. MÁSODLAT overlay (conditional)
  if (data.duplicate) {
    drawMasodlat(doc, layout.rightX, masodlatAnchorY);
  }

  // Save PDF
  doc.save(buildFilename(data.azonosito.toUpperCase()));
};
