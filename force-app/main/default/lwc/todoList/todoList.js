import { LightningElement, track } from 'lwc';
import TestChild from 'c/testChild';

export default class TodoList extends LightningElement  {
    showModal

    tasks = [0,1,2,3,4,5,6];
    
    handleClick(event) {
        TestChild.open().then((result) => {
            console.log(result);
        });
        console.log(event.target.label);
        let newItem = Math.floor(Math.random() * 100);
        
        let newTasks;
        //spread operator
        newTasks = [...this.tasks,newItem];
        //spread operator
        //deep clone
        newTasks = JSON.parse(JSON.stringify(this.tasks)); 
        newTasks.push(newItem);
        //deep clone
        //concat 
        newTasks = this.tasks.concat(newItem);
        //concat 

        this.tasks = newTasks;
        console.log(this.tasks);
    }
    handleCancel(){
        this.showModal=false;
    }
}