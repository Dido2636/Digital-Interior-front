import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function LoginDecorator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const decorator = JSON.parse(sessionStorage.getItem("decorator"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:6789/decorators/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      const { token } = response.data;
      const decodeUser = jwtDecode(token);
      sessionStorage.setItem("decorator", JSON.stringify(decodeUser));
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      console.log("Decorator connecté : ", decodeUser);

      navigate(`/dashboard/${decorator}/projects`);
    } catch (error) {
      console.error("Erreur de connexion", error.message);
      if ("Invalid password") {
        setError("Mot de passe incorrect");
      } else {
        setError("Une erreur s'est produite lors de la connexion");
      }
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-user">
        <h2 className="medium-title">Connectez-vous</h2>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="eyes-password" onClick={toggleShowPassword}>
            {showPassword ? <FaEye className="eyes-password" /> : <FaEyeSlash className="eyes-password" />}
          </a>
        </div>

        <button className="btn-login" type="submit">
          connexion
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="inscrivez-vous">
          <p className="small-text">Vous n'avez pas encore de compte ?</p>
          <Link to="/decorators/register">
            <button className="btn-login">Inscrivez-vous !</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginDecorator;
