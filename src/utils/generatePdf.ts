import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { addRobotoFonts } from './fonts';
import { TalaltTargyLapData, createLayout, drawDashedLine } from './pdf/types';
import { drawCimke } from './pdf/drawCimke';
import { drawNyilvantartoLap } from './pdf/drawNyilvantartoLap';
import { drawElismerveny } from './pdf/drawElismerveny';
import { drawSidebar } from './pdf/drawSidebar';
import { drawMasodlat } from './pdf/drawMasodlat';

export type { TalaltTargyLapData };

export const generateTalaltTargyPdf = async (data: TalaltTargyLapData): Promise<void> => {
  const layout = createLayout();

  // Generate QR code as base64
  const qrDataUrl = await QRCode.toDataURL(data.azonosito, {
    width: 200,
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  // Create PDF - A4 size
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add Roboto fonts
  await addRobotoFonts(doc);

  // 1. Nyilvántartó címke (felső rész)
  drawCimke(doc, data, layout, qrDataUrl);

  // Felső szaggatott elválasztó vonal (4,1 cm)
  drawDashedLine(doc, layout, layout.topSeparatorY);

  // 2. Nyilvántartási lap (középső rész)
  drawNyilvantartoLap(doc, data, layout);

  // 5. MÁSODLAT rész (a nyilvántartási lapon belül)
  drawMasodlat(doc, data, layout);

  // 4. Nyilvántartó függőleges sáv
  drawSidebar(doc, data, layout);

  // Alsó szaggatott elválasztó vonal (21,6 cm)
  drawDashedLine(doc, layout, layout.bottomSeparatorY);

  // 3. Átvételi elismervény (alsó rész)
  drawElismerveny(doc, data, layout);

  // Save PDF
  doc.save(`talalt_targy_${data.azonosito}.pdf`);
};
