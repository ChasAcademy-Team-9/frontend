import { useEffect, useState } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { Link } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";

function HeaderNavigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [linkUrlProfile, setLinkUrlProfile] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUserName = localStorage.getItem("username");
    const localRole = localStorage.getItem("role");

    if (token) {
      setLoggedIn(true);
      setUsername(localUserName || "");

      if (localRole === "driver") {
        setLinkUrlProfile("/driver");
      } else if (localRole === "sender") {
        setLinkUrlProfile("/sender");
      } else if (localRole === "receiver") {
        setLinkUrlProfile("/recipient");
      }
    } else {
      setLoggedIn(false);
      setUsername("");
      setLinkUrlProfile("");
    }
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    setLoggedIn(false);
    setUsername("");
    setLinkUrlProfile("");

    window.location.reload();
  }

  return (
    <nav className="flex justify-between items-center sm:gap-4 p-4 ">
      <Link to="/">
        <h2 className="sm:text-2xl text-xl  font-bold text-primary">Chas 9</h2>
      </Link>
      {loggedIn ? (
        <div className="flex justify-center items-center sm:gap-4">
          <Link to={linkUrlProfile}>
            <button className="text-xl flex justify-center items-center gap-1 hover:bg-secondary brightness-150 hover:underline px-6 py-2 rounded-2xl">
              <LuCircleUserRound />
              {username}
            </button>
          </Link>

          <SecondaryButton text="Logga ut" onClick={handleLogOut} />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <Link to="/sign-up">
            <PrimaryButton text="Registrera" />
          </Link>
          <Link to="/login">
            <SecondaryButton text="Logga in" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default HeaderNavigation;
