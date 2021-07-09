const fs = require("fs");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const util = require("util");
const inquirer = require("inquirer");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRender.js");
const { ENGINE_METHOD_RSA } = require("constants");
const writetoFile = util.promisify(fs.writeFile);

//variables
const managers = [];
const interns = [];
const engineers = [];
let ismanagerPicked = false;
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter employee name.",
        },
        {
            type: "list",
            name: "role",
            message: "Employee title: ",
            choices: ismanagerPicked ? ["Engineer", "Intern"] : ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Employee's email address:",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office number:",
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "GithubID:",
            when: (answers) => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Name of school:",
            when: (answers) => answers.role === "Intern"
        },
        {
            type: "confirm",
            name: "continue",
            message: "Would you like to enter another employee?"
        }
    ]);
}
async function init() {
    try {
        const answer = await promptUser();
        if (answer.role === "Manager") {
            managers.push(new Manager(answer.name, answer.id, answer.email, answer.officeNumber));
            ismanagerPicked = true;
        }
        else if (answer.role === "Engineer") {
            engineers.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
        }
        else {
            interns.push(new Intern(answer.name, answer.id, answer.email, answer.school));
        }
        if (answer.continue) {
            init();
        }
        else {
            console.log("Your Work-Mates has been created.");
            const htmlFile = render([...managers, ...engineers, ...interns]);

            await writetoFile("./output/index.html", htmlFile);
        }
    }
    catch (err) {
        console.log(err)
    }
}
init();
