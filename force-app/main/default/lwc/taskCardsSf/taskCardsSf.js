import { LightningElement, wire } from 'lwc';
import getTaskRecords from '@salesforce/apex/TaskController.getTaskRecords';

export default class TaskCardsSf extends LightningElement {

    @wire(getTaskRecords) tasks;

}