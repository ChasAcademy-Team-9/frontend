import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Sidan hittades inte.</h1>
      <h2>Error 404.</h2>
      <Link to={"/"}>
        <p className="underline">Tillbaka till hem</p>
      </Link>
    </>
  );
}

export default NotFound;
