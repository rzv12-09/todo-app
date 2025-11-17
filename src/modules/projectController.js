import Project from "./project.js";

const ProjectController = (() => {
  const projectList = [];

  const addProject = (name) => {
    const project = new Project(name);
    projectList.push(project);
  };

  const deleteProject = (id) => {
    const projectIndex = projectList.findIndex((project) => project.id == id);
    projectList.splice(projectIndex, 1);
  };

  const getProjects = () => {
    return projectList;
  };

  const findProjectById = (id) => {
    return projectList.find((project) => project.id === id);
  };

  addProject("Inbox");

  return {
    addProject,
    deleteProject,
    getProjects,
    findProjectById,
  };
})();

export default ProjectController;
