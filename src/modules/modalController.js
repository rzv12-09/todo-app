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


    return {
        handleNewProject,
    }
})();

export default ModalController;