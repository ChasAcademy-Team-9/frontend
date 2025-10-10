import { FaPiggyBank } from "react-icons/fa";
import BackArrow from "../../components/BackArrow";
import { FaWandSparkles } from "react-icons/fa6";
import { PrimaryButton } from "../../components/PrimaryButton";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

export function Sender() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col p-8 gap-8 max-w-4xl mx-auto">
      <header className="flex gap-2">
        <BackArrow />
        <div className="flex flex-col">
          <h1 className="text-4xl">Avsändare</h1>
          <p>Hantera dina paket och sensorer.</p>
        </div>
      </header>
      <div className="flex flex-col gap-8 bg-white/75 p-4 m-[-1rem] rounded-b-3xl rounded-t-2xl mb-1">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            {" "}
            <FaPiggyBank /> <span> 0</span> <span>Totalt paket</span>
          </div>
          <div>
            {" "}
            <FaPiggyBank /> <span> 0</span> <span>Totalt paket</span>
          </div>
          <div>
            {" "}
            <FaPiggyBank /> <span> 0</span> <span>Totalt paket</span>
          </div>
          <div>
            {" "}
            <FaPiggyBank /> <span> 0</span> <span>Totalt paket</span>
          </div>
        </section>
        <section>
          <FaWandSparkles /> Du har 1 aktiv varning som behöver hanteras.
        </section>
        <PrimaryButton
          text="+ Skapa nytt paket"
          onClick={() => navigate("/sender/new")}
          // onClick={() => navigate("new")}
        />
      </div>
      <div className="flex flex-col gap-8 bg-white/75 p-4 m-[-1rem] rounded-b-3xl rounded-t-2xl">
        <div className="flex justify-left items-baseline gap-4">
          <h2 className="text-2xl">Mina paket</h2>
          <span>3 paket</span>
        </div>
        <Card
          variant="package"
          destination="Svenska Livs AB"
          paketId="PKG-123"
          status="OK"
        />
        <Card
          variant="package"
          destination="Svenska Livs AB"
          paketId="PKG-123"
        />
        <Card
          variant="package"
          destination="Svenska Livs AB"
          paketId="PKG-123"
          status="Kritisk"
        />
        <Card
          variant="package"
          destination="Svenska Livs AB"
          paketId="PKG-123"
        />
      </div>
    </main>
  );
}
