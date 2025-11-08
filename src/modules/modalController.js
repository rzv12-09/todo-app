import ProjectController from "./projectController";
import SidebarController from "./sidebarController";

const ModalController = (()=>{
    const dialog = document.createElement("dialog");
    document.querySelector("body").appendChild(dialog);
  
    const handleNewProject = ()=>{
        dialog.innerHTML = ``;
        const title = document.createElement("div");
        title.textContent = "Project Name";
        const input = document.createElement("input");
        const okBtn = document.createElement("button");
        okBtn.textContent = "OK";

        dialog.appendChild(title);
        dialog.appendChild(input);
        dialog.appendChild(okBtn);
        dialog.showModal();

        okBtn.addEventListener("click", ()=>{
            ProjectController.addProject(input.value);
            dialog.close();
            SidebarController.render();
        })
    }

    const handleNewTask = () =>{
        dialog.innerHTML = ``;
        const nameInput = document.createElement("input");
        nameInput.placeholder = "Task name";

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.min = today;

        const projectComboBox = document.createElement("div");
        const label = document.createElement("label");
        label.for = "project-select";
        projectComboBox.appendChild(label);
        const select = document.createElement("select");
        select.name = "projects";
        select.id = "project-select";

        const projectList = ProjectController.getProjects();
        for(let project of projectList){
            const option = document.createElement("option");
            option.textContent = project.getName();
            option.value = project.getId();

            if (project.name === 'Inbox') {
                option.selected = true;
              }

            select.appendChild(option);
        }
        projectComboBox.appendChild(select);
        
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click",()=>{
            dialog.close();
        })

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add task";
        addBtn.addEventListener("click",()=>{
            const projectId = select.value;
            const name = nameInput.value;
            const desc = descriptionInput.value;
            const dueDate = dueDateInput.value;
            ProjectController.findProjectById(projectId).addTask(name,desc,dueDate,"none");
            dialog.close();
        })


        dialog.appendChild(nameInput);
        dialog.appendChild(descriptionInput);
        dialog.appendChild(dueDateInput);
        dialog.appendChild(projectComboBox);
        dialog.appendChild(cancelBtn);
        dialog.appendChild(addBtn);
        dialog.showModal();
    }

    return {
        handleNewProject,
        handleNewTask
    }
})();

export default ModalController;