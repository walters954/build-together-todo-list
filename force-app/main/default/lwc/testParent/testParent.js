import { LightningElement } from 'lwc';

export default class TestParent extends LightningElement {

    childProperty;

    handleUpdate(event){
        console.log(event.target);
        this.childProperty = event.target.childProperty;
        console.log(event.target.childProperty);
        console.log(event.detail);
        console.log(this.childProperty);
        console.log(event.target.value);
        console.log(event.currentTarget.value);
    }
}