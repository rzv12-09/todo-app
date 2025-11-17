import "./reset.css";
import "./style.css";
import ProjectController from "./modules/projectController.js";
import SidebarController from "./modules/sidebarController.js";
import ContentController from "./modules/contentController.js";
import StorageController from "./modules/storageController.js";

window.ProjectController = ProjectController;
window.SidebarController = SidebarController;
StorageController.restoreProjects();
SidebarController.render();
SidebarController.bindEvents();
ContentController.renderProjectTasks(ProjectController.getProjects()[0]);
ContentController.bindEvents();
