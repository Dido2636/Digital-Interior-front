import React, { useState } from "react";

function Contact() {
  const [newUser, setNewUser] = useState({
    name: "",
    firstname: "",
    email: "",
    phone: "",
    description: "",
    password: "",
  });
  return (
    <>
      <div>
        <h1>Contactez-nous</h1>

        <h3>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex provident
          asperiores illo. Rem incidunt dignissimos asperiores quis cum dicta
          consectetur provident! Dolor voluptatum repudiandae amet harum atque
          voluptas vitae fugiat!
        </h3>

        <form className="form-user">
          <input
            className="input-field"
            type="text"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser.name, name: e.target.value })
            }
            placeholder="Nom"
          />
          <input
            className="input-field"
            type="text"
            value={newUser.firstname}
            onChange={(e) =>
              setNewUser({ ...newUser.firstname, firstname: e.target.value })
            }
            placeholder="Prenom"
          />
          <input
            className="input-field"
            type="text"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser.email, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            className="input-field"
            type="text"
            value={newUser.phone}
            onChange={(e) =>
              setNewUser({ ...newUser.phone, phone: e.target.value })
            }
            placeholder="Name"
          />
          <input
            className="input-field"
            type="text"
            value={newUser.description}
            onChange={(e) =>
              setNewUser({
                ...newUser.description,
                description: e.target.value,
              })
            }
            placeholder="Expliquez nous votre projet"
          />
          <button className="btn-login" type="submit">
            Envoyez
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
