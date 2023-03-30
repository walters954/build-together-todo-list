/*******************************************************************************************
 * Name         ParentTaskComponent
 * Author       Adam/Aiswarya
 * Date         03/30/2023
 * Group        Team Canada
 * Description  Defines a Lightning Web Component (LWC) named ParentTaskComponent for a ToDo application in Salesforce. The component fetches task data, status and priority picklist values from the server, handles opening a modal to create new tasks, and updates the task list when a task is deleted or completed.
 *******************************************************************************************/
/* MODIFICATION LOG
 * Version          Developer          Date               Description
 *-------------------------------------------------------------------------------------------
 *  1.0              Adam/Aiswarya      03/30/2023          Initial Creation
  *******************************************************************************************/
// Import required modules and methods
import { track,LightningElement } from 'lwc';
import TaskModalComponent from 'c/taskModalComponent';
import getAllTasks from '@salesforce/apex/TodoAppController.getAllTasks';
import getStatusPicklistValues from '@salesforce/apex/TodoAppController.getStatusPicklistValues';
import getPriorityPicklistValues from '@salesforce/apex/TodoAppController.getPriorityPicklistValues';

export default class ParentTaskComponent extends LightningElement {

    @track taskList;
    @track error;
    @track statusOptions;
    @track priorityOptions;
// connectedCallback lifecycle hook runs when the component is connected to the DOM
    connectedCallback(){
// Fetch status picklist values from the server
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
// Fetch priority picklist values from the server
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
// Fetch all tasks from the server
        getAllTasks().then(result =>{this.taskList = result;}).catch(error =>{this.error = error;});
    }
// Function to open the task modal
    openModal(){
        TaskModalComponent.open({
            statusOptions:this.statusOptions,
            priorityOptions:this.priorityOptions
        }).then(result => {
            // Refresh the task list after the modal is closed
            getAllTasks().then(result =>
                {this.taskList = result;
            }).catch(error =>{this.error = error;});
        }).catch(error =>{
            this.error = error;
            console.log(error);
        });
    }
// Function to update the task cards when a task is deleted
    updateTaskCardsOnDelete(event){
        console.log('Inside updateTaskCardsOnDelete: ');
        // Refresh the task list after a task is deleted
            getAllTasks().then(result =>{
            this.taskList = result;
            console.log(result);
            }).catch(error =>{this.error = error;});
    }
}