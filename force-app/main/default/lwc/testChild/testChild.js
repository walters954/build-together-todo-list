import { LightningElement } from 'lwc';

export default class TestChild extends LightningElement {

    childProperty = 'test123';

    handleClick(){
        const event = new CustomEvent('childupdate' , { bubbles: true });
        this.dispatchEvent(event);
    }
}