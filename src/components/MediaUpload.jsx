// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function MediaUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [allImage, setAllImage] = useState(null);
//   // const [imageUrl, setImageUrl] = useState(null);
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
//       // console.log("Image Uploaded:", response.data.imageUrl);
//       // setImageUrl(response.data.imageUrl);
//       navigate("/decorators/espace-creation");
//       getAllImage();
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const deleteMedia = async (mediaId) => {
//     const result = await axios.delete(`http://localhost:6789/media/delete/${mediaId}`);
//     getAllImage();
//   };

//   return (
//     <>
//       <div>
//         {decoratorData ? (
          
//           <form enctype="multipart/form-data" onSubmit={handleUpload} className="form-user">
            
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
//             <button type="submit" >Poster fichier</button>
//           </form>
//         ) : null}
//       </div>
//       <h1>VOS DOCUMENTS</h1>
//       <div className="container">
//       {allImage == null
//         ? ""
//         : allImage.map((image) => {
//             return (
//               <div className="card" key={image._id}>
//                 <img
//                   src={image.mediaType}
//                   height={300}
//                   width={300}
//                 />
//                 <h4>{image.title}</h4>
//                 <h4>{image.description}</h4>

//                 {decoratorData ? (
//                 <div className="btn-all">
//                 <button className="btn-delete">Modifier</button>
//                 <button className="btn-delete"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   deleteMedia(image._id);
//                 }}
//               >
//                 Delete
//               </button>
//               </div>
//              ) : null}

//               </div>
//             );
//           })}
//           </div>
//     </>
//   );
// }
// export default MediaUpload;

// Importer useState
// Importer useState
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MediaUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
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
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mediaType", selectedImage);
    formData.append("title", title);
    formData.append("description", description);
    console.log(selectedImage, title, description);
    try {
      const response = await axios.post(
        "http://localhost:6789/media/create-media",
        formData,
        { headers: { "Content-Type": "multipart/formdata" } }
      );
      console.log(response);
      navigate("/decorators/espace-creation");
      getAllImage();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteMedia = async (mediaId) => {
    const result = await axios.delete(`http://localhost:6789/media/delete/${mediaId}`);
    getAllImage();
  };

  const updateMedia = async (mediaId, newTitle, newDescription) => {
    try {
      const response = await axios.put(
        `http://localhost:6789/media//update-media/${mediaId}`,
        { title: newTitle, description: newDescription }
      );
      console.log("Updated media:", response.data);
      getAllImage();
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  return (
    <>
      <div>
        {decoratorData ? (
          <form enctype="multipart/form-data" onSubmit={handleUpload} className="form-user">
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
      <div className="container">
        {allImage == null
          ? ""
          : allImage.map((image) => {
              return (
                <div className="card" key={image._id}>
                  <img
                    src={image.mediaType}
                    height={400}
                    width={400}
                  />
                  <h4>{image.title}</h4>
                  <h4>{image.description}</h4>
                  {decoratorData ? (
                    <div className="btn-all">
                      <input
                        type="text"
                        placeholder="Nouveau titre"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Nouvelle description"
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <button
                        onClick={() => updateMedia(image._id, title, description)}
                      >
                        Update
                      </button>
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
