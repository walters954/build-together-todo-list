import { LightningElement, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex'
import LightningConfirm from 'lightning/confirm'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import listOfTask from '@salesforce/apex/TaskController.listOfTask';
import getMapPriority from'@salesforce/apex/PicklistHelper.getMapPriority';
import getMapStatus from'@salesforce/apex/PicklistHelper.getMapStatus';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TaskStatus from '@salesforce/schema/Task.Status';
import TaskPriority from '@salesforce/schema/Task.Priority';
import TASK_OBJECT from '@salesforce/schema/Task';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import createTaskRecord from '@salesforce/apex/TaskController.createTaskRecord';
import deleteTaskRecord from '@salesforce/apex/TaskController.deleteTaskRecord';
const DEFAULT_TASK_FORM = {
    Subject:"",
    Description:"",
    Priority:"",
    Status:""
}

export default class TodoListBeta extends LightningElement {
    
    showModal=false;
    statusSelectedValueList
    wiredTaskResult
    prioritySelectedValue
    priorityValuesList
    statusValuesList
    tasks
    taskRecord=DEFAULT_TASK_FORM;
    selectedRecordId
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
    @wire (listOfTask) wiredTasks(result){
        this.wiredTaskResult = result;
        const {data, error} = result
        if (data) {
            console.log(JSON.stringify(data)); 
            this.tasks=data.map(item=>{
                let formatedDate = new Date(item.LastModifiedDate).toDateString();
                return {...item, formatedDate}
              })
            
        } else if (error) {
            this.showToastMsg(error.message.body,'error');
        }
    }
    saveTaskHandler(){
        createTaskRecord({Subject:this.taskRecord.Subject, Description:this.taskRecord.Description, Priority: this.taskRecord.Priority, Status:this.taskRecord.Status}).then(()=>{
            this.showModal = false;
            console.log("this.taskRecord save TaskRecord function", JSON.stringify(this.taskRecord));
            this.showToastMsg("Task Created Successfully!!", 'success');
            this.refresh();
        }).catch(error=>{
            console.error("error", error.message.body);
            this.showToastMsg(error.message.body, 'error');
        })
    }
    createTaskHandler(){
        //console.log('taskInfo'+taskInfo);
        this.showModal = true;
    }
    formSubmitHandler(event){
        event.preventDefault();
        console.log("this.taskRecord", JSON.stringify(this.taskRecord));
        event.preventDefault();
        console.log("this.taskRecord", JSON.stringify(this.taskRecord));
        if(this.selectedRecordId){
            this.updateTask(this.selectedRecordId)
        } else {
            this.saveTaskHandler();
        }
  
        
    }
    closeModalHandler(){
        this.showModal = false;
        this.taskRecord=DEFAULT_TASK_FORM;
        this.selectedRecordId=ull;
       
    }

    handleChangeStatus(event){
        this.statusSelectedValue=event.target.value;
    }
    handleChangePriority(event){
        this.prioritySelectedValue=event.target.value ; 
    }
    editTaskHandler(event){
        console.log(event.target.dataset.recordid);
        const recordid =event.target.dataset.recordid;
        const taskRecord =this.tasks.find(item=>item.Id===recordid);
        console.log(JSON.stringify(taskRecord));
        this.taskRecord={
            Subject:taskRecord.Subject,
            Description:taskRecord.Description,
            Priority:taskRecord.Priority,
            Status:taskRecord.Status
        }
        this.showModal=true;
    }
    deleteTaskHandler(event){
        this.selectedRecordId = event.target.dataset.recordid
        this.handleConfirm();
    }
    async handleConfirm(){
        const result = await LightningConfirm.open({
          message:"Are you sure you want to delete this task?",
          variant:'headerless',
          label:'Delete Confirmation'
        })
        if(result){
          this.deleteTask();
        } else {
          this.selectedRecordId = null;
        }
    }
      
    deleteTask(){
        deleteTaskRecord({taskId: this.selectedRecordId}).then(()=>{
          this.showModal = false;
          this.selectedRecordId = null;
          this.showToastMsg("Task Deleted Successfully!!", "success");
          this.refresh();
        }).catch(error=>{
          console.error("Error in deletion", error);
          this.showToast(error.message.body, 'error');
        })
    }
    changeHandler(event){
        const {name, value} = event.target;
        // const name = event.target.name
        // const value = event.target.value
        this.taskRecord={...this.taskRecord, [name]:value};
    }
    showToastMsg(message, variant){
        const elem = this.template.querySelector('c-notification');
        if(elem){
          elem.showToast(message, variant);
        }
    }
    refresh(){
        return refreshApex(this.wiredtaskResult);
    }
    updateTask(taskId){
        const {Subject , Description , Priority, Status} = this.taskRecord
        updateTaskrecord({"taskId":taskId, "Subject":Subject, "Description":Description, "Status":Status}).then(()=>{
          this.showModal = false;
          this.showToastMsg("Task Updated Successfully!!", 'success');
          this.refresh();
        }).catch(error=>{
          console.error("error in updating", error);
          this.showToastMsg(error.message.body, 'error');
        })
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

      
*/

}