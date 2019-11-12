const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
var fs = require("fs");
let employees = [];

getUserInfo();


async function getUserInfo() {

 
    const { position } = await inquirer.prompt([
        {
            type: "list",
            message: "Choose the position that you want to create the info card for!",
            name: "position",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ])

    async function getEngineerInfo() {
        const { name, id, email, github } = await inquirer.prompt([
            {
                message: "What's your name?",
                name: "name"
            },
            {
                message: "What's your ID?",
                name: "id"
            },
            {
                message: "What's your email?",
                name: "email"
            },
            {
                message: "Enter your GitHub username",
                name: "github"
            }
        ])
        let engineer = new Engineer(name, id, email, github);
        employees.push(engineer);

        getUserInfo();
    }
    async function getInternInfo() {
        const { name, id, email, school } = await inquirer.prompt([
            {
                message: "What's your name?",
                name: "name"
            },
            {
                message: "What's your ID?",
                name: "id"
            },
            {
                message: "What's your email?",
                name: "email"
            },
            {
                message: "What's your school",
                name: "school"
            }
        ])
        let intern = new Intern(name, id, email, school);
        employees.push(intern);

        getUserInfo();
    }
    async function getManagerInfo() {
        const { name, id, email, officeNumber } = await inquirer.prompt([
            {
                message: "What's your name?",
                name: "name"
            },
            {
                message: "What's your ID?",
                name: "id"
            },
            {
                message: "What's your email?",
                name: "email"
            },
            {
                message: "What's your office number",
                name: "officeNumber"
            }
        ])
        let manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);

        getUserInfo();
    }

    switch (position) {

        case "Manager":
            return getManagerInfo();
            break;
        case "Engineer":
            return getEngineerInfo();
            break;
        case "Intern":
            return getInternInfo();
            break;
        case "Done":

            fs.writeFile("index.html", html(employees), function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("You did it!");

            });
            break;
    }

}

let html = function (data) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</head>
<body>
    <style>
        .ul{
            list-style-type:none;
            right: -200px;
            position: relative;
        }
        li{
            float: left;
            margin-left: 20px;
        }
        .cardbody{
            width: 200px;
            border-radius: 10px;
            box-shadow: 5px 10px 8px #888888;
        }
    </style>
	<div class="jumbotron" style="background: gray" > 
		<h1 class="text-center" >Company Employees</h1>
    </div>
    <ul class="ul">
        
    ${getContent(data)}
        
    </ul>
</body>
</html>
`
}
function getContent(data) {

    return data.map(x => {
        let position = x.getRole();
        console.log(position);
        switch (position) {
            case "Manager":
                return getManagerCard(x);
                break;
            case "Engineer":
                return getEngineerCard(x);
                break;
            case "Intern":
                return getInternCard(x);
                break;
        }

    }).join('\n')
}

function getManagerCard(x) {

    let mangerCard =
        `
    <li>
    <div class="col-md-3">
    <div class="card cardbody">
      <div class="card-header" style="background: #5178ed">
                   ${x.name}<br>
                   <div class="fa fa-edit">${x.getRole()}</div>
                  </div>
      <div class="card-body">
        <form role="form">			
          <div class="form-group">
              <label for="reserve-unique-id" id="reserve-unique-id">ID: ${x.id}</label>
          </div>
          <div class="form-group">
            <label for="reserve-email" id="reserve-email">Email: ${x.email}</label>
          </div>
          <div class="form-group">
              <label for="reserve-phone" id="reserve-office-number">Office Number: ${x.officeNumber}</label>					
          </div>				
          </form>
      </div>
    </div>
  </div>
  </li>
  `

    return mangerCard
}
function getEngineerCard(x) {
    let engineerCard =
        `
        <li>
        <div class="col-md-3">
                    <div class="card cardbody">
                      <div class="card-header" style="background: #5178ed">
                                   ${x.name}<br>
                                  <div><i class="fa fa-book"></i> ${x.getRole()}</div><i class="">
                                  </div>
                      <div class="card-body">
                        <form role="form">			
                          <div class="form-group">
                              <label for="reserve-unique-id" id="reserve-unique-id">ID:${x.id} </label>
                          </div>
                          <div class="form-group">
                            <label for="reserve-email" id="reserve-email">Email: ${x.email}</label>
                          </div>
                          <div class="form-group">
                              <label for="reserve-phone" id="school">School: ${x.school}</label>					
                          </div>				
                          </form>
                      </div>
                    </div>
                  </div>
                  </li>
    `
    return engineerCard
}
function getInternCard(x) {
    let internCard =
        `
    <li>
    <div class="col-md-3">
				<div class="card cardbody">
				  <div class="card-header" style="background: #5178ed">
							   ${x.name}<br>
							  <div><i class="fa fa-coffee"></i> ${x.getRole()}</div>
							  </div>
				  <div class="card-body">
					<form role="form">			
					  <div class="form-group">
						  <label for="reserve-unique-id" id="reserve-unique-id">ID:${x.id} </label>
					  </div>
					  <div class="form-group">
						<label for="reserve-email" id="reserve-email">Email: ${x.email}</label>
					  </div>
					  <div class="form-group">
						  <label for="reserve-phone" id="school">School: ${x.school}</label>					
					  </div>				
					  </form>
				  </div>
				</div>
              </div>
              </li>

    `
    return internCard
}


