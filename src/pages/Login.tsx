import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import BackArrow from "../components/BackArrow";
import { Link } from "react-router-dom";
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import LoadingAnimation from "../components/LoadingAnimation";
import { useNavigate } from "react-router";

function Login() {
  const [statusMsg, setStatusMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [roleAccount, setRoleAccount] = useState({ value: "", label: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);

    const newUser = {
      UserName: userName,
      Password: passWord,
      Role: roleAccount.value,
    };

    console.log(newUser);

    try {
      const response = await fetch(
        "https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.UserName);
      localStorage.setItem("role", data.Role);
      localStorage.setItem("id", data.ID);

      setStatusMsg("Välkommen in!");
      setUserName("");
      setPassWord("");
      setRoleAccount({ value: "", label: "" });
      setLoading(false);

      if (data.Role === "receiver") {
        navigate("/recipient");
      } else if (data.Role === "driver") {
        navigate("/driver");
      } else if (data.Role === "sender") {
        navigate("/sender");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMsg("Registrering misslyckades. Försök igen.");
      setLoading(false);
    }
  }

  return (
    <>
      <HeaderNavigation />
      <main className="p-8 flex flex-col justify-center items-center gap-8">
        <BackArrow />

        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-dark mb-2">Välkommen!</h1>
          <p className="text-lg text-text-dark opacity-80">
            Logga in för att fortsätta till din profil
          </p>
        </div>

        <Input
          label="Email"
          name="email"
          id="email"
          type="email"
          className="max-sm:w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <Input
          label="Lösenord"
          name="password"
          id="password"
          type="password"
          className="max-sm:w-full"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />

        <Dropdown
          options={[
            { value: "driver", label: "Driver" },
            { value: "sender", label: "Sender" },
            { value: "receiver", label: "Receiver" },
          ]}
          selectedValue={roleAccount.value}
          onSelect={(o) => setRoleAccount(o)}
          placeholder="Välj kontotyp"
          className="
            w-100
            max-sm:w-full"
        />

        {loading ? (
          <LoadingAnimation />
        ) : (
          <PrimaryButton
            fullWidth={true}
            text="Logga in"
            onClick={handleSubmit}
          />
        )}
        <p className="font-bold">{statusMsg}</p>
        <div className="text-center">
          <p className="text-text-dark ">
            Har du inget konto än?{" "}
            <Link
              to="/sign-up"
              className="underline font-bold hover:underline transition-colors"
            >
              Registrera dig här
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
