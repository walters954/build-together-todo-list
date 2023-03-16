import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SUBJECT_FIELD from '@salesforce/schema/Task.Subject';
import TYPE_FIELD from '@salesforce/schema/Task.Type';
import PRIORITY_FIELD from '@salesforce/schema/Task.Priority';
import TASK_OBJECT from '@salesforce/schema/Task';
import TASK_ID_FIELD from '@salesforce/schema/Task.ID';



export default class TaskEditForm extends LightningElement {
    @api recordId="00TDm000009jFGfMAM";
    objectApiName=TASK_OBJECT;
    subjectField = SUBJECT_FIELD;
    typeField = TYPE_FIELD;
    priorityField = PRIORITY_FIELD;
    fields={
        SUBJECT_FIELD,
        TYPE_FIELD,
        PRIORITY_FIELD

    }
    

}