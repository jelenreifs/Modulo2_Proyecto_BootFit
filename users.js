const express = require("express");
const router = express.Router()


/* AÑADIR USUARIO A LA COLECCIÓN */
/* router.post("/registro", (req, res) => {
const userRegistrado = {
    tfno: req.body.tfno,
    password: req.body.password,   
}   */
    
 /*    let db = req.app.locals.db;
    db.collection("users")
        .find({ tfno: userRegistrsdo.tfno })
        .toArray((err, datos) => {
            if(err!=null) {
                res.send(err);
            } else {
    .insertOne(userRegistrado, (err, datos) => {
        if (err != null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
}); */





/* TODA LA COLECCIÓN DE USUARIOS */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("users")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
}); 
    


/* BUSCAR UN USUARIO */
/* router.get("/login", (req, res) => {
    const tfno = req.body.tfno;
        
    let db = req.app.locals.db;
    db.collection("users")
        .find({ tfno: tfno})
        .toArray((err, datos) => {
        if(err!=null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
}); 
 */



/* AÑADIR USUARIO A LA COLECCIÓN */
router.post("/add", (req, res) => {
const user = {
    tfno: req.body.tfno,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    objetivo: req.body.objetivo
    
}  
    
    let db = req.app.locals.db;
    db.collection("users")
    .insertOne(user, (err, datos) => {
        if (err != null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});


module.exports = router;