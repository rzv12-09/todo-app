

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

                task.appendChild(title);
                task.appendChild(desc);
                task.appendChild(dueDate);

                tasksDiv.appendChild(task);
            }
            
        }

        content.appendChild(titleDiv);
        content.appendChild(tasksDiv);
    }

    const getActiveProject = ()=>{
        return activeProject;
    }

    return {
        renderProjectTasks,
        getActiveProject,
    }
})();

export default ContentController;