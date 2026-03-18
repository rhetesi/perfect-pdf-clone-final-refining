import TalaltTargyLap from "@/components/TalaltTargyLap";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateTalaltTargyPdf } from "@/utils/generatePdf";

const Index = () => {
  const dokumentumAdatok = {
    targyNev: "Férfi karóra",
    targyLeiras: "Casio (fém, ezüst, kerek)",
    helyszin: "Főbejárat aula",
    datum: "2026. 01. 29.",
    azonosito: "697B781F52740ECF",
    nyomtatasDatum: "2026. 01. 31.",
    talaloNev: "Név",
    talaloLakcim: "lakcím",
    companyName: "CÉG",
    duplicate: true,
  };

  const handleDownloadPdf = () => {
    generateTalaltTargyPdf(dokumentumAdatok);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-4 print:p-0 print:bg-white gap-4">
      <div className="print:hidden">
        <Button onClick={handleDownloadPdf} className="gap-2">
          <Download className="h-4 w-4" />
          PDF letöltése
        </Button>
      </div>
      <TalaltTargyLap {...dokumentumAdatok} />
    </div>
  );
};

export default Index;
