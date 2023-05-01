function createEmployeeRecord(empArray)
{
    const empOject = {
        firstName : empArray[0],
        familyName : empArray[1],
        title : empArray[2],
        payPerHour : empArray[3],
        timeInEvents : [],
        timeOutEvents : [],
    };
    return empOject;
}



function createEmployeeRecords(empRecords)
{ 
   let emplObject = [];
   empRecords.forEach(element => { 
    emplObject.push(createEmployeeRecord(element))
   
   });
return emplObject;
}

function createTimeInEvent(empRecords,dateStamp)
{
    let [date, time] = dateStamp.split(" ");
   const typeTimeIn = {
        type : "TimeIn" ,
        hour : parseInt(time,10),
        date : date
    } 

   let len = empRecords.timeInEvents.length;
   empRecords.timeInEvents[len]=  typeTimeIn ;
    return empRecords;
   
}

function createTimeOutEvent(empRecords,dateStamp)
{
    let [date, time] = dateStamp.split(" ");
   const typeTimeOut = {
        type : "TimeOut" ,
        hour : parseInt(time,10),
        date : date
    } 

   let len = empRecords.timeOutEvents.length;
   empRecords.timeOutEvents[len]= typeTimeOut;
    return empRecords;
   
}



function hoursWorkedOnDate(empRecord,dateWorked) 
{ 
   let punchInTime = empRecord.timeInEvents.find( e => e.date === dateWorked).hour
   let punchOutTime = empRecord.timeOutEvents.find( e => e.date === dateWorked).hour
   return punchOutTime/100 - punchInTime/100;
}

function wagesEarnedOnDate(empRecord,dateWorked) 
{   
     //console.log(empRecord)
   let wages = hoursWorkedOnDate(empRecord,dateWorked) * empRecord.payPerHour;
   return wages;
}


function allWagesFor(empRecord) 
{ 
 let totalWages = 0;
empRecord.timeInEvents.forEach((e) => { 
          totalWages =totalWages + wagesEarnedOnDate(empRecord,e.date);
         });
return totalWages;

}

function calculatePayroll(arrayOfEmployeeRecord) 
{
   let grandTotalOwed = arrayOfEmployeeRecord.reduce((m, e) => m + allWagesFor(e), 0)
   return grandTotalOwed;
}


