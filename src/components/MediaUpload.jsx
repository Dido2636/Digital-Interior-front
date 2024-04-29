import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./Card";
import { IoIosSend } from "react-icons/io";

function MediaUpload({ projectId }) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [sousDescription, setSousDescription] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [viewUrl, setViewUrl] = useState("");
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    viewUrl: "",
  });
  const [originalMedia, setOriginalMedia] = useState(null);
  const [allMedia, setAllMedia] = useState(null);
  const [modal, setModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(null);

  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  useEffect(() => {
    getAllMedia();
    // getAllComment();
  }, []);

  // const getAllMedia = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:6789/media/allmedia");
  //     console.log(response.data);
  //     const mediaData = response.data
  //       .map((media) => ({
  //         ...media,
  //         createAt: new Date(media.createAt),
  //       }))
  //       .sort((a, b) => b.createAt - a.createAt);

  //     setAllMedia(mediaData);
  //     setCommentaire(mediaData);
  //     console.log(mediaData);
  //     setOriginalMedia(mediaData); // Définir originalMedia après avoir défini allMedia
  //   } catch (error) {
  //     console.error("Error fetching media:", error);
  //   }
  // };

  const getAllMedia = async () =>{
    try {
            const response = await axios.get(`http://localhost:6789/projects/${projectId}/all-media`);

            setAllMedia(response)
      
    } catch (error) {
      
    }
  }

  const handleImageMedia = (e) => {
    console.log(e.target.files);
    setSelectedImage(e.target.files);
  };

  // const handlePdfMedia = (e) => {
  //   console.log(e.target.files);
  //   setSelectedPdfMedia(e.target.files);
  // };

  // const handleView = (e) => {
  //   setViewUrl();
  //   window.location.reload();
  // };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Veuillez ajouter une catégorie !");
      return;
    }

    if (selectedImage.length === 0) {
      setError("Veuillez ajouter un fichier !");
      return;
    }

    const formData = new FormData();
    for (const file of selectedImage) {
      formData.append("imageMedia", file);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sousDescription", sousDescription);
    formData.append("viewUrl", viewUrl);

    console.log(selectedImage, title, description, viewUrl);

    try {
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (!token) {
        throw new Error("Token non trouvé");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:6789/projects/${projectId}/create-media`,
        formData,
        {
          headers: { ...config.headers, "Content-Type": "multipart/form-data" },
        }
      );

      console.log("response", response.data);
      if (response.data && response.data.media) {
        const mediaData = response.data.media;
        console.log("Média créé avec succès :", mediaData);
      } else {
        console.error("La réponse du serveur est incorrecte ou vide");
      }

      setTitle("");
      setDescription("");
      setSousDescription("");
      setViewUrl("");

      getAllMedia();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
      setError(
        "Une erreur s'est produite lors de la création du média. Veuillez réessayer."
      );
    }
  };

  // -----UPDATE-----///

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  // const openUpdateModal = (media) => {
  //   setSelectedMediaId(media._id);
  //   setUpdateData({
  //     title: media.title,
  //     description: media.description,
  //     viewUrl: media.viewUrl,
  //   });
  //   toggleModal();
  // };

  // const handleUpdateMedia = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = JSON.parse(sessionStorage.getItem("token"));
  //     console.log(token);
  //     if (!token) {
  //       throw new Error("Token not found");
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     await axios.put(
  //       `http://localhost:6789/media/update-media/${selectedMediaId}`,
  //       updateData,
  //       config
  //     );
  //     toggleModal();
  //     getAllMedia();
  //   } catch (error) {
  //     console.error("Error updating media:", error);
  //   }
  // };

  //---DELETE-----//
  // const deleteMedia = async (mediaId) => {
  //   try {
  //     const token = JSON.parse(sessionStorage.getItem("token"));
  //     console.log(token);
  //     if (!token) {
  //       throw new Error("Token not found");
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const response = await axios.delete(
  //       `http://localhost:6789/media/delete/${mediaId}`,
  //       config
  //     );
  //     console.log(response.data);
  //     getAllMedia();
  //   } catch (error) {
  //     console.error("Error fetching media:", error);
  //   }
  // };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const deleteModal = (mediaId) => {
    setSelectedMediaId(mediaId);
    toggleConfirmationModal();
  };

  const handleDeleteConfirmation = () => {
    deleteMedia(selectedMediaId);
    toggleConfirmationModal();
  };

  //---COMMENTAIRE---//

  // const getAllComment = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:6789/comment/allcomment"
  //     );
  //     console.log(response.data);
  //     setCommentaire(response.data);
  //   } catch (error) {
  //     console.error("Error fetching comment:", error);
  //   }
  // };

  // const handleCommentaire = async (media, newCommentaire, author, createAt) => {
  //   try {
  //     const token = JSON.parse(sessionStorage.getItem("token"));
  //     if (!token) {
  //       throw new Error("Token not found");
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const response = await axios.post(
  //       `http://localhost:6789/media/${media}/comment`,
  //       {
  //         commentaire: newCommentaire,
  //         author: author,
  //         createAt,
  //       },
  //       config
  //     );

  //     console.log("Commentaire ajouté à :", response.data);
  //     setCommentaire("");
  //     getAllMedia();
  //   } catch (error) {
  //     // Gérer les erreurs en conséquence
  //   }
  // };

  // const deleteComment = async (media, comment) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:6789/media/${media}/delete-comment/${comment}`
  //     );
  //     console.log(response.data);
  //     getAllMedia();
  //   } catch (error) {
  //     console.error("Error fetching media:", error);
  //   }
  // };

  const toggleComments = (mediaId) => {
    setSelectedMediaId(selectedMediaId === mediaId ? null : mediaId);
    setShowComments(selectedMediaId === mediaId ? !showComments : true);
  };

  ///----Filter----///
  const handleFilter = (filter) => {
    if (filter === "all") {
      setAllMedia(originalMedia);
    } else {
      const filteredImages = originalMedia.filter((media) =>
        media.title.includes(filter)
      );
      setAllMedia(filteredImages);
      setSelectedFilter(filter);
    }
  };

  return (
    <>
    <p>Media Upload for Project ID: {projectId}</p>
      <div className="container-form">
        {decoratorData ? (
          <form
            encType="multipart/form-data"
            onSubmit={handleUpload}
            className="form-upload"
          >
            <select
              className="input-field-upload"
              placeholder="Choix"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Choisissez une categorie*</option>
              <option value="3D">3D</option>
              <option value="IMAGE">IMAGE</option>
              <option value="PLAN">PLAN</option>
            </select>

            <input
              className="input-field-upload"
              type="text"
              placeholder="Titre"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="input-field-upload"
              type="text"
              placeholder="Expliquez votre projet"
              value={sousDescription}
              onChange={(e) => setSousDescription(e.target.value)}
            />

            <input
              className="input-field-upload"
              type="text"
              placeholder="Lien 360°"
              value={viewUrl}
              onChange={(e) => setViewUrl(e.target.value)}
            />
            <input
              type="file"
              className="input-field-upload-fichier"
              name="imageMedia"
              onChange={handleImageMedia}
            />

            <button className="btn-fichier" type="submit">
              Poster fichier
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        ) : null}
      </div>
      <h1 className="title-espace-deco">VOTRE PROJET</h1>
      <div className="container-filter">
        <button
          className={`btn-filter ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          ALL
        </button>
        <button
          className={`btn-filter ${selectedFilter === "3D" ? "active" : ""}`}
          onClick={() => handleFilter("3D")}
        >
          3D
        </button>
        <button
          className={`btn-filter ${selectedFilter === "PLAN" ? "active" : ""}`}
          onClick={() => handleFilter("PLAN")}
        >
          PLAN
        </button>

        <button
          className={`btn-filter ${selectedFilter === "IMAGE" ? "active" : ""}`}
          onClick={() => handleFilter("IMAGE")}
        >
          IMAGE
        </button>
      </div>

      <div className="container-grid">
        {allMedia &&
          allMedia.map((media, index) => {
            return (
              <div className="container" key={index}>
                <Link
                  className="link-card"
                  to={`/decorators/espace-creation/${media._id}`}
                >
                  <div className="container-card">
                    <Card
                      imageMedia={media.imageMedia}
                      title={media.title}
                      description={media.description}
                    />
                  </div>
                </Link>
                    {media.viewUrl && (
                      <button
                        className="btn-view"
                        onClick={() => {
                          window.open(media.viewUrl, "_blank");
                        }}
                      >
                        View 360°
                      </button>
                    )}

                {media._id === selectedMediaId && (
                  <>
                    <div className="comment-form">
                      <input
                        type="text"
                        className="input-comment"
                        placeholder="Laissez un Commentaire"
                        onChange={(e) => setCommentaire(e.target.value)}
                      />
                      <button
                        className="btn-delete"
                        onClick={() =>
                          handleCommentaire(media._id, commentaire)
                        }
                      >
                        <IoIosSend />
                      </button>
                    </div>
                    {media.commentaire.map((comment) => (
                      <div key={comment._id} className="box-one-comment">
                        <div className="box-comment-content">
                          <p className="name-comment">{comment.author} : </p>
                          <p className="content-comment">
                            {comment.commentaire}
                          </p>
                        </div>

                        <div className="box-createAt">
                          <p className="createAt">
                            postée le :{" "}
                            {new Date(comment.createAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </p>
                          <button
                            className="delete-comment"
                            onClick={() =>
                              deleteComment(media._id, comment._id)
                            }
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div className="comment-list">
                  <button
                    className={`modal-comment ${
                      selectedMediaId === media._id && showComments
                        ? "black-bg"
                        : "gray-bg"
                    }`}
                    onClick={() => toggleComments(media._id)}
                  >
                    {selectedMediaId === media._id && showComments
                      ? "x"
                      : "Voir les commentaires"}
                  </button>
                </div>

                {decoratorData ? (
                  <div className="box-update">
                    <button
                      className="btn-delete"
                      onClick={() => openUpdateModal(media)}
                    >
                      Update
                    </button>

                    {modal && selectedMediaId === media._id && (
                      <div className="modal-content">
                        <form
                          className="form-update"
                          onSubmit={handleUpdateMedia}
                        >
                          <select
                            className="input-update"
                            placeholder="Choix"
                            value={title}
                            onChange={(e) =>
                              setUpdateData({
                                ...updateData,
                                title: e.target.value,
                              })
                            }
                          >
                            <option value="">Choisissez une categorie</option>
                            <option value="3D">3D</option>
                            <option value="IMAGE">IMAGE</option>
                            <option value="PLAN">PLAN</option>
                          </select>
                          <input
                            type="text"
                            className="input-update"
                            placeholder="title"
                            value={updateData.description}
                            onChange={(e) =>
                              setUpdateData({
                                ...updateData,
                                description: e.target.value,
                              })
                            }
                          />

                          <input
                            type="text"
                            className="input-update"
                            placeholder="New View URL"
                            value={updateData.viewUrl}
                            onChange={(e) =>
                              setUpdateData({
                                ...updateData,
                                viewUrl: e.target.value,
                              })
                            }
                          />
                          <button className="btn-delete" type="submit">
                            Envoyer
                          </button>
                        </form>
                      </div>
                    )}

                    {showConfirmationModal && selectedMediaId === media._id && (
                      <div className="confirmation-modal">
                        <p>Voulez-vous vraiment supprimer ce post ?</p>
                        <div className="btn-choice-delete">
                          <button
                            className="btn-delete"
                            onClick={handleDeleteConfirmation}
                          >
                            Oui
                          </button>
                          <button
                            className="btn-delete"
                            onClick={toggleConfirmationModal}
                          >
                            Non
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => deleteModal(media._id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MediaUpload;
