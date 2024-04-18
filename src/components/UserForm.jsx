import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    firstname: "",
    email: "",
    password: "",
  });
 

  const createUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6789/users/register`,
        newUser
      );

      setNewUser({
        name: "",
        firstname: "",
        email: "",
        password: "",
      });
      setMessage("Vous etes bien inscrit !")
    } catch (error) {
      console.error("Erreur");
      setError("Un utilisateur avec cette adresse e-mail existe déjà");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
        className="form-user"
      >
        <h2 className="medium-title">Inscrivez-vous</h2>
        <input
          className="input-field"
          type="text"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ ...newUser.name, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          className="input-field"
          type="text"
          value={newUser.firstname}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              firstname: e.target.value,
            })
          }
          placeholder="Prenom"
        />
        <input
          className="input-field"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />

        <div>
          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre mot de passe"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <a className="eyes-password" onClick={toggleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </a>
        </div>

        <button className="btn-login" type="submit">
          M'inscrire
        </button>
        {message && (<div className="text-register">{message}</div>)} 
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="inscrivez-vous">
          <p className="small-text">Vous avez un compte !</p>
          <Link to="/users/login">
            <button className="btn-login">Connectez-vous</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
