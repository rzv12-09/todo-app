import ProjectController from "./projectController";
import SidebarController from "./sidebarController";
import ContentController from "./contentController";

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

        const priorityComboBox = document.createElement("div");
        const labelPriority = document.createElement("label");
        labelPriority.for = "priority-select";
        priorityComboBox.appendChild(labelPriority);
        const selectPriority = document.createElement("select");
        selectPriority.name = "priority";
        selectPriority.id = "priority-select";
        const option1 = document.createElement("option");
        option1.textContent = "Priority 1"
        option1.value = "1";

        const option2 = document.createElement("option");
        option2.textContent = "Priority 2"
        option2.value = "2";

        const option3 = document.createElement("option");
        option3.textContent = "Priority 3"
        option3.value = "3";

        const option4 = document.createElement("option");
        option4.textContent = "Priority 4"
        option4.value = "4";
        option4.selected = true;


        selectPriority.appendChild(option1);
        selectPriority.appendChild(option2);
        selectPriority.appendChild(option3);
        selectPriority.appendChild(option4);

        priorityComboBox.appendChild(selectPriority);

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add task";
        addBtn.addEventListener("click",()=>{
            const projectId = select.value;
            const name = nameInput.value;
            const desc = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const projectObj = ProjectController.findProjectById(projectId);
            const priority = selectPriority.value;
            projectObj.addTask(name,desc,dueDate,"none");

            if(projectId === ContentController.getActiveProject().getId())
                ContentController.renderProjectTasks(projectObj);
            dialog.close();
        })


        dialog.appendChild(nameInput);
        dialog.appendChild(descriptionInput);
        dialog.appendChild(dueDateInput);
        dialog.appendChild(projectComboBox);
        dialog.appendChild(priorityComboBox);
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