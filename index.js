function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map((employee) => createEmployeeRecord(employee));
  }

  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }

  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employee;
  }

  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  
    return hoursWorked;
  }

  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
  
    return wagesEarned;
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return totalWages;
  }

  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  
    return totalPayroll;
  }