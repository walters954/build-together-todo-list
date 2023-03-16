import { LightningElement, wire } from 'lwc';
import createNoteRecord from '@salesforce/apex/TaskController.createTaskRecord';
import listOfTask from '@salesforce/apex/TaskController.listOfTask';
import getMapPriority from'@salesforce/apex/PicklistHelper.getMapPriority';
import getMapStatus from'@salesforce/apex/PicklistHelper.getMapStatus';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TaskStatus from '@salesforce/schema/Task.Status';
import TaskPriority from '@salesforce/schema/Task.Priority';
import TASK_OBJECT from '@salesforce/schema/Task';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
const DEFAULT_TASK_FORM = {
    subject:"",
    description:""
}

export default class TodoListBeta extends LightningElement {
    
    showModal=false;
    statusSelectedValueList
    prioritySelectedValue
    priorityValuesList
    statusValuesList
    tasks;
    taskRecord=DEFAULT_TASK_FORM;
    @wire (getMapStatus) wiredStatusValues({data,error}){
        let tempArray=[];
        if (data) {
            for(let key in data){
                tempArray.push({label:data[key], value:key});
            }
        }
        this.statusValuesList=tempArray;
        
    }

    @wire (getMapPriority) wiredPriorityValues({data,error}){
        let tempArray=[];
        if (data) {
            for(let key in data){
                tempArray.push({label:data[key], value:key});
            }
        }
        this.priorityValuesList=tempArray;
        
    }
    /*@wire(getObjectInfo, { objectApiName: TASK_OBJECT })
    taskInfo;
    
    //Get status list values to fil the combo
    @wire(getPicklistValues,
        {
            recordTypeId: '$taskInfo.data.defaultRecordTypeId',
            fieldApiName: TaskStatus
        }
    )
    taskStatusValues;
    //Get status list values to fil the combo
    @wire(getPicklistValues,
        {
            recordTypeId: '$taskInfo.data.defaultRecordTypeId',
            fieldApiName: TaskPriority
        }
    )
    taskPriorityValues;
    */
    @wire (listOfTask) wiredTasks({data,error}){
        if (data) {
             this.tasks = data;
             console.log(data); 
             console.log(this.tasks); 
        console.log(data); 
        } else if (error) {
            console.log(error);
        }
    }
    saveTaskHandler(){
        createTaskRecord({title:this.taskRecord.subject, description:this.taskRecord.description}).then(()=>{
        this.showModal = false;
        }).catch(error=>{
        console.error("error", error.message.body)
        })
    }
    createTaskHandler(){
        //console.log('taskInfo'+taskInfo);
        this.showModal = true
    }
    closeModalHandler(){
        this.showModal = false
       
    }
    saveTaskHandler(){
        
    }
    handleChangeStatus(event){
        this.statusSelectedValue=event.target.value
    }
    handleChangePriority(event){
        this.prioritySelectedValue=event.target.value  
    }
    
    /*get statusValues(){
        return [
            {label:'Not started', value:'Not started'},
            {label:'In progress', value:'In progress'},
            {label:'Completed', value:'Completed'},
            {label:'Wainting on someone else', value:'Wainting on someone else'},
            {label:'Deferred', value:'Deferred'}
        ]
    }
    get priorityValues(){
        return [
            {label:'High', value:'High'},
            {label:'Normal', value:'Normal'},
            {label:'Low', value:'Low'}
        ]
    }*/
    /*get isFormInvalid(){
        return !(this.taskRecord && this.taskRecord.description && this.taskRecord.subject)
    }
      
    
   
    
    changeHandler(event){
        const {subject, value} = event.target
        // const name = event.target.name
        // const value = event.target.value
        this.taskRecord={...this.taskRecord, [Subject]:value}
    }
    formSubmitHandler(event){
        event.preventDefault();
        console.log("this.taskRecord", JSON.stringify(this.taskRecord))
        this.createTask()
    }
      
*/

}