import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdLog.css';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [tags, setTags] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projects, setProjects] = useState([]); // Storing the projects
  const [notification, setNotification] = useState(null); // State for notifications
  const [cloudinaryReady, setCloudinaryReady] = useState(false);

  // Load Cloudinary script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.onload = () => setCloudinaryReady(true);  // Set cloudinaryReady to true after the script loads
    document.body.appendChild(script);

    // Cleanup: remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!cloudinaryReady) {
      console.error('Cloudinary could not be loaded!');
      return;
    }

    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dbbtdnneh', // Cloudinary cloud name
        uploadPreset: 'farhadsultan', // Cloudinary upload preset
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: true,
        croppingAspectRatio: 1,
        clientAllowedFormats: ['jpeg', 'jpg', 'png', 'gif'],
        multiple: false,
        maxFileSize: 5000000,
      },
      (error, result) => {
        if (result.event === 'success') {
          console.log('Image Uploaded:', result.info.secure_url);
          setImgFile(result.info.secure_url); // Store uploaded image URL in imgFile state
        }
      }
    );

    cloudinaryWidget.open();
  };

  // Update GitHub projects.json file
  const updateGitHubProjects = async (projects) => {
    const apiUrl = 'https://api.github.com/repos/ferhadsultan98/infos/contents/projects.json';
    const token = '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'; // Use your GitHub token here
    const sha = await getProjectsSha(); // Get the sha value of projects.json
    const base64Content = btoa(generateProjectsContent(projects)); // Convert content to Base64

    try {
      const response = await axios.put(
        apiUrl,
        {
          message: 'Project details updated',
          content: base64Content,
          sha: sha,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('projects.json successfully updated:', response.data);
      showNotification('projects.json successfully updated!', 'success');
    } catch (error) {
      console.error('Error updating GitHub projects.json:', error);
      showNotification('Error updating GitHub projects.json.', 'error');
    }
  };

  // Generate content for projects.json file
  const generateProjectsContent = (projects) => {
    const formattedProjects = projects.map((project, index) => ({
      [`Project ${index + 1}`]: {
        title: project.title,
        description: project.description,
        imgSrc: project.imgSrc,
        tags: project.tags,
        githubLink: project.githubLink,
      },
    }));

    return JSON.stringify(formattedProjects, null, 2);
  };

  // Get SHA value of projects.json file
  const getProjectsSha = async () => {
    const apiUrl = 'https://api.github.com/repos/ferhadsultan98/infos/contents/projects.json';
    const token = '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'; // Use your GitHub token here

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      return response.data.sha;
    } catch (error) {
      console.error('Error getting SHA value of projects.json:', error);
    }
  };

  // Add a new project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imgFile) {
      try {
        // Create a new project object
        const newProject = {
          title,
          description,
          imgSrc: imgFile, // Using Cloudinary URL
          tags: tags.split(','), // Splitting tags by comma
          githubLink,
        };

        // Update project list
        const updatedProjects = [...projects, newProject]; // Combine new project with current projects
        setProjects(updatedProjects);

        // Update GitHub projects.json file
        updateGitHubProjects(updatedProjects);

        // Reset the form
        setTitle('');
        setDescription('');
        setImgFile(null);
        setTags('');
        setGithubLink('');
      } catch (error) {
        console.error('An error occurred:', error);
        showNotification('An error occurred.', 'error');
      }
    } else {
      showNotification('Please upload an image.', 'error');
    }
  };

  // Clear GitHub projects.json file
  const clearGitHubProjects = async () => {
    const apiUrl = 'https://api.github.com/repos/ferhadsultan98/infos/contents/projects.json';
    const token = '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'; // Use your GitHub token here
    const sha = await getProjectsSha(); // Get the sha value of projects.json

    try {
      const response = await axios.put(
        apiUrl,
        {
          message: 'projects.json cleared',
          content: btoa('[]'), // Clear the projects.json content
          sha: sha,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log('projects.json successfully cleared:', response.data);
      setProjects([]); // Clear project list
      showNotification('projects.json successfully cleared.', 'success');
    } catch (error) {
      console.error('Error clearing GitHub projects.json:', error);
      showNotification('Error clearing GitHub projects.json.', 'error');
    }
  };

  // Show notification function
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null); // Remove notification after 3 seconds
    }, 3000);
  };

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type} show`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className='AdminPanel'>
        <h1>FARHAD SULTAN ADMIN PANEL</h1>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <button type="button" onClick={uploadImageToCloudinary}>Upload Image</button>
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div>
          <label>GitHub Link:</label>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Project</button>
      </form>
      <button onClick={clearGitHubProjects} className='cleargithub'>
        Clear GitHub projects.json
      </button>
    </div>
  );
};

export default AdminPanel;
