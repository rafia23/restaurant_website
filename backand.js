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
    database: 'savory_sizzle'
});
connection.connect(
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('DB connected successfully!');
        }
    }
);


// GET API end point definition - REST API
app.get('/', function (req, res) {
    return res.json('Hello from Server!');
});



// POST API end point definition
app.post('/test-post', function (req, res) {
    console.log(req.body);
    return res.json({
        message: 'Post API called successfully!',
        data: req.body
    });
});

// DB
app.post('/add-message', function (req, res) {

    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message
    };

    const query = `INSERT INTO contact
                    (fname, lname, email, mobile ,message)
                    VALUES
                    ('${contact.fname}', '${contact.lname}', '${contact.email}', '${contact.mobile}', '${contact.message}');`;
    console.log(query);

    connection.query(query,
        function (err, result) {
            if (err) {
                res.json({
                    error: err,
                })
            } else {
                console.log(result);
                res.json({
                    result: result,
                })
            }
        }
    );
})

//get message

app.post('/get-message', function (req, res) {
    

    const query = `SELECT * FROM contact ;`;

    connection.query(query, function (err, result) {
        if (err) {
            res.status(400);
            res.json({
                error: "Failed to get user info",
            });
        } else {
            res.status(200);
            res.json({
                user: result[0],
            });
        }
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000', 'url: http://localhost:3000/');
});
