import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class TestChild extends LightningModal {
    @api content;
    @api headerText;
    handleOkay() {
        this.close('okay');
    }
    handleNotOkay() {
        this.close('Not Okay');
    }
}