import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function UserForm() {
  const [newUser, setNewUser] = useState({
    name: "",
    firstname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const createUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:6789/users/register`,
        newUser
      );
     
      setNewUser({
        name:"",
        firstname: "",
        email: "",
        password: "",
      });
      navigate("/users/login")
    } catch (error) {
      console.error("Erreur");
    }
  };

  return (
    <div>
     
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
        className="form-user">
        <h2 className="medium-title">Inscrivez-vous</h2>
          <input
          className="input-field"
            type="text"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser.name, name: e.target.value }
              )}
              placeholder="Name"
          />
  
          <input
          className="input-field"
            type="text"
            value={newUser.firstname}
            onChange={(e) =>
              setNewUser({
                ...newUser, firstname: e.target.value })}
                placeholder="Prenom"
          />
          <input
          className="input-field"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
          />

          <input
          className="input-field"
            type="text"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            placeholder="Mot de passe"
          />
     
        <button className="btn-login" type="submit">M'inscrire</button>
        <div className="inscrivez-vous">
        <p className="small-text">Vous avez un compte !</p>
      <Link to="/users/login" >
      <button className="btn-login">Connectez-vous</button>
      </Link>
        </div>
      </form>
      
    </div>
  );
}

export default UserForm;
