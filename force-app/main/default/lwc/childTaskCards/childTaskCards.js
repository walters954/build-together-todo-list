import { api,track,LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteTask from '@salesforce/apex/TodoAppController.deleteTask';
import getTaskDetails from '@salesforce/apex/TodoAppController.getTaskDetails';
import getStatusPicklistValues from '@salesforce/apex/TodoAppController.getStatusPicklistValues';
import getPriorityPicklistValues from '@salesforce/apex/TodoAppController.getPriorityPicklistValues';
import updateTask from '@salesforce/apex/TodoAppController.updateTask';

export default class ChildTaskCards extends LightningElement {
    @api task;
    @track subject;
    @track status;
    @track priority;
    @track dueDate;
    @track statusOptions;
    @track priorityOptions;
    @track editEnabled = false;

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
        this.editEnabled = true;
        const Id = event.target.dataset.taskId;
        getStatusPicklistValues().then(result => 
            {
                let options = [];
                if(result){
                    result.forEach(r => {
                        options.push({label:r,value:r});
                    });
                }
                this.statusOptions = options;
            }).catch(error =>{console.log(error);});

        getPriorityPicklistValues().then(result => 
                {
                    let options = [];
                    if(result){
                        result.forEach(r => {
                            options.push({label:r,value:r});
                        });
                    }
                    this.priorityOptions = options;
                }).catch(error =>{console.log(error);});

        getTaskDetails({taskId:Id}).then(result =>{
            this.subject = result.Subject;
            this.dueDate = result.ActivityDate;
            this.priority = result.Priority;
            this.status = result.Status;
        }).catch(error => {console.log(error);});
    }

    handleInputChange(event){
        const field = event.target.name;
        const value = event.target.value;
        this[field]=value;
    }

    updateTask(event){
        const Id = event.target.dataset.taskId;
        updateTask({taskId:Id,subject:this.subject,status:this.status,priority:this.priority}).then(result => {
            const event = new ShowToastEvent({
                title:'Update Success',
                variant:'success',
                message:'Record Deleted Successfully'
            });
            this.dispatchEvent(event);
            this.editEnabled = false;
            if(!this.editEnabled){
                getTaskDetails({taskId: Id}).then(result =>{
                    this.task = result;
                })
            }
        }).catch(error => {
            const event = new ShowToastEvent({
                title:'Updated failed',
                variant:'error',
                message:'Record Update Failed '+error.body.message
            });
            this.dispatchEvent(event);
            console.log(error);})
    }

    cancelTask(){
        this.editEnabled = false;
    }
}