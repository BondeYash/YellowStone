import React, { useState } from 'react';
import axios from '../../.config/axios'

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/projects/create' , {
      name : projectName
    })
    .then(response => {
      console.log('Project created:', response.data);
      onSubmit(projectName);
      setProjectName('');
      onClose();
    })
    .catch(error => {
      console.error('Error creating project:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="text-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm mb-1">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
