import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  const handleLogout = async () => {
    sessionStorage.removeItem("decorator");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <section className="Navbar">
      <Link to="/" className="home-link">
        <h1 className="title">INTERIOR DIGITAL</h1>
      </Link>

      {userData && (
        <div className="box-login">
          <p>Bienvenue {userData.user.firstname}, sur votre espace déco.</p>
          <Link to="/users/espace-deco" className="home-link">
            Votre espace deco
          </Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      )}

      {decoratorData && (
        <div className="box-login">
          <p>Bienvenue {decoratorData.user.firstname}, sur votre espace de création.</p>
          <Link to="/decorators/espace-creation" className="home-link">
            Votre espace de création
          </Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      )}

      {!userData && !decoratorData && (
        <div className="box-login">
          <Link to="/users/login" className="home-link">
            CLIENT
          </Link>
          <Link to="/decorators/login" className="home-link">
            DECORATEUR
          </Link>
        </div>
      )}
    </section>
  );
}

export default Navbar;


