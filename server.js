const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysqlpassword',
    database: 'employees_db',
});
const addEmployee = () => {
inquirer
    .prompt({
        name: 'first_name',
        type: 'input',
        message: 'Add employee\'s first name:'
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'Add employee\'s last name:'
    },
    {
        name: 'role',
        type: 'list',
        message: 'Select employee\'s role:',
        choices() {
            const choiceArray = [];
            results.forEach(() => {
              choiceArray.push();
            });
            return choiceArray;
        }
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Select employee\'s manager:'
    })
    .then((answers) => {
        // answers.role.find(role);
        connection.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: role_id,
                manager_id: manager_id,
            },
            (err) => {
                if (err) throw err;
                console.log('Your auction was created successfully!');
                runAction();
            })
    })
};
const runAction = () => {
inquirer
    .prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
        'Add employee',
        'Add role',
        'Add department',
        'View employees by role',
        'View employees by department',
        'View employees by manager',
        'Update employee',
        'Update role',
        'Update department'
    ],
    })
    .then((answer) => {
    switch (answer.action) {
        case 'Add employee':
        addEmployee();
        break;

        case 'Add role':
        addRole();
        break;

        case 'Add department':
        addDepartment();
        break;

        case 'View employees by role':
        tableEmployees(role);
        break;

        case 'View employees by department':
        tableEmployees(department);
        break;

        case 'View employees by manager':
        tableEmployees(manager);
        break;

        case 'Update employee':
        updateEmployee();
        break;

        case 'Update role':
        updateRole();
        break;

        case 'Update department':
        updateDepartment();
        break;

        default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
    });
};
connection.connect((err) => {
    if (err) throw err;
    runAction();
});
  