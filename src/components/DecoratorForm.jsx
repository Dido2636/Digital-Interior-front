import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DecoratorForm() {
  const navigate = useNavigate()
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
      navigate("/decorators/login")
    } catch (error) {
      console.error("Erreur");
    }
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
        <input
          className="input-field"
          type="text"
          placeholder="Mot de passe"
          value={newDecorator.password}
          onChange={(e) =>
            setNewDecorator({ ...newDecorator, password: e.target.value })
          }
        />

        <button type="submit" className="btn-login">
          Enregistrer
        </button>
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
