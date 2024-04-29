import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const decorator = JSON.parse(sessionStorage.getItem("decorator"));

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

      {user  && (
        <div className="box-login">
          <div className="name-login-one">
            <p className="name-login">Bienvenue {user.userData.firstname}, </p>
          </div>
          <Link to="/espace-deco" className="home-link">
            Espace deco
          </Link>
          <button className="btn-deco" onClick={handleLogout}>
            <CiLogout />
          </button>
        </div>
      )}

      {decorator  && (
        <div className="box-login">
          <p className="name-login">
            Bienvenue {decorator.userData.firstname},
          </p>
          <Link to={`/dashboard/${decorator.userData.firstname}/projects`} className="home-link">
            Espace création
          </Link>
          <button className="btn-deco" onClick={handleLogout}>
            <CiLogout className="btn-deconnexion" width={"500px"} />
          </button>
        </div>
      )}

      {!user && !decorator && (
        <div className="box-login">
  
          <Link to="/users/login" className="home-link-client">
            CLIENT
          </Link>
          <Link to="/decorators/login" className="home-link-decorator">
            DECORATEUR
          </Link>
        </div>
      )}
    </section>
  );
}

export default Navbar;
