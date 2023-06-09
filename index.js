// Your code here
function createEmployeeRecord(array) {
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };

    return obj;
};

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
};

function createTimeInEvent(record, date) {
    let timeInEvents = record.timeInEvents;
    let obj = {
        type: "TimeIn",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10),
    };
    timeInEvents.push(obj)
    return record;
};

function createTimeOutEvent(record, date) {
    let timeOutEvents = record.timeOutEvents;
    let obj = {
        type: "TimeOut",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10),
    };
    timeOutEvents.push(obj);
    return record
};

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(event => event.date === date);
    const timeOut = record.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    const allWages = record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date));
    return allWages.reduce((total, wage) => total + wage);
}

function calculatePayroll(record) {
    const employeeTotal = record.map(record => allWagesFor(record))
    return employeeTotal.reduce((total, employee) => total + employee)
};
