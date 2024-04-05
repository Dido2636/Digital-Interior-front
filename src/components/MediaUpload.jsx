import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";

function MediaUpload() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [viewUrl, setViewUrl] = useState("");
  const [allMedia, setAllMedia] = useState(null);
  const navigate = useNavigate();
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  useEffect(() => {
    getAllMedia();
  }, []);

  const getAllMedia = async () => {
    try {
      const response = await axios.get("http://localhost:6789/media/allmedia");
      console.log(response.data);
      setAllMedia(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const handleMedia = (e) => {
    console.log(e.target.files);
    setSelectedMedia(e.target.files);
  };

  // const handleView = (e) => {
  //   setViewUrl();
  //   window.location.reload();
  // };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of selectedMedia) {
      formData.append("mediaType", file);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("viewUrl", viewUrl);
    console.log(selectedMedia, title, description, viewUrl);
    try {
      const response = await axios.post(
        "http://localhost:6789/media/create-media",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("response", response.data);
      if (response.data && response.data.media) {
        const mediaData = response.data.media;
        console.log("Média créé avec succès :", mediaData);
      } else {
        console.error("La réponse du serveur est incorrecte ou vide");
      }
      window.location.reload();
      navigate("/decorators/espace-creation");
      getAllMedia();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteMedia = async (mediaId) => {
    try {
      const response = await axios.delete(
        `http://localhost:6789/media/delete/${mediaId}`
      );
      console.log(response.data);
      getAllMedia();
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const updateMedia = async (mediaId, newData) => {
    try {
      const response = await axios.put(
        `http://localhost:6789/media/update-media/${mediaId}`,
        newData
      );
      console.log("Updated media:", response.data);
      getAllMedia();
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const handleUpdateTitle = (mediaId, newTitle) => {
    updateMedia(mediaId, { title: newTitle });
  };

  const handleUpdateDescription = (mediaId, newDescription) => {
    updateMedia(mediaId, { description: newDescription });
  };

  const handleUpdateView = async (mediaId, newView) => {
    updateMedia(mediaId, { viewUrl: newView });
    setViewUrl(newView);
    window.location.reload();
  };
  return (
    <>
      <div className="container-form">
        {decoratorData ? (
          <form
            enctype="multipart/form-data"
            onSubmit={handleUpload}
            className="form-user"
          >
            <input
              className="input-field"
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Lien 360°"
              value={viewUrl}
              onChange={(e) => setViewUrl(e.target.value)}
            />
            <input type="file" name="mediaType" onChange={handleMedia} />
            <button type="submit">Poster fichier</button>
          </form>
        ) : null}
      </div>
      <h1>VOTRE PROJET</h1>
      <div className="container-grid">
        {allMedia == null
          ? ""
          : allMedia.map((media, index) => {
              return (
                <div className="card" key={index}>
                  <Link
                    className="link-card"
                    to={`/decorators/espace-creation/${media._id}`}
                  >
                    <Card
                      key={index}
                      mediaType={media.mediaType}
                      title={media.title}
                      description={media.description}
                    />
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
                  {/* viewUrl={media.viewUrl} */}
                  {/* <img
                        className="img-card"
                        src={`http://localhost:6789/${image.mediaType}`}
                      /> */}

                  {/* <div className="box-infos">
                      <h4 className="card-title"></h4>

                      <div className="box-second">
                        <p className="card-description"></p>

                        
                      </div> */}

                  {decoratorData ? (
                    <div className="box-update">
                      <div className="update-title">
                        <input
                          type="text"
                          placeholder="Nouveau Titre"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdateTitle(media._id, title)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="update-description">
                        <input
                          type="text"
                          placeholder="Nouvelle description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleUpdateDescription(media._id, description)
                          }
                        >
                          Update
                        </button>
                      </div>

                      <div className="update-description">
                        <div>
                          <input
                            type="text"
                            placeholder="Lien Url 360°"
                            onChange={(e) => setViewUrl(e.target.value)}
                          />
                          <button
                            onClick={() => handleUpdateView(media._id, viewUrl)}
                          >
                            Update View
                          </button>
                        </div>

                        <button
                          className="btn-delete"
                          onClick={() => deleteMedia(media._id)}
                        >
                          Delete
                        </button>
                      </div>
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function MediaUpload() {
//   const [selectedImage, setSelectedImage] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [viewUrl, setViewUrl] = useState("");
//   const [allImage, setAllImage] = useState(null);
//   const navigate = useNavigate();
//   const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

//   useEffect(() => {
//     getAllImage();
//   }, []);

//   const getAllImage = async () => {
//     const result = await axios.get("http://localhost:6789/media/allmedia");
//     console.log(result.data);
//     setAllImage(result.data);
//   };

//   const handleImageChange = (e) => {
//     console.log(e.target.files);
//     setSelectedImage(e.target.files);
//   };

//   const handleView = (e) => {
//     setViewUrl();
//     window.location.reload();
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const file of selectedImage) {
//       formData.append("mediaType", file);
//     }
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("viewUrl", viewUrl);
//     console.log(selectedImage, title, description, viewUrl);
//     try {
//       const response = await axios.post(
//         "http://localhost:6789/media/create-media",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log("response", response.data);
//       if (response.data && response.data.media) {
//         const mediaData = response.data.media;
//         console.log("Média créé avec succès :", mediaData);
//       } else {
//         console.error("La réponse du serveur est incorrecte ou vide");
//       }
//       window.location.reload()
//       navigate("/decorators/espace-creation");
//       getAllImage();
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const deleteMedia = async (mediaId) => {
//     const result = await axios.delete(
//       `http://localhost:6789/media/delete/${mediaId}`
//     );
//     getAllImage();
//   };

//   const updateMedia = async (mediaId, newData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:6789/media/update-media/${mediaId}`,
//         newData
//       );
//       console.log("Updated media:", response.data);
//       getAllImage();
//     } catch (error) {
//       console.error("Error updating media:", error);
//     }
//   };

//   const handleUpdateTitle = (mediaId, newTitle) => {
//     updateMedia(mediaId, { title: newTitle });
//   };

//   const handleUpdateDescription = (mediaId, newDescription) => {
//     updateMedia(mediaId, { description: newDescription });
//   };

//   const handleUpdateView = async (mediaId, newView) => {
//     updateMedia(mediaId, { viewUrl: newView });
//     setViewUrl(newView);
//     window.location.reload();
//   };
//   return (
//     <>
//       <div className="container-form">
//         {decoratorData ? (
//           <form
//             enctype="multipart/form-data"
//             onSubmit={handleUpload}
//             className="form-user"
//           >
//             <input
//               className="input-field"
//               type="text"
//               placeholder="Titre"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <input
//               className="input-field"
//               type="text"
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//               className="input-field"
//               type="text"
//               placeholder="Lien 360°"
//               value={viewUrl}
//               onChange={(e) => setViewUrl(e.target.value)}
//             />
//             <input type="file" name="mediaType" onChange={handleImageChange} />
//             <button type="submit">Poster fichier</button>
//           </form>
//         ) : null}
//       </div>
//       <h1>VOTRE PROJET</h1>
//       <div className="container-grid">
//         {allImage == null
//           ? ""
//           : allImage.map((image) => {
//               return (
//                 <div key={image._id}>
//                   <div className="card">
//                     <Link to={`/decorators/espace-creation/${image._id}`}>
//                       <img
//                         className="img-card"
//                         src={`http://localhost:6789/${image.mediaType}`}
//                       />
//                     </Link>
//                     <div className="box-infos">
//                       <h4 className="card-title">{image.title}</h4>

//                       <div className="box-second">
//                         <p className="card-description">{image.description}</p>

//                         <button
//                           className="btn-view"
//                           onClick={() => {
//                             window.open(image.viewUrl, viewUrl, "_blank");
//                           }}
//                         >
//                           View 360°
//                         </button>
//                       </div>

//                       {decoratorData ? (
//                         <div className="box-update">
//                           <div className="update-title">
//                             <input
//                               type="text"
//                               placeholder="Nouveau Titre"
//                               onChange={(e) => setTitle(e.target.value)}
//                             />
//                             <button
//                               onClick={() =>
//                                 handleUpdateTitle(image._id, title)
//                               }
//                             >
//                               Update
//                             </button>
//                           </div>
//                           <div className="update-description">
//                             <input
//                               type="text"
//                               placeholder="Nouvelle description"
//                               onChange={(e) => setDescription(e.target.value)}
//                             />
//                             <button
//                               onClick={() =>
//                                 handleUpdateDescription(image._id, description)
//                               }
//                             >
//                               Update
//                             </button>
//                           </div>

//                           <div className="update-description">
//                             <div>
//                               <input
//                                 type="text"
//                                 placeholder="Lien Url 360°"
//                                 onChange={(e) => setViewUrl(e.target.value)}
//                               />
//                               <button
//                                 onClick={() =>
//                                   handleUpdateView(image._id, viewUrl)
//                                 }
//                               >
//                                 Update View
//                               </button>
//                             </div>

//                             <button
//                               className="btn-delete"
//                               onClick={() => deleteMedia(image._id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//       </div>
//     </>
//   );
// }

// export default MediaUpload;
