const express = require("express");
const mongodb = require("mongodb");
const app = express();

let users = require("./users");
let activities = require("./activities");
let dreams = require("./dreams");
let entrenamientos = require("./entrenamientos");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let MongoClient = mongodb.MongoClient;
//let db;


/* CONEXIÓN CON LA BASE DE DATOS */
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if(err!==null) {
        console.log(err);
    } else {
        app.locals.db = client.db("BootFit");
    }
});





app.use("/users", users);
app.use("/activities", activities);
app.use("/dreams", dreams);
app.use("/entrenamientos", entrenamientos);



app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          
