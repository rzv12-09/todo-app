export default class Task {
    constructor(title,description,dueDate,priority,completed){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    toggle(){
       this.completed = !this.completed;
    }
}