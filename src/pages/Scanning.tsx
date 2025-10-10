import { PrimaryButton } from "../components/PrimaryButton"
import { IoMdQrScanner } from "react-icons/io"
import { FaPlus } from "react-icons/fa";


const Scanning = () => {
     return (
          <div>
               <PrimaryButton
                    text="Starta Skanning"
                    icon={<IoMdQrScanner style={{ marginRight: '4px' }} />}
                    onClick={() => console.log("Starta Skanning")}
               >
               </PrimaryButton>
               <PrimaryButton
                    text="Ange Manuellt"
                    icon={<FaPlus style={{ marginRight: '4px' }} />}
                    onClick={() => console.log("Ange Manuellt")}
               >
               </PrimaryButton>
          </div>
     )
}

export default Scanning