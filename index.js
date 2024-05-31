// Need to install
// npm install mysql
// npm install express
// npm install cors
// npm install body-parser
// npm install nodemon
// to open node post-end-point.js or nodemon index.js

// Basic setup of library
let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hr'
});
connection.connect(
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
    }
);


// GET API end point defination
app.get('/', function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    return res.json(a + b);
});

// POST API end point defination
app.post('/test-post', function (req, res) {
    console.log(req.body);
    return res.json('success');
});

// DB
app.post('/add_user', function (req, res) {

    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        password: req.body.password
    };

    connection.query(`INSERT INTO user (fname, lname, email, gender, dob, password) VALUES ('${user.fname}', '${user.lname}', '${user.email}', '${user.gender}', '${user.dob}', '${user.password}');`,
        function (err, result) {
            if (err) {
                res.json({
                    error: err,
                })
            } else {
                res.json({
                    result: result,
                })
            }
        }
    );
})

app.listen(3000);