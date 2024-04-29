import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProjectList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [allProject, setAllProject] = useState([]);
  const [error, setError] = useState(""); // Ajout de l'état pour gérer les erreurs

  const decorator = JSON.parse(sessionStorage.getItem("decorator"));

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6789/projects/all-projects"
      );
      console.log(response.data);
      // Filtrer les projets par ID du décorateur
      // const projectsFilteredByDecorator = response.data.filter(
      //   (project) => project.decorator === decorator
      // );

      // setProject(projectsFilteredByDecorator);
      setAllProject(response.data)
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const getAllMedia = async () => {
    try {
      
      
    } catch (error) {
      
    }
  }

  const handleProject = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!title) {
      setError("Veuillez ajouter un titre et une adresse email !");
      return;
    }

    const requestData = {
      title: title,
      description: description,
      author: decorator.userData.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:6789/projects/create-project",
        requestData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      console.log(response.data);
      console.log(response.data.author);

      setTitle("");
      setDescription("");
      // setAuthor("")
    

      // Met à jour la liste de projets avec la réponse de l'API
      setAllProject([...allProject, response.data]);
    } catch (error) {
      console.error("Erreur lors de la soumission du projet :", error);
    }
  };

  return (
    <div>
      
        <div>
          <h1>Formproject</h1>
          <form
            encType="multipart/form-data"
            onSubmit={handleProject}
            className="form-upload"
          >
            <label>Titre</label>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>description</label>
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <label>Author</label>
            <input
              type="text"
              placeholder="votre email"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            /> */}
            {error && <p>{error}</p>} {/* Affichage de l'erreur */}
            <button className="btn-fichier" type="submit">
              New Project
            </button>
          </form>
        </div>
    

      <div className="grid-projectlist">
        {allProject.map((project, index) => (
          <div className="grid-project" key={index}>
            <Link to={`/project/${project._id}`} className="btn-project">
              {project.title}
            </Link>
            <p>{project.description}</p>
            <p>{project.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
