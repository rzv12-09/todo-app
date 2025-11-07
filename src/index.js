import "./reset.css"
import "./style.css";
import ProjectController from "./modules/projectController.js";
import SidebarController from "./modules/sidebarController.js";

window.ProjectController = ProjectController;
window.SidebarController = SidebarController;
SidebarController.render();