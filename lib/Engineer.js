// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee")

class Engineer extends Employee {
    constructor(name,id,email,gitHub) {
        super(name, id, email , gitHub);
        this.gitHub = gitHub;
    }

    getGithub(){
        return this.gitHub;
    }
    getRole(){
        return "Engineer";
    }


}

module.exports = Engineer;