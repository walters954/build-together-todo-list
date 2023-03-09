import { LightningElement } from 'lwc';
import createNoteRecord from '@salesforce/apex/TaskController.createTaskRecord'
const DEFAULT_TASK_FORM = {
  Subject:"",
  Description:""
}
export default class TodoList extends LightningElement {
    get isFormInvalid(){
        return !(this.taskRecord && this.taskRecord.description && this.taskRecord.subject)
      }
      
        createNoteHandler(){
          this.showModal = true
        }
        closeModalHandler(){
          this.showModal = false
          this.taskRecord = DEFAULT_TASK_FORM
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
      
        createTask(){
          createTaskRecord({title:this.taskRecord.subject, description:this.taskRecord.description}).then(()=>{
            this.showModal = false;
          }).catch(error=>{
            console.error("error", error.message.body)
          })
        }
}