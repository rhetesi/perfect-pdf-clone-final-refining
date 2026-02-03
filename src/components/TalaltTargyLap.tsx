import { QRCodeSVG } from 'qrcode.react';

interface TalaltTargyLapProps {
  targyNev: string;
  targyLeiras: string;
  helyszin: string;
  datum: string;
  azonosito: string;
  nyomtatasDatum: string;
  talaloNev?: string;
  talaloLakcim?: string;
}

const TalaltTargyLap = ({
  targyNev = "Férfi karóra",
  targyLeiras = "Casio (fém, ezüst, kerek)",
  helyszin = "Főbejárat aula",
  datum = "2026. 01. 29.",
  azonosito = "697B781F52740ECF",
  nyomtatasDatum = "2026. 01. 31.",
  talaloNev = "Név",
  talaloLakcim = "lakcím",
}: TalaltTargyLapProps) => {
  const fullDatum = `${helyszin}, ${datum}`;

  return (
    <div className="document-page relative">
      {/* Sidebar - jobb oldali függőleges sáv */}
      <div className="absolute right-0 top-0 h-full w-[18mm] flex flex-col items-center justify-between py-[15mm] border-l border-foreground">
        <div className="sidebar-label">
          <span className="mr-2">•</span>
          {azonosito}
        </div>
        <div className="sidebar-label text-[18pt]">
          {targyNev}
        </div>
        <div className="sidebar-label">
          {datum}
          <span className="ml-2">•</span>
        </div>
      </div>

      {/* Fő tartalom - sidebar nélkül */}
      <div className="pr-[20mm]">
        {/* 1. SZELET - Címke QR kóddal */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-[18pt] font-bold italic mb-1">{targyNev}</h1>
            <p className="text-[10pt] mb-0.5">{targyLeiras}</p>
            <p className="text-[10pt]">{fullDatum}</p>
          </div>
          <div className="flex flex-col items-end">
            <QRCodeSVG 
              value={azonosito} 
              size={80} 
              level="M"
              bgColor="white"
              fgColor="black"
            />
          </div>
        </div>

        {/* Azonosító sor */}
        <div className="text-right text-[10pt] mb-2">
          {azonosito}
        </div>

        {/* Első szaggatott vonal */}
        <div className="dashed-separator" />

        {/* 2. SZELET - Kiadási lap */}
        <div className="relative">
          {/* Fejléc MÁSODLAT jelöléssel */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[18pt] font-bold italic mb-1">{targyNev}</h2>
              <p className="text-[10pt] mb-0.5">{targyLeiras}</p>
              <p className="text-[10pt]">{fullDatum}</p>
            </div>
            <div className="text-right">
              <p className="text-[10pt] mb-1">{azonosito}</p>
              <div className="masodlat-box inline-block mb-1">MÁSODLAT!</div>
              <p className="text-[9pt] text-muted-foreground">Nyomtatva: {nyomtatasDatum}</p>
            </div>
          </div>

          {/* Átvevő adatok */}
          <div className="space-y-3 mb-6">
            <div className="flex">
              <span className="whitespace-nowrap">Átvevő neve:&nbsp;</span>
              <span className="underline-field flex-1" />
            </div>
            <div className="flex">
              <span className="whitespace-nowrap">Átvevő lakcíme:&nbsp;</span>
              <span className="underline-field flex-1" />
            </div>
            <div className="underline-field" />
            <div className="flex">
              <span className="whitespace-nowrap">Személyazonosító okmány típusa és azonosítója:&nbsp;</span>
              <span className="underline-field flex-1" />
            </div>
          </div>

          {/* Nyilatkozat szöveg */}
          <p className="text-justify text-[10pt] leading-relaxed mb-6">
            Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a 'CÉG' képviselője, a 
            megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, 
            azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a 'CÉG' felé, egyidejűleg 
            elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi 
            változásaiért a 'CÉG' nem tartozik felelősséggel. Meggyőződtem arról, hogy a 'CÉG' a tárgyat 
            annak megtalálásától az elvárható gondossággal őrizte meg.
          </p>

          {/* Első aláírás sor */}
          <div className="flex justify-between mb-8 px-4">
            <div className="text-center">
              <div className="signature-line mb-1" />
              <p className="text-[9pt]">dátum</p>
            </div>
            <div className="text-center">
              <div className="signature-line mb-1" />
              <p className="text-[9pt]">átadó</p>
            </div>
            <div className="text-center">
              <div className="signature-line mb-1" />
              <p className="text-[9pt]">átvevő</p>
            </div>
          </div>

          {/* Találó nyilatkozat */}
          <div className="mb-4">
            <p className="font-bold text-[11pt] mb-2">{talaloNev} ({talaloLakcim})</p>
            <p className="text-justify text-[10pt] leading-relaxed">
              mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és 
              közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem 
              tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi 
              elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy 
              kiadására.
            </p>
          </div>

          {/* Második aláírás sor */}
          <div className="flex items-end gap-8 mb-6">
            <p className="text-[10pt] whitespace-nowrap">{datum}</p>
            <div className="flex-1 flex justify-end gap-12">
              <div className="text-center">
                <div className="signature-line mb-1" />
                <p className="text-[9pt]">átadó</p>
                <p className="text-[9pt]">{talaloNev}</p>
              </div>
              <div className="text-center">
                <div className="signature-line mb-1" />
                <p className="text-[9pt]">cég képviselője</p>
                <p className="text-[9pt]">Név</p>
              </div>
            </div>
          </div>
        </div>

        {/* Második szaggatott vonal */}
        <div className="dashed-separator" />

        {/* 3. SZELET - Átvételi elismervény */}
        <div>
          <h2 className="text-[18pt] font-bold italic mb-4">Átvételi elismervény</h2>
          
          <div className="mb-3">
            <p className="font-bold text-[11pt]">{targyNev}</p>
            <p className="text-[10pt]">{targyLeiras}</p>
          </div>

          <p className="font-bold text-[11pt] mb-3">{talaloNev} ({talaloLakcim})</p>

          <p className="text-justify text-[10pt] leading-relaxed mb-4">
            A „cég" képviseletében elismerem, hogy a fent megnevezett tárgyat, megnevezett találótól 
            átvettük. Egyben tájékoztattam a találót, hogy ezen átvételi elismervény NEM jogosít a talált 
            tárgy találó részére történő kiadására.
          </p>

          {/* Alsó aláírás */}
          <div className="flex items-end justify-between">
            <p className="text-[10pt]">{datum}</p>
            <div className="flex items-end gap-8">
              <span className="text-[10pt]">ph</span>
              <div className="text-center">
                <div className="signature-line mb-1" />
                <p className="text-[9pt]">Név</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lábléc */}
        <div className="mt-8 text-center text-[9pt]">
          {datum} • {targyNev} • {azonosito}
        </div>
      </div>
    </div>
  );
};

export default TalaltTargyLap;
