const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const router = express.Router()

let users = require("./users");
let activities = require("./activities");
let dreams = require("./dreams");
let entrenamientos = require("./entrenamientos");
//let seguimiento = require("./entrenamientos");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let MongoClient = mongodb.MongoClient;
let db;


/* CONEXIÓN CON LA BASE DE DATOS */
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if(err!==null) {
        console.log(err);
    } else {
        app.locals.db = client.db("BootFit");
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
    console.log("Current directory:", __dirname); 
}); 

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/dashboard.html'))
}); 

/* let path1 = path.resolve(__dirname, "public/seguimiento.html"); 
console.log(path1) 
 */

 router.get("/seguimiento", (req, res) => {
     res.sendFile(path.resolve(__dirname, 'public/seguimiento.html'))
       db.collection("entrenamientos")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
 }); 





app.use("/users", users);
app.use("/activities", activities);
app.use("/dreams", dreams);
app.use("/entrenamientos", entrenamientos); 
//app.use("/", seguimiento); 




app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          
