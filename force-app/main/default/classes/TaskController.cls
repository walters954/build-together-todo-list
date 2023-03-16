public with sharing class TaskController {
  @AuraEnabled(cacheable=false)
  public static void createTaskRecord(String subject, String status, String priority, Date activityDate) {
    Task newTask = new Task();
    newTask.Subject = subject;
    newTask.Status = status;
    newTask.Priority = priority;
    newTask.ActivityDate = activityDate;
    insert newTask;
  }

  @AuraEnabled(cacheable = true)
  public static List<Task> getTaskRecords(){
    return [SELECT Id, subject, status, priority, activityDate FROM Task];
  }
}
