const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "Output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

start()
const employees = [];

function start() {
    CreateNewEmployee();
}

async function CreateNewEmployee() {
    let employee = '';
    let role = '';
    await inquirer.prompt([{
            type: "input",
            message: "What is the member's name?",
            name: "nameResponse"
        },
        {
            type: 'input',
            message: "What is the member's id?",
            name: 'idResponse'
        }, {
            type: 'input',
            message: "What is the member's email?",
            name: 'emailResponse'
        }, {
            type: 'list',
            message: "What is the member's role?",
            choices: ["Manager", "Engineer", "Intern"],
            name: 'roleResponse',
        }
    ]).then(function ({
        nameResponse,
        idResponse,
        emailResponse,
        roleResponse
    }) {
        let question = ''
        if (roleResponse == "Manager") {
            question = "the manager phone number:";
        } else if (roleResponse == "Engineer") {
            question = "the engineer github username:";
        } else if (roleResponse == "Intern") {
            question = "the college the intern attended:";
        }
        inquirer.prompt([{
            message: `Enter the ${question}`,
            type: "input",
            name: "memberInfo"
        }]).then(function ({
            memberInfo
        }) {
            if (roleResponse === "Manager") {
                employee = new Manager(nameResponse, idResponse, emailResponse, memberInfo)
                employees.push(employee);
                role = "Manager";
            } else if (roleResponse === "Engineer") {
                employee = new Engineer(nameResponse, idResponse, emailResponse, memberInfo)
                employees.push(employee);
                role = "Engineer";
            } else if (roleResponse === "Intern") {
                employee = new Intern(nameResponse, idResponse, emailResponse, memberInfo)
                employees.push(employee);
                role = "Intern";
            }
            inquirer.prompt({
                type: "list",
                message: "Add another member?",
                choices: ["Yes", "No"],
                name: "response"
            }).then(function ({
                response
            }) {
                if (response === "Yes") {
                    console.log(`${role} profile created`);
                    CreateNewEmployee();
                } else {
                    fs.writeFile(outputPath, render(employees), (err => err))
                };
            });
        });
    });
};
