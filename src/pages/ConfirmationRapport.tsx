import Card from "../components/Card";
import BackArrow from "../components/BackArrow";
import { PrimaryButton } from "../components/PrimaryButton";

const ConfirmationRapport: React.FC = () => {
     const currentTime = new Date().toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit'
     });

     const currentDate = new Date().toLocaleDateString('sv-SE');

     return (
          <div className="p-5 max-w-2xl mx-auto">
               {/* Header Section */}
               <div className="text-center mb-8 p-5 bg-secondary text-text-dark rounded-2xl">
                    <h1 className="text-4xl font-bold mb-3">
                         Rapport Skickad
                    </h1>
               </div>

               <div className="bg-secondary/50 p-5 rounded-lg mb-6 border-2xl border-[var(--color-success)] shadow-sm">
                    <h2 className="text-xl font-semibold text-text-dark mb-4 mt-0">
                         Rapportdetaljer
                    </h2>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                         <span className="font-semibold text-text-dark opacity-75">Skickad:</span>
                         <span className="text-text-dark">{currentDate} kl. {currentTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
                         <span className="font-semibold text-[var(--color-text-dark)] opacity-75">Status:</span>
                         <span className="text-[var(--color-success)] font-semibold">Bekräftad</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                         <span className="font-semibold text-[var(--color-text-dark)] opacity-75">Rapport-ID:</span>
                         <span className="text-[var(--color-text-dark)]">RPT-{Date.now().toString().slice(-6)}</span>
                    </div>
               </div>

               <div className="mb-6">
                    <h2 className="text-xl font-semibold text-[var(--color-text-dark)] mb-4">
                         Transportinformation
                    </h2>
                    <Card
                         variant="confirmation"
                         fordonId="XYZ123"
                         paketId="12345"
                         info={{ tid: currentTime }}
                    />
               </div>

               <div className="bg-secondary/50 p-5 rounded-2xl mb-6 border-l-4 border-border">
                    <h2 className="text-xl font-semibold text-text-dark mb-3 mt-0">
                         Nästa steg
                    </h2>
                    <ul className="m-0 pl-5 space-y-2">
                         <li className="text-[var(--color-text-dark)]">
                              Rapporten har sparats i systemet
                         </li>
                         <li className="text-[var(--color-text-dark)]">
                              En kopia har skickats till huvudkontoret
                         </li>
                         <li className="text-[var(--color-text-dark)]">
                              Du kan nu fortsätta med nästa transport
                         </li>
                    </ul>
               </div>

               <div className="flex gap-4 justify-center mt-8 flex-wrap">
                    <BackArrow />
                    <PrimaryButton
                         type="button"
                         text="Skriv ut Bekräftelse"
                         onClick={() => window.print()}
                         className="bg-[var(--color-surface)] text-[var(--color-text-dark)] border-2 border-[var(--color-border)] px-6 py-3 rounded-md text-base cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-gray-400"
                    />
               </div>
          </div>
     );
};

export default ConfirmationRapport;