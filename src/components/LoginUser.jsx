import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:6789/users/login", {
        email,
        password,
      });
      console.log(response.data);
      const { token } = response.data;
      const decodeUser = jwtDecode(token);
      sessionStorage.setItem("user", JSON.stringify(decodeUser));
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      console.log("User connecté : ", decodeUser);
     
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion", error.message);
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
        ></input>

        <div>
          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="eyes-password" onClick={toggleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </a>
        </div>

        <button type="submit" className="btn-login">
          Connexion
        </button>

        <div className="inscrivez-vous">
          <p className="small-text">Vous n'avez pas encore de compte ?</p>
          <Link to="/users/register" className="home-link">
            <button className="btn-login">Inscrivez-vous !</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
