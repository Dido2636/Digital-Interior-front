import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  const handleLogout = async () => {
    sessionStorage.removeItem("decorator");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <section className="Navbar">
      <Link to="/" className="home-link">
        <div className="box-title">
          <h1 className="title">INTERIOR DIGITAL</h1>
        </div>
      </Link>

      {userData && (
        <div className="box-login">
          <p className="name-login">Bienvenue {userData.user.firstname}, </p>
          <Link to="/decorators/espace-creation" className="home-link">
            Espace deco
          </Link>
          <button className="btn-deconnexion" onClick={handleLogout}>X</button>
        </div>
      )}

      {decoratorData && (
        <div className="box-login">
          <p className="name-login" >
            Bienvenue {decoratorData.user.firstname}, 
          </p>
          <Link to="/decorators/espace-creation" className="home-link">
          Espace création
          </Link>
          <button onClick={handleLogout}>X</button>
        </div>
      )}

      {!userData && !decoratorData && (
        <div className="box-login">
          <Link to="/contact" className="home-link">
            CONTACT
          </Link>
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
