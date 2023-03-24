import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import TestChild from 'c/testChild';

export default class TodoList extends LightningElement  {
    showModal

    tasks = [0,1,2,3,4,5,6];

    get taskLength(){
        return this.tasks.length;
    }
    
    handleClick(event) {
        // TestChild.open().then((result) => {
        //     console.log(result);
        // });
        console.log(event.target.label);
        let newItem = Math.floor(Math.random() * 1000);
        
        //spread operator
        let newTasks = [...this.tasks,newItem];
        this.tasks = newTasks;
        console.log(this.tasks);
        this.successToast();
    }
    
    handleCancel(){
        this.showModal=false;
    }

    deleteAll(){
        console.log('delete all');
        this.tasks = [];
        this.deleteToast();
    }

    deleteToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            variant: 'error',
            message:
                'All tasks successfully deleted.',
        });
        this.dispatchEvent(event);
    }

    successToast() {
        const event = new ShowToastEvent({
            title: 'Line added successfully!',
            variant: 'success',
            message:
                'You are the best!',
        });
        this.dispatchEvent(event);
    }
}