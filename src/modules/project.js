import Task from "./task.js"

export default class Project {
    constructor(name){
        this.name = name;
        this.taskList = [];
    }

    addTask(title,description,dueDate,priority){
        const task = new Task(title,description,dueDate,priority);
        this.taskList.push(task);
    }

    removeTask(id) {
        this.taskList = this.taskList.filter((task)=>task.id != id);
    }
}