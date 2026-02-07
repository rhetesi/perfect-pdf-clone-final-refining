import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { addRobotoFonts } from './fonts';
import { TalaltTargyLapData, createLayout, drawDashedLine } from './pdf/types';
import { drawCimke } from './pdf/drawCimke';
import { drawNyilvantartoLap } from './pdf/drawNyilvantartoLap';
import { drawElismerveny } from './pdf/drawElismerveny';
import { drawSidebar, createSidebarBox } from './pdf/drawSidebar';
import { drawMasodlat, createMasodlatBox } from './pdf/drawMasodlat';

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

  // 1. Nyilvántartó címke (6mm - 35mm)
  drawCimke(doc, data, layout, qrDataUrl);

  // Felső szaggatott elválasztó vonal (41mm)
  drawDashedLine(doc, layout, layout.topSeparatorY);

  // 2. Nyilvántartási lap (47mm - 210mm)
  drawNyilvantartoLap(doc, data, layout);

  // 4. Nyilvántartó függőleges sáv (virtuális dobozban)
  const sidebarBox = createSidebarBox();
  drawSidebar(doc, data, sidebarBox);

  // 5. MÁSODLAT rész (virtuális dobozban)
  const masodlatBox = createMasodlatBox();
  drawMasodlat(doc, data, masodlatBox);

  // Alsó szaggatott elválasztó vonal (216mm)
  drawDashedLine(doc, layout, layout.bottomSeparatorY);

  // 3. Átvételi elismervény (222mm - 291mm)
  drawElismerveny(doc, data, layout);

  // Save PDF
  doc.save(`talalt_targy_${data.azonosito}.pdf`);
};
