import { LightningElement, api, track, wire } from 'lwc';
import getTaskRecords from '@salesforce/apex/TaskController.getTaskRecords';
import deleteTaskRecord from '@salesforce/apex/TaskController.deleteTaskRecord';
import { refreshApex } from '@salesforce/apex';

export default class TasksCards extends LightningElement {
    @track tasks = [];
    @wire(getTaskRecords) tasks;

    handleDeleteTask(event) {
        const taskId = event.target.dataset.taskId;
        this.deleteTask(taskId);
    }

    async deleteTask(taskId) {
        try {
            await deleteTaskRecord({ taskId: taskId });
            this.refreshTasks();
        } catch (error) {
            console.error('Error deleting task:', JSON.stringify(error));
        }
    }

    @api
    refreshTasks() {
        return refreshApex(this.tasks);
    }
    

}
