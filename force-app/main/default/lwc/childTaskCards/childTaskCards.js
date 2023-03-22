import { api,LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteTask from '@salesforce/apex/TodoAppController.deleteTask';
import getTaskDetails from '@salesforce/apex/TodoAppController.getTaskDetails';

export default class ChildTaskCards extends LightningElement {
    @api task;

    deleteTask(event){
        const Id = event.target.dataset.taskId;
        console.log(Id);

        //delete the task record
        deleteTask({taskId:Id}).then(result =>{
            const event = new ShowToastEvent({
                title:'Delete Success',
                variant:'success',
                message:'Record Deleted Successfully'
            });
            this.dispatchEvent(event);

            //establish child-to-parent communication so as to update the parent cards list
            const childEvent = new CustomEvent("updatetaskcards");
            this.dispatchEvent(childEvent); 
        }).catch(error => {
            console.log(error);
            const event = new ShowToastEvent({
                title:'Delete fail',
                variant:'error',
                message:'Record Deletion Failed '+error.body.message
            });
            this.dispatchEvent(event);
        });
    }

    editTask(event){
        const Id = event.target.dataset.taskId;

    getTaskDetails({taskId:Id}).then(result =>{
        console.log(result);}).catch(error => {console.log(error);});

    }
}