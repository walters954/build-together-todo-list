public with sharing class GetCompletedTasks {
     @AuraEnabled(cacheable=true)
    public static List<Task> getCompletedTasks() {
        return [
            SELECT Id, Subject, Priority, Status
            FROM Task
            WHERE Status = 'Completed'
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Task getTask(Id id) {
    return [
        SELECT Id, Status
        FROM Task
        WHERE Id = :id
    ];
}

}
