import { LightningElement, track, api } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import createTaskRecord from "@salesforce/apex/TaskController.createTaskRecord";

export default class todoListrev2 extends LightningElement {
  @track isModalOpen = false;
  @track taskDescription;
  @track taskDeadline;
  @track category;
  @api recordId;

  categoryOptions = [
    { label: "Personal", value: "Personal" },
    { label: "Work", value: "Work" },
    { label: "Hobbies", value: "Hobbies" },
    { label: "Health", value: "Health" }
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
    const subject = this.taskDescription;
    const status = "Not Started";
    const priority = "Normal";
    const activityDate = this.taskDeadline;
    const category = this.category;

    createTaskRecord({ subject, status, priority, activityDate, category })
      .then(() => {
        this.closeModal();
        const toastEvent = new ShowToastEvent({
          title: "Success",
          message: "Task created successfully",
          variant: "success"
        });
        this.dispatchEvent(toastEvent);
        this.dispatchEvent(new CustomEvent("taskcreated"));
      })
      .catch((error) => {
        const toastEvent = new ShowToastEvent({
          title: "Error",
          message: "Error creating task: " + error.body.message,
          variant: "error"
        });
        this.dispatchEvent(toastEvent);
      });
  }
}
