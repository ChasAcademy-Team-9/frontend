 import Card from "../components/Card";
import BackArrow from "../components/BackArrow";
import { PrimaryButton } from "../components/PrimaryButton";
import { LuCheck } from 'react-icons/lu';

const ConfirmationScanning: React.FC = () => {
     const currentTime = new Date().toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit'
     });

     return (
          <div className="p-5 max-w-2xl mx-auto">
               <div className="text-center mb-8 p-5 bg-secondary text-text-dark rounded-2xl">
                    <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                         <LuCheck className="text-success" size={36} />
                         Confirmation Scanning
                    </h1>
               </div>

               <div className="flex justify-center mb-8">
                    <div className="w-40 h-40 bg-secondary rounded-full flex items-center justify-center">
                         <LuCheck className="text-text-dark" size={80} strokeWidth={3} />
                    </div>
               </div>

               <h2 className="text-2xl font-bold text-center mb-8">Lyckad skanning!</h2>

               <div className="bg-secondary/80 p-5 mb-6 rounded-2xl">
                    <h2 className="text-xl text-text-dark font-semibold mb-4">
                         Paketinformation
                    </h2>
                    <Card
                         className="text-text-dark"
                         variant="package"
                         fordonId="XYZ123"
                         paketId="12345"
                         destination="Stockholm"
                         vikt="2 kg"
                         info={{ tid: currentTime }}
                    />
               </div>

               <div className="bg-secondary/80 p-5 mb-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-text-dark mb-3">
                         Fordon kopplat
                    </h2>
                    <div className="space-y-2 text-text-dark">
                         <div>Ansluten till fordonets centralenhet</div>
                         <div>Fordon-ID: XYZ123</div>
                    </div>
               </div>

               <div className="scale-125 flex gap-4 justify-center mt-8 flex-wrap">
                    <BackArrow />
                    <PrimaryButton
                         text="Starta transport"
                         onClick={() => { alert('Starta transport!'); }}
                    />
               </div>
          </div>
     );
};

export default ConfirmationScanning;