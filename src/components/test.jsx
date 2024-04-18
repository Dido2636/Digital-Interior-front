import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./Card";

function MediaUpload() {
  const [allMedia, setAllMedia] = useState([]);  // stocker tous les médias et commentaires

  useEffect(() => {
    getAllMedia();
  }, []);

  const getAllMedia = async () => {
    try {
      const response = await axios.get("http://localhost:6789/media/allmedia");
      const mediaData = response.data.map((media) => ({
        ...media,
        createAt: new Date(media.createAt),
        commentaire: media.commentaire.map((comment) => ({
          ...comment,
          // Supposons que 'author' est le champ renvoyé par l'API pour le nom de l'utilisateur
          authorName: comment.author  // Adapté selon la structure de vos données
        }))
      })).sort((a, b) => b.createAt - a.createAt);
      setAllMedia(mediaData);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  return (
    <>
      <div className="container-grid">
        {allMedia && allMedia.map((media, index) => (
          <div className="container" key={index}>
            <Link className="link-card" to={`/decorators/espace-creation/${media._id}`}>
              <Card imageMedia={media.imageMedia} title={media.title} description={media.description} />
            </Link>
            <div className="comment-list">
              {media.commentaire && media.commentaire.map((comment) => (
                <div key={comment._id} className="box-one-comment">
                  <strong>{comment.authorName}</strong>: {comment.commentaire} {/* Affichage du nom de l'utilisateur avec son commentaire */}
                  <button onClick={() => deleteComment(media._id, comment._id)}>X</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MediaUpload;
