import TalaltTargyLap from "@/components/TalaltTargyLap";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4 print:p-0 print:bg-white">
      <TalaltTargyLap
        targyNev="Férfi karóra"
        targyLeiras="Casio (fém, ezüst, kerek)"
        helyszin="Főbejárat aula"
        datum="2026. 01. 29."
        azonosito="697B781F52740ECF"
        nyomtatasDatum="2026. 01. 31."
        talaloNev="Név"
        talaloLakcim="lakcím"
      />
    </div>
  );
};

export default Index;
