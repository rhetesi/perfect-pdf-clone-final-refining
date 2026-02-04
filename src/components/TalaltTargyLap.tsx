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
    <div className="document-page">
      {/* 1. SZELET - Címke QR kóddal (felső rész, levágható) */}
      <div className="section-label">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="section-title">{targyNev}</h1>
            <p className="text-body">{targyLeiras}</p>
            <p className="text-body">{fullDatum}</p>
          </div>
          <QRCodeSVG 
            value={azonosito} 
            size={72} 
            level="M"
            bgColor="white"
            fgColor="black"
          />
        </div>
        <p className="text-right text-body mt-2">{azonosito}</p>
      </div>

      {/* Első szaggatott vonal */}
      <div className="dashed-separator" />

      {/* 2. SZELET - Kiadási lap (középső rész, lefűzésre kerül) */}
      <div className="section-main relative">
        {/* Jobb oldali fekete sáv - csak ezen a szeleten belül */}
        <div className="sidebar-black">
          <div className="sidebar-text">
            <span>•</span>
            <span className="mx-2">{azonosito}</span>
          </div>
          <div className="sidebar-text sidebar-title">
            {targyNev}
          </div>
          <div className="sidebar-text">
            <span className="mx-2">{datum}</span>
            <span>•</span>
          </div>
        </div>

        {/* Fő tartalom - teljes szélesség */}
        <div>
          {/* Fejléc */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="section-title">{targyNev}</h2>
              <p className="text-body">{targyLeiras}</p>
              <p className="text-body">{fullDatum}</p>
            </div>
            <div className="text-right">
              <p className="text-body mb-1">{azonosito}</p>
              <div className="masodlat-box">MÁSODLAT!</div>
              <p className="text-small text-muted-foreground mt-1">Nyomtatva: {nyomtatasDatum}</p>
            </div>
          </div>

          {/* Átvevő adatok */}
          <div className="form-fields">
            <div className="form-row">
              <span className="form-label">Átvevő neve:</span>
              <span className="form-underline" />
            </div>
            <div className="form-row">
              <span className="form-label">Átvevő lakcíme:</span>
              <span className="form-underline" />
            </div>
            <div className="form-underline-full" />
            <div className="form-row">
              <span className="form-label">Személyazonosító okmány típusa és azonosítója:</span>
              <span className="form-underline" />
            </div>
          </div>

          {/* Nyilatkozat szöveg */}
          <p className="text-justify text-body leading-relaxed mb-6">
            Átvevő adatainál megjelölt személyként elismerem, hogy mai napon, a 'CÉG' képviselője, a megjelölt tárgyat, mint személyes tulajdonomat részemre átadta. A tárgyat megvizsgáltam, azzal kapcsolatban mennyiségi, minőségi kifogást nem támasztok a 'CÉG' felé, egyidejűleg elismerem, hogy általam történő elhagyása és megtalálása között a tárgy mennyiségi, minőségi változásaiért a 'CÉG' nem tartozik felelősséggel. Meggyőződtem arról, hogy a 'CÉG' a tárgyat annak megtalálásától az elvárható gondossággal őrizte meg.
          </p>

          {/* Első aláírás sor */}
          <div className="signature-row-three mb-6">
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-label">dátum</p>
            </div>
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-label">átadó</p>
            </div>
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-label">átvevő</p>
            </div>
          </div>

          {/* Találó nyilatkozat */}
          <div className="mb-4">
            <p className="text-bold mb-2">{talaloNev} ({talaloLakcim})</p>
            <p className="text-justify text-body leading-relaxed">
              mint találó kijelentem, hogy az általam talált fent megjelölt tárgy NEM tartozik a személyes és közeli hozzátartozóim tulajdona körébe, így annak tulajdonjogára sem most, sem később nem tartok igényt. Egyben kijelentem, hogy megértettem és tudomásul veszem, hogy az átvételi elismervényen található figyelmeztetés szerint az átvételi elismervény nem jogosít a talált tárgy kiadására.
            </p>
          </div>

          {/* Második aláírás sor */}
          <div className="signature-row-three">
            <div className="signature-block">
              <p className="text-body">{datum}</p>
            </div>
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-label">átadó</p>
              <p className="signature-name">{talaloNev}</p>
            </div>
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-label">cég képviselője</p>
              <p className="signature-name">Név</p>
            </div>
          </div>
        </div>
      </div>

      {/* Második szaggatott vonal */}
      <div className="dashed-separator" />

      {/* 3. SZELET - Átvételi elismervény (alsó rész, találónak adandó) */}
      <div className="section-receipt">
        <h2 className="section-title mb-4">Átvételi elismervény</h2>
        
        <div className="mb-2">
          <p className="text-bold">{targyNev}</p>
          <p className="text-body">{targyLeiras}</p>
        </div>

        <p className="text-bold mb-2">{talaloNev} ({talaloLakcim})</p>

        <p className="text-justify text-body leading-relaxed mb-4">
          A „cég" képviseletében elismerem, hogy a fent megnevezett tárgyat, megnevezett találótól átvettük. Egyben tájékoztattam a találót, hogy ezen átvételi elismervény NEM jogosít a talált tárgy találó részére történő kiadására.
        </p>

        {/* Alsó aláírás */}
        <div className="flex items-end justify-between">
          <p className="text-body">{datum}</p>
          <div className="flex items-end gap-6">
            <span className="text-body">ph</span>
            <div className="signature-block">
              <div className="signature-line" />
              <p className="signature-name">Név</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TalaltTargyLap;
