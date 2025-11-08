import ProjectController from "./projectController";
import ModalController from "./modalController";

const SidebarController = (()=>{
    const sidebar = document.querySelector(".sidebar");

    const render = ()=>{
        const sidebarHeader = document.createElement("div");
        sidebar.textContent = "Placeholder";

        const addTaskBtn = document.createElement("button");
        addTaskBtn.id = "newTask";
        addTaskBtn.textContent = "Add Task";
        
        const inbox = document.createElement("button");
        inbox.textContent = "Inbox";

        const myProjects = document.createElement("div");
        myProjects.classList.add("myProjects");
        const myProjectsHeader = document.createElement("button");
        myProjectsHeader.textContent = "My projects (Add New)";
        myProjectsHeader.id = "newProject";

        myProjects.appendChild(myProjectsHeader)

        const projects = ProjectController.getProjects();
        for(let project of projects){
            if(project.getName() === "Inbox") continue;

            const projectButton = document.createElement("button");
            projectButton.textContent = project.getName();
            projectButton.dataset.id = project.getId();
            myProjects.appendChild(projectButton);
        }
    
        sidebar.appendChild(sidebarHeader);
        sidebar.appendChild(addTaskBtn);
        sidebar.appendChild(inbox);
        sidebar.appendChild(myProjects)
    }

    const bindEvents= () =>{
        sidebar.addEventListener("click",(e)=>{
            if(e.target.id === "newProject") {
                ModalController.handleNewProject();
            }
            if(e.target.id === "newTask"){
                ModalController.handleNewTask();
            }
        })
    }


    return {
        render,
        bindEvents,
    }
})();

export default SidebarController;
