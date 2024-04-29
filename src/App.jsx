import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import DecoratorRegisterPage from "./pages/DecoratorRegisterPage";
import SpaceDecorator from "./components/EspaceDecorator";
import UserSpacePage from "./pages/UserSpacePage";
import LoginUserPage from "./pages/LoginUserPage";
import DecoratorLoginPage from "./pages/DecoratorLoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import Contact from "./pages/Contact";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
const decorator = JSON.parse(sessionStorage.getItem("decorator"));

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/:id/projects" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
      
          <Route path="/contact" element={<Contact />} />
          <Route path="/users/login" element={<LoginUserPage />} />
          <Route path="/users/register" element={<RegisterUserPage />} />
          <Route path="/decorators/login" element={<DecoratorLoginPage />} />
          <Route
            path="/decorators/register"
            element={<DecoratorRegisterPage />}
          />
         
          <Route
            path="/espace-deco"
            element={<SpaceDecorator />}
          />
           
           <Route
            path="/decorators/espace-creation/:mediaId"
            element={<MediaDetailsPage />} 
          />
           
          
          <Route path="/users/espace-deco" element={<UserSpacePage />} />
        </Routes>
        <Footer/>
    
      </Router>
    </>
  );
}

export default App;


