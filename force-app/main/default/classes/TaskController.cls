public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static Task createTaskRecord(String subject, string description, string priority, string type){

        Task taskRec = new Task(Subject=subject, Description=description, Priority=priority, Type=type, OwnerId=UserInfo.getUserId(), ActivityDate=Date.today());
        insert taskRec;
        return taskRec;

    }
    @AuraEnabled(cacheable=true)
    public static List<Task> listOfTask(){
        return [SELECT ID, Subject,  description FROM Task];
    }
}