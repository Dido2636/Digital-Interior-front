// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function MediaUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
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
//     console.log(e.target.files[0]);
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("mediaType", selectedImage);
//     formData.append("title", title);
//     formData.append("description", description);
//     console.log(selectedImage, title, description);
//     try {
//       const response = await axios.post(
//         "http://localhost:6789/media/create-media",
//         formData,
//         { headers: { "Content-Type": "multipart/formdata" } }
//       );
//       console.log(response);
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
//         `http://localhost:6789/media//update-media/${mediaId}`,
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
//             <input type="file" name="mediaType" onChange={handleImageChange} />
//             <button type="submit">Poster fichier</button>
//           </form>
//         ) : null}
//       </div>
//       <h1>VOS DOCUMENTS</h1>
//       <div className="container-grid">
//         {allImage == null
//           ? ""
//           : allImage.map((image) => {
//               return (
//                 <div className="card" key={image._id}>
//                   <img src={`http://localhost:6789/${image}`} height={400} width={400} />
//                   <h4>{image.title}</h4>
//                   <button onClick={() => handleUpdateTitle(image._id, title)}>
//                     Update
//                   </button>
//                   <h4>{image.description}</h4>
//                   <button
//                     onClick={() =>
//                       handleUpdateDescription(image._id, description)
//                     }
//                   >
//                     Update
//                   </button>

//                   {decoratorData ? (
//                     <div className="btn-all">
//                       <input
//                         type="text"
//                         placeholder="Nouveau titre"
//                         onChange={(e) => setTitle({ ...title, title: title.newTitle + ' ' + e.target.value })}
//                         value={image.newTitle}
//                       />

//                       <input
//                         type="text"
//                         placeholder="Nouvelle description"
//                         onChange={(e) => setDescription(e.target.value)}

//                       />

//                       <br />
//                       <button
//                         className="btn-delete"
//                         onClick={() => deleteMedia(image._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ) : null}
//                 </div>
//               );
//             })}
//       </div>
//     </>
//   );
// }

// export default MediaUpload;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MediaUpload() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allImage, setAllImage] = useState(null);
  const navigate = useNavigate();
  const decoratorData = JSON.parse(sessionStorage.getItem("decorator"));

  useEffect(() => {
    getAllImage();
  }, []);

  const getAllImage = async () => {
    const result = await axios.get("http://localhost:6789/media/allmedia");
    console.log(result.data);
    setAllImage(result.data);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setSelectedImage(e.target.files);
  };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for (const file of selectedImage) {
  //     formData.append("mediaType", file);
  //   }
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   console.log(selectedImage, title, description);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:6789/media/create-media",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     console.log("response", response.data);
  //     if (response.data && response.data.mediaType) {
  //       const filename = response.data.mediaType;
  //       setAllImage([filename]);
  //     } else {
  //       console.error("La réponse du serveur est incorrecte ou vide");
  //     }
  //     navigate("/decorators/espace-creation");
  //     getAllImage();
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of selectedImage) {
      formData.append("mediaType", file);
    }
    formData.append("title", title);
    formData.append("description", description);
    console.log(selectedImage, title, description);
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
      navigate("/decorators/espace-creation");
      getAllImage();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  const deleteMedia = async (mediaId) => {
    const result = await axios.delete(
      `http://localhost:6789/media/delete/${mediaId}`
    );
    getAllImage();
  };

  const updateMedia = async (mediaId, newData) => {
    try {
      const response = await axios.put(
        `http://localhost:6789/media//update-media/${mediaId}`,
        newData
      );
      console.log("Updated media:", response.data);
      getAllImage();
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
            <input type="file" name="mediaType" onChange={handleImageChange} />
            <button type="submit">Poster fichier</button>
          </form>
        ) : null}
      </div>
      <h1>VOS DOCUMENTS</h1>
      <div className="container-grid">
        {allImage == null
          ? ""
          : allImage.map((image) => {
              return (
                <div className="card" key={image._id}>
                  <img
                    src={`http://localhost:6789/${image.mediaType}`}
                    height={400}
                    width={400}
                  />
                  <h4>{image.title}</h4>
                  <button onClick={() => handleUpdateTitle(image._id, title)}>
                    Update
                  </button>
                  <h4>{image.description}</h4>
                  <button
                    onClick={() =>
                      handleUpdateDescription(image._id, description)
                    }
                  >
                    Update
                  </button>

                  {decoratorData ? (
                    <div className="btn-all">
                      <input
                        type="text"
                        placeholder="Nouveau titre"
                        onChange={(e) =>
                          setTitle({
                            ...title,
                            title: title.newTitle + " " + e.target.value,
                          })
                        }
                        value={image.newTitle}
                      />

                      <input
                        type="text"
                        placeholder="Nouvelle description"
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <br />
                      <button
                        className="btn-delete"
                        onClick={() => deleteMedia(image._id)}
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
