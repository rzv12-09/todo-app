

const ContentController = (()=>{
    const content = document.querySelector(".content");
    let activeProject = null;

    const renderProjectTasks = (project) =>{
        activeProject = project;
        content.innerHTML = '';    

        const taskList = project.getTaskList();

        const titleDiv = document.createElement("div");
        titleDiv.textContent = project.getName();

        const tasksDiv = document.createElement("div");
        if(taskList.length === 0)
            tasksDiv.textContent = "This project has no tasks";
        else {
            for(let taskObj of taskList){
                const task = document.createElement("div");
                const title = document.createElement("div");
                const desc = document.createElement("div");
                const dueDate = document.createElement("div");

                title.textContent = taskObj.getTitle();
                desc.textContent = taskObj.getDesc();
                dueDate.textContent = taskObj.getDueDate();

                const editBtn = document.createElement("button");
                editBtn.classList.add("task-edit-btn");
                editBtn.textContent = "Edit";

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("task-delete-btn");
                deleteBtn.textContent = "Delete";


                task.appendChild(title);
                task.appendChild(desc);
                task.appendChild(dueDate);
                task.appendChild(editBtn);
                task.appendChild(deleteBtn);

                task.dataset.id = taskObj.getId()
                tasksDiv.appendChild(task);
            }
            
        }

        content.appendChild(titleDiv);
        content.appendChild(tasksDiv);
    }

    const getActiveProject = ()=>{
        return activeProject;
    }

    const handleEditTask = (taskId) =>{
        const selectedTask = activeProject.findTaskById(taskId);
        console.log(taskId);
        const editDiv = document.querySelector(`div[data-id="${taskId}"]`);
        editDiv.textContent = '';
        
        const titleInput = document.createElement("input");
        titleInput.placeholder = "Task name";
        titleInput.value = selectedTask.getTitle();

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";
        descriptionInput.value = selectedTask.getDesc();

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.min = today;
        dueDateInput.value = selectedTask.getDueDate();

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
        
        selectPriority.value = selectedTask.getPriority()

        selectPriority.appendChild(option1);
        selectPriority.appendChild(option2);
        selectPriority.appendChild(option3);
        selectPriority.appendChild(option4);

        priorityComboBox.appendChild(selectPriority);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click",()=>{
            renderProjectTasks(activeProject);
            return;
        })

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click",()=>{
            selectedTask.setTitle(titleInput.value);
            selectedTask.setDesc(descriptionInput.value);
            selectedTask.setDate(dueDateInput.value);
            selectedTask.setPriority(selectPriority.value);
            renderProjectTasks(activeProject);
            return;
        })

        editDiv.appendChild(titleInput);
        editDiv.appendChild(descriptionInput);
        editDiv.appendChild(dueDateInput);
        editDiv.appendChild(priorityComboBox);
        editDiv.appendChild(cancelBtn);
        editDiv.appendChild(saveBtn);

        //la save
        //renderProjectTasks(activeProject);
    }

    const bindEvents = () => {
        content.addEventListener("click",(e)=>{
            if(e.target.classList.contains("task-edit-btn")){   
                const taskDiv = e.target.closest('[data-id]')
                const taskId = taskDiv.dataset.id;
                handleEditTask(taskId);
                
            }
        })
    }

    return {
        renderProjectTasks,
        getActiveProject,
        bindEvents
    }
})();

export default ContentController;