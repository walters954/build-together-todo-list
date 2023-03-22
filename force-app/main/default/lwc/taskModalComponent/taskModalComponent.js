import { api,track } from 'lwc';
import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createNewTask from '@salesforce/apex/TodoAppController.createNewTask';

export default class TaskModalComponent extends LightningModal {
    @track subject;
    @track status;
    @track priority;
    @track dueDate;

    @api statusOptions;
    @api priorityOptions;

    handleInputChange(event){
            const field = event.target.name;
            const value = event.target.value;
            this[field]=value;
    }

    handleCreate() {

        createNewTask({subject: this.subject,priority: this.priority, status: this.status,dueDate: this.dueDate})
        .then(result =>{
            this.close('Success');
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Record Created Successfully',
                variant: 'success'
            })
            this.dispatchEvent(event);
            console.log(result);
        }).catch(error => {
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Error'+error.body.message,
                variant: 'error'
            })
            this.dispatchEvent(event);
            console.log(error);});
    }
}