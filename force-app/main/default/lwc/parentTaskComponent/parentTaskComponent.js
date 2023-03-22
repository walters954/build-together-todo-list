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

    connectedCallback(){

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

        getAllTasks().then(result =>{this.taskList = result;}).catch(error =>{this.error = error;});
    }

    openModal(){
        TaskModalComponent.open({
            statusOptions:this.statusOptions,
            priorityOptions:this.priorityOptions
        }).then(result => {
            getAllTasks().then(result =>
                {this.taskList = result;
            }).catch(error =>{this.error = error;});
        }).catch(error =>{
            this.error = error;
            console.log(error);
        });
    }

    updateTaskCardsOnDelete(event){
        console.log('Inside updateTaskCardsOnDelete: ');
            getAllTasks().then(result =>{
            this.taskList = result;
            console.log(result);
            }).catch(error =>{this.error = error;});
    }
}