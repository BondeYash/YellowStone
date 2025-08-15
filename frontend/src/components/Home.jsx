import React, { useState, useEffect } from "react";
import CreateProjectModal from "./CreateProjectModal";
import axios from "../../.config/axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        console.log(res);
        setProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      });
  }, []);

  const handleProjectCreate = (projectName) => {
    console.log("Project name submitted:", projectName);
    // TODO: Add API call to create a project
  };

  return (
    <div>
      <Navbar />

      {/* New Project Button */}
      <button
        className="bg-slate-600 text-white px-4 py-2 rounded-md cursor-pointer m-5"
        onClick={() => setIsModalOpen(true)}
      >
        <i className="ri-link"></i> <span> New Project </span>
      </button>

      {/* Project List */}
      <div className="flex m-2 flex-wrap gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() =>
                navigate(`/project`, {
                  state: { projectId: project._id }, // Pass only ID
                })
              }
              className="project p-4 rounded-sm bg-slate-600 border-2 text-white text-xl min-w-[200px] hover:bg-slate-500 cursor-pointer"
            >
              <h2>{project.name}</h2>
              <div className="flex mt-2">
                <h2>
                  <small>Collaborators: </small>
                  <i className="ri-user-line"></i>{" "}
                  {Array.isArray(project.users) ? project.users.length : 0}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white m-5">No projects found</p>
        )}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProjectCreate}
      />
    </div>
  );
};

export default Home;
