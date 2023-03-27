import { LightningElement, wire, track } from 'lwc';
import getCompletedTasks from '@salesforce/apex/GetCompletedTasks.getCompletedTasks';

const columns = [
    { label: 'Subject', fieldName: 'Subject' },
    { label: 'Priority', fieldName: 'Priority' },
    { label: 'Status', fieldName: 'Status' },
];

export default class CompletedTasks extends LightningElement {
    @track tasks;
    columns = columns;

    @wire(getCompletedTasks)
    loadTasks({ error, data }) {
        if (data) {
            this.tasks = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tasks = undefined;
        }
    }
}

           

