import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MediaUpload from "./MediaUpload";

function ProjectDetails() {
  const [email, setEmail] = useState("");
  const { id, title } = useParams();

  const inviteUser = async (e) => {
    e.preventDefault();

    try {
      const requestData = { email: email }; // Assurez-vous que requestData est correctement formaté
      const response = await axios.post(
        `http://localhost:6789/projects/${id}/invite-users`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Gestion de la réponse si nécessaire
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'invitation de l'utilisateur :", error);
      // Gestion des erreurs si nécessaire
    }
  };

  return (
    <div>
      <p>Titre : {title}</p>
      <p>Détails du projet pour l'ID de projet : {id}</p>

      <form className="form-upload" onSubmit={inviteUser}>
        <label>Email du client à inviter</label>
        <input
          className="input-field-upload"
          type="text"
          placeholder="Email du client"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-delete" type="submit">
          ENVOYER
        </button>
      </form>
      <MediaUpload projectId={id}/>

      {/* Inclure ici le composant MediaUpload si nécessaire */}
    </div>
  );
}

export default ProjectDetails;
