public with sharing class TodoAppController {

    @AuraEnabled
    public static List<Task> getAllTasks(){
        return [SELECT Id, subject, status, priority, activityDate FROM Task];
    }

    @AuraEnabled(cacheable = true)
    public static List<String> getStatusPicklistValues(){
        List<String> statusValues = new List<String>();
        Schema.DescribeFieldResult dfr = Task.Status.getDescribe();
        List<Schema.PicklistEntry> ple = dfr.getPicklistValues();
        for(Schema.PicklistEntry val: ple){
            statusValues.add(val.getValue());
        }
        return statusValues;
    }

    @AuraEnabled(cacheable = true)
    public static List<String> getPriorityPicklistValues(){
        List<String> statusValues = new List<String>();
        Schema.DescribeFieldResult dfr = Task.Priority.getDescribe();
        List<Schema.PicklistEntry> ple = dfr.getPicklistValues();
        for(Schema.PicklistEntry val: ple){
            statusValues.add(val.getValue());
        }
        return statusValues;
    }

    @AuraEnabled
    public static void createNewTask(String subject, String priority, String status, Date dueDate){
        Task t = new Task();
        t.subject = subject;
        t.priority = priority;
        t.status = status;
        t.activityDate = dueDate;
        try{
            insert t;
        }catch(Exception e){
            System.debug('Exception '+e);
        }
    }

    @AuraEnabled
    public static void deleteTask(String taskId){
        Id tId = Id.valueOf(taskId);
        Task deleteTask = [SELECT Id FROM Task WHERE Id =:tId];
        delete deleteTask;
    }

    @AuraEnabled
    public static Task getTaskDetails(String taskId){
        Id tId = Id.valueOf(taskId);
        Task editTask = [SELECT Id, Subject,Status,Priority,ActivityDate FROM Task WHERE Id = :tId];
        return editTask;
    }


}