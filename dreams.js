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
    const dormir = req.body

const dream = {
    diaInicio: req.body.dayStart,
    diaFin: req.body.dayEnd,
    horaInicio: req.body.hourStart,
    horaFin: req.body.hourEnd,
    horasTotal: req.body.horasTotal
    }  
    
    let db = req.app.locals.db;
        db.collection("dreams")
            .insertOne(dream, (err, datos) => {
                console.log(dream)
                if (err != null) {
                    res.send(err);
                } else {
                    console.log(datos);
                    res.send(datos);
                }
        }) //insertOne
    }); // POSt
   


module.exports = router;