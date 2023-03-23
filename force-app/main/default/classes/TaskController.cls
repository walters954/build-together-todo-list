public  class TaskController {
    @AuraEnabled
    public static Task createTaskRecord(String Subject, string Description, string Priority, string Status){
        System.debug('Subject'+Subject);
        System.debug('Description'+Description);
        System.debug('Priority'+Priority);
        System.debug('Status'+Status);

        //Task taskRec = new Task(Subject=Subject, Description=Description, Priority=Priority, Status=Status, OwnerId=UserInfo.getUserId());
        Task tsk = new Task();
        tsk.Description=Description;
        tsk.Subject=Subject;
        tsk.OwnerId = UserInfo.getUserId();
        tsk.Status = Status;
        tsk.Priority=Priority;

        insert tsk;
        
        return tsk;

    }


    @AuraEnabled
    public static Boolean updateTaskRecord(String taskId, String Subject, string Description, string Priority, string Status){
        try {
            if(!String.isBlank(taskId)){
                Task aTask = [SELECT Id, Subject, Description, Priority, Status, LastModifiedDate FROM Task where id =:taskId];
                aTask.Subject = Subject;
                aTask.Description = Description;
                aTask.Priority = Priority;
                aTask.Status = Status;

                update aTask;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Task> listOfTask(){
        return [SELECT ID, Subject,  description, Status, priority, LastModifiedDate FROM Task order by LastModifiedDate desc];
    }

    @AuraEnabled
    public static Boolean deleteTaskRecord(String taskId){
        try {
            if(!String.isBlank(taskId)){
                Task taskRec = new Task(Id= taskId);
                delete taskRec;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}