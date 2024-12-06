import React, { useEffect, useState } from "react";
import axios from "axios";
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    // Fetch initial data
    fetchProjects();
    
    // Set up an interval to fetch data every minute
    const interval = setInterval(() => {
      fetchProjects();
    }, 60000);  // Fetch data every minute

    // Cleanup function for the useEffect to clear the interval
    return () => clearInterval(interval);
  }, []);

  // Function to fetch projects from GitHub
  const fetchProjects = async () => {
    setLoading(true);  // Activate loading state while data is being fetched
    setError(null); // Reset error state

    try {
      const response = await axios.get("https://raw.githubusercontent.com/ferhadsultan98/infos/main/projects.json");
      const projectData = extractProjectsFromJson(response.data);  // Process the JSON data
      setProjects(projectData); // Store the projects in state
    } catch (error) {
      console.error("Error fetching project data:", error);
      setError("Failed to fetch projects."); // Set error message in state
    } finally {
      setLoading(false);  // Data fetching is complete, turn off loading
    }
  };

  // Function to extract project details from the JSON response
  const extractProjectsFromJson = (jsonData) => {
    return jsonData.map((projectItem) => {
      const project = projectItem[Object.keys(projectItem)[0]];
      const { title, description, imgSrc, tags, githubLink } = project;
      return { title, description, imgSrc, tags, githubLink };
    });
  };

  return (
    <div className="ProjeBody">
      <h1>Projects</h1>
      <div className="project-separator"></div>
      
      {/* Show loading or error message */}
      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}

      {/* Render projects if available */}
      <div className="card-container">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="card">
              <div className="card-main">
                {project.imgSrc && <img src={project.imgSrc} alt={project.title} />}
              </div>
              <div className="card-hover">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <div className="tags">
                  {project.tags && project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
