public with sharing class PicklistHelper {
    public PicklistHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String,String>getMapPriority(){
        Map<String,String> mapPriorityTaskValues= new Map<String, String>();
        Schema.DescribeFieldResult objFieldDescribe = Task.Priority.getDescribe();
        List<Schema.PicklistEntry> lstPickListValues = objFieldDescribe.getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
            mapPriorityTaskValues.put(objPickList.getLabel(),objPickList.getValue());

        }
        return mapPriorityTaskValues;
    }
    @AuraEnabled(cacheable=true)
    public static Map<String,String>getMapStatus(){
        Map<String,String> mapStatusTaskValues= new Map<String, String>();
        Schema.DescribeFieldResult objFieldDescribe = Task.Status.getDescribe();
        List<Schema.PicklistEntry> lstPickListValues = objFieldDescribe.getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
            mapStatusTaskValues.put(objPickList.getLabel(),objPickList.getValue());
        }
        return mapStatusTaskValues;
    }
}