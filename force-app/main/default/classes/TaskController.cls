public with sharing class TaskController {
  @AuraEnabled(cacheable=false)
  public static void createTaskRecord(
    String subject,
    String status,
    String priority,
    Date activityDate,
    String type
  ) {
    Task newTask = new Task();
    newTask.Subject = subject;
    newTask.Status = status;
    newTask.Priority = priority;
    newTask.ActivityDate = activityDate;
    newTask.Type = type;
    insert newTask;
  }

  @AuraEnabled(cacheable = true)
  public static List<Task> getTaskRecords(){
    return [SELECT Id, subject, status, priority, activityDate FROM Task];
  }

  @AuraEnabled
  public static void deleteTaskRecord(String taskId) {
      Task taskToDelete = [SELECT Id FROM Task WHERE Id = :taskId LIMIT 1];
      delete taskToDelete;
  }
}
