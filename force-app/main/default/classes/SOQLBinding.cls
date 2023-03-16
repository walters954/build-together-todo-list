public with sharing class SOQLBinding {

    public static void getAccount(){
        String myTestString = 'acctName';
        List<sObject> sobjList = Database.query('SELECT Id, Name FROM Account WHERE Name = :acctName');
        System.debug(sobjList);
    }

    public static void getAccount2(){
        Map<String, Object> acctBinds = new Map<String, Object>();
        acctBinds.put('acctName', new Set<String>{'GenePoint','sForce','Dickenson plc', 'Test'});
        acctBinds.put('id','0015e00000IeSBKAA3');
        List<sObject> sobjList = Database.queryWithBinds('SELECT Id, Name FROM Account WHERE Name = :acctName', acctBinds, AccessLevel.USER_MODE);
        System.debug(sobjList);
    }
}