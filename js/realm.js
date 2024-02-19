'use strict';

import Realm from 'realm';

class AppSettings extends Realm.Object {}
AppSettings.schema = {
    name: 'AppSettings',
   primaryKey: 'settingID',
    properties: {
        settingID:'int',
        appBaseURL: 'string',
    },
}


class AppUser extends Realm.Object {}
AppUser.schema = {
    name: 'AppUser',
   primaryKey: 'userID',
    properties: {
        userID:'int',
        isOldUser: {type:'bool', default: false},
        isOnSite:{type:'bool', default: false},
        mobileUserID:'int', 
        dakarUserName:'string',
        dakarEmployeeID:'string',
        dakarToken:'string',
        token:'string',
    },
}

class Punch extends Realm.Object {}
Punch.schema = {
    name: 'Punch', 
    primaryKey: 'PunchID',
    properties: {
     PunchID:'int',
     Date: 'date',
     lat:{type: 'string', default:''},
     long:{type: 'string', default:''},
     TimeIn: {type:'date', default: new Date('1900-01-01T00:00:00')}, 
     TimeOut: {type:'date', default: new Date('1900-01-01T00:00:00')},
     status: {type:'string', default:  'New'}
    },
}

class employee extends Realm.Object {}
employee.schema = {
    name: 'employee',
   primaryKey: 'empID',
    properties: {
        empID: 'int',
        employeeID:'int',
        companyID: 'int', 
        employeeEmail: 'string',
        isOldUser: {type:'bool', default: false},
        isOnSite:{type:'bool', default: false},
        token:'string',
    },
}

class punchInRecord extends Realm.Object {}
punchInRecord.schema = {
    name: 'punchInRecord',
   primaryKey: 'punchInRecordID',
    properties: {
        punchInRecordID:'int',
        punchInPressed:{type:'bool', default: false},
        punchDateTime: 'date',
    },
}


class punchInOfDay extends Realm.Object {}
punchInOfDay.schema = {
    name: 'punchInOfDay',
   primaryKey: 'punchInOfDayID',
    properties: {
        punchInOfDayID:'int',
        punchInDateTime: 'date',
        punchInType: 'int',
    },
}


export default new Realm({schema: [AppSettings,AppUser, Punch, employee, punchInRecord, punchInOfDay]});