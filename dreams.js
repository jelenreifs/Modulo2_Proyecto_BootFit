const express = require("express");
const router = express.Router()


/* TODA LOS REGISTRIS DE SUEÑO */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("dreams")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
}); 



/* AÑADIR SEGUIMIENTO SUEÑO A LA COLECCIÓN */
router.post("/add", (req, res) => {

const dream = {
    dia: req.body.day,
    dormirInicio: req.body.dreamStart,
    dormirFin: req.body.dreamEnd
    }  

    console.log(req.body)
    
    let db = req.app.locals.db;
    db.collection("dreams")
    .insertOne(dream, (err, datos) => {
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