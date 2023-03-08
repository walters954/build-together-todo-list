import { LightningElement,api,track } from 'lwc';

export default class TasksCards extends LightningElement {

    @track newTaskDetails;
    @track tasks = [
        {
            id:'1',
            taskDescription:'task 1',
            category:'personal',
            deadLine:new Date("2023-03-25").toLocaleDateString("en-US")
        },
        {
            id:'2',
            taskDescription:'task 2',
            category:'work',
            deadLine:new Date('2023-03-17').toLocaleDateString("en-US")
        },
        {
            id:'3',
            taskDescription:'task 3',
            category:'health',
            deadLine:new Date('2023-03-20').toLocaleDateString("en-US")
        }
    ];
    @track taskLength = this.tasks.length;

    @api getNewTaskDetails(newTask){
        //console.log('child component: '+JSON.stringify(newTask));
        this.newTaskDetails = {
            id:this.taskLength,
            taskDescription: newTask.taskDescription,
            category:newTask.category,
            deadLine:newTask.taskDeadline
        }
        //console.log(JSON.stringify(this.newTaskDetails));
        this.tasks.push(this.newTaskDetails);
        //console.log(JSON.stringify(this.tasks));
    }
}