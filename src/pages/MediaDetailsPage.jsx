import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MediaDetailsPage() {
  const [media, setMedia] = useState([]);
  const [sousDescription, setSousDescription] = useState("");
  const [comments, setComments] = useState([]);

  const { mediaId } = useParams();

  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  useEffect(() => {
    getOneMedia();
    getAllComment();
  }, []);

  const getAllComment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6789/comment/allcomment"
      );
      console.log(response.data);
      setCommentaire(response.data);
    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  };

  const getOneMedia = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6789/media/${mediaId}`
      );
      console.log(response.data);
      setMedia(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const updateMedia = async (mediaId, newData) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);
      if (!token) {
        throw new Error("Token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:6789/media/update-media/${mediaId}`,
        newData,
        config
      );
      console.log("Updated media:", response.data);
      getAllMedia();
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const handleUpdateSousDescription = (mediaId, newSousDescription) => {
    updateMedia(mediaId, { sousDescription: newSousDescription });
    window.location.reload();
  };

  return (
    <div className="section-details">
      <>
        <div className="box-img-details">
          <img
            className="img-details"
            src={`http://localhost:6789/${media.imageMedia}`}
          />
        </div>
        {/* <div className="box-btn-pdf">
          <button className="btn-pdf">Voir le projet detaillé</button>
        </div> */}

        <div className="container-details">
          <h1>{media.title}</h1>
          <p className="description-details">{media.description}</p>

          {decoratorData ? (
            <div className="update-description">
              <textarea
                type="text"
                className="input-update-details"
                placeholder="Copiez le texte de votre projet"
                onChange={(e) => setSousDescription(e.target.value)}
              />
              <button
                className="btn-update-details"
                onClick={() =>
                  handleUpdateSousDescription(mediaId, sousDescription)
                }
              >
                Update
              </button>
            </div>
          ) : null}

          <p className="text-sousDescription">{media.sousDescription}</p>
        </div>
        <div className="comment-section">
          <h2>Commentaires</h2>
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.commentaire}</p>
              <p className="author">{comment.author}</p>
            </div>
          ))}
        </div>
        <div className="box-btn-view-details">
          {media.viewUrl && (
            <button
              className="btn-view-details"
              onClick={() => {
                window.open(media.viewUrl, "_blank");
              }}
            >
              Votre view 360°
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export default MediaDetailsPage;
