import { PrimaryButton } from "../components/PrimaryButton";
import { IoMdQrScanner } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import BackArrow from "../components/BackArrow";

const Scanning = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="relative p-5 bg-secondary text-text-dark">
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <BackArrow />
        </div>
        <h1 className="text-2xl font-bold text-center">Förare Dashboard</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-20">
        <div className="mb-8">
          <div className="w-56 h-56 border-[3px] border-text-dark rounded-[2rem] flex items-center justify-center relative">
            <div className="absolute top-3 left-3 w-12 h-12 border-t-[3px] border-l-[3px] border-text-dark rounded-tl-xl"></div>
            <div className="absolute top-3 right-3 w-12 h-12 border-t-[3px] border-r-[3px] border-text-dark rounded-tr-xl"></div>
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-[3px] border-l-[3px] border-text-dark rounded-bl-xl"></div>
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-[3px] border-r-[3px] border-text-dark rounded-br-xl"></div>

            <div className="w-16 h-16 border-[3px] border-text-dark rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-10 max-w-xs">
          <h2 className="text-2xl font-semibold text-text-dark mb-3">
            Skanna streckkod
          </h2>
          <p className="text-text-dark text-base">
            Rikta kameran mot paketet streckkod
          </p>
        </div>

        <div className="flex flex-col items-center w-full space-y-4">
          <PrimaryButton
            text="Starta Skanning"
            icon={<IoMdQrScanner size={20} />}
            onClick={() => console.log("Starta Skanning")}
          />
          <PrimaryButton
            text="Ange Manuellt"
            icon={<FaPlus size={16} />}
            onClick={() => console.log("Ange Manuellt")}
          />
        </div>
      </div>
    </div>
  );
};

export default Scanning;
