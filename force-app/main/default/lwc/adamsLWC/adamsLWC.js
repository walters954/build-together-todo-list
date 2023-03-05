import { LightningElement, track } from 'lwc';

export default class AdamsLWC extends LightningElement {
    @track isModalOpen = false;
    @track taskDescription;
    @track taskDeadline;
    @track category;
    categoryOptions = [
        { label: 'Personal', value: 'Personal' },
        { label: 'Work', value: 'Work' },
        { label: 'Hobbies', value: 'Hobbies' },
        { label: 'Health', value: 'Health' }
    ];

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this[field] = value;
    }

    handleSave() {
        // handle saving logic here
        this.closeModal();
    }
}
