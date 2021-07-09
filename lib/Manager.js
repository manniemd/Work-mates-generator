const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        var role = "Manager";
        return role;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;