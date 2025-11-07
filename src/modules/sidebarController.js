import ProjectController from "./projectController";

const SidebarController = (()=>{
    const sidebar = document.querySelector(".sidebar");

    const render = ()=>{
        const sidebarHeader = document.createElement("div");
        sidebar.textContent = "Placeholder";

        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "Add Task";
        
        const inbox = document.createElement("button");
        inbox.textContent = "Inbox";

        const myProjects = document.createElement("div");
        myProjects.classList.add("myProjects");
        const myProjectsHeader = document.createElement("button");
        myProjectsHeader.textContent = "My projects";
        myProjects.appendChild(myProjectsHeader)

        const projects = ProjectController.getProjects();
        for(let project of projects){
            const projectButton = document.createElement("button");
            projectButton.textContent = project.getName();
            myProjects.appendChild(projectButton);
        }
    
        
        sidebar.appendChild(sidebarHeader);
        sidebar.appendChild(addTaskBtn);
        sidebar.appendChild(inbox);
        sidebar.appendChild(myProjects)
    }


    return {
        render,
    }
})();

export default SidebarController;
