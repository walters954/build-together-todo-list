import { LightningElement, track, api } from 'lwc';

export default class AdamsLWC extends LightningElement {
    @track isModalOpen = false;
    @track taskDescription;
    @track taskDeadline;
    @track category;
    @track newTask;

    categoryOptions = [
        { label: 'Personal', value: 'Personal' },
        { label: 'Work', value: 'Work' },
        { label: 'Hobbies', value: 'Hobbies' },
        { label: 'Health', value: 'Health' }
    ];

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this[field] = value;
    }

    handleSave() {
        // handle saving logic here
        console.log('Parent Compoent');
        //console.log('Task Description: '+this.taskDescription);
        //console.log('Task Deadline:'+this.taskDeadline);
        //console.log('Task Category:'+this.category);
        this.newTask ={
            taskDescription:this.taskDescription,
            taskDeadline:this.taskDeadline,
            category:this.category
        }
        this.template.querySelector('c-tasks-cards').getNewTaskDetails(this.newTask);
        this.newTask = '';
        this.taskDescription = this.template.querySelector('.taskDescription').value = '';
        this.taskDeadline = this.template.querySelector('.taskDeadline').value = '';
        this.category = this.template.querySelector('.category').value='';
        this.closeModal();
    }
}
