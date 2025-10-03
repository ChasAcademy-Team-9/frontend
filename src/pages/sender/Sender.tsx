import { FaPiggyBank } from "react-icons/fa";
import BackArrow from "../../components/BackArrow";
import { FaWandSparkles } from "react-icons/fa6";
import { PrimaryButton } from "../../components/PrimaryButton";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

export function Sender() {
  const navigate = useNavigate();

  return (
    <main>
      <BackArrow />
      <h1>Avsändare</h1>
      <p>Hantera dina paket och sensorer.</p>
      <section>
        <div>
          {" "}
          <FaPiggyBank /> <div> 0</div> <div>Totalt paket</div>
        </div>
        <div>
          {" "}
          <FaPiggyBank /> <div> 0</div> <div>Totalt paket</div>
        </div>
        <div>
          {" "}
          <FaPiggyBank /> <div> 0</div> <div>Totalt paket</div>
        </div>
        <div>
          {" "}
          <FaPiggyBank /> <div> 0</div> <div>Totalt paket</div>
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
      <h2>Mina paket</h2>
      <span>3 paket</span>
      <Card variant="package" destination="Svenska Livs AB" paketId="PKG-123" />
      <Card variant="package" />
    </main>
  );
}
