import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function DecoratorForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [newDecorator, setNewDecorator] = useState({
    company: "",
    firstname: "",
    email: "",
    password: "",
  });

  const createDecorator = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6789/decorators/register`,
        newDecorator
      );

      setNewDecorator({
        company: "",
        firstname: "",
        email: "",
        password: "",
      });
      setMessage("Vous etes bien inscrit !")

    } catch (error) {
      console.error("Erreur");
      setError("Un décorateur avec cette adresse e-mail existe déjà");
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
          createDecorator();
        }}
        className="form-user"
      >
        <h2 className="medium-title">Inscrivez-vous</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Société"
          value={newDecorator.company}
          onChange={(e) =>
            setNewDecorator({
              ...newDecorator.company,
              company: e.target.value,
            })
          }
        />
        <input
          className="input-field"
          type="text"
          placeholder="Prenom"
          value={newDecorator.firstname}
          onChange={(e) =>
            setNewDecorator({
              ...newDecorator,
              firstname: e.target.value,
            })
          }
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={newDecorator.email}
          onChange={(e) =>
            setNewDecorator({ ...newDecorator, email: e.target.value })
          }
        />

        <div>
          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre mot de passe"
            value={newDecorator.password}
            onChange={(e) =>
              setNewDecorator({ ...newDecorator, password: e.target.value })
            }
          />
          <a className="eyes-password" onClick={toggleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </a>
        </div>

        <button type="submit" className="btn-login">
        M'inscrire
        </button>
        {message && (<div className="text-register">{message}</div>)} 
        <div className="inscrivez-vous">
          <p className="small-text">Vous avez un compte !</p>
          <Link to="/decorators/login" className="home-link">
            <button className="btn-login">Connectez-vous</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DecoratorForm;
