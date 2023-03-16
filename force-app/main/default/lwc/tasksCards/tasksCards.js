import { LightningElement, api, track } from 'lwc';

export default class TasksCards extends LightningElement {
    @track newTaskDetails;
    @track tasks = [];

    @api getNewTaskDetails(newTask) {
        this.newTaskDetails = {
            id: new Date().getTime().toString(),
            taskDescription: newTask.taskDescription,
            type: newTask.type,
            deadLine: newTask.taskDeadline,
        };
        this.tasks.push(this.newTaskDetails);
    }

    handleDeleteTask(event) {
        const taskId = event.target.dataset.taskId;
        this.deleteTask(taskId);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
