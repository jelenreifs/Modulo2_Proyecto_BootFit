const express = require("express");
const router = express.Router()


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