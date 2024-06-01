const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const PORT = 8000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "savory_sizzle"
});

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('img'));
app.use(bodyParser.json());

app.use(cors());

app.get("/", function(req,res)
{
    res.sendFile(__dirname+'/index.html');
});

app.get("/menu", function(req,res)
{
    res.sendFile(__dirname+'/menu.html');
});

app.get("/order", function(req,res)
{
    res.sendFile(__dirname+'/order.html');
});

app.post('/menu_items', function (req, res) {
    const id = req.body.id;
    console.log(id);

    const query = `SELECT * FROM menu WHERE id = '${id}';`;
    console.log(query);
    db.query(query, function (err, result) {
        if (err) {
            res.status(400);
            res.json({
                error: "Failed to get items",
            });
        } else {
            res.status(200);
            res.json({
                success:true,
                result:result[0],
            });
        }
    });
});

app.post("/order_info", function(req,res) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const productid = req.body.productid;

    const sql = `INSERT INTO orders (name, email, phone, address, productid) VALUES ( ?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, phone, address, productid], function(err, result) {
        if (err) {
            res.status(400);
            res.json({
                error: "Order couldn't take place",
            });
        } else {
            res.status(200);
            res.json({
                success: true,
            });
        }
    });
});



app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});