const express = require("express");
const router = express.Router();


/* TODA LA COLECCIÓN DE ACTIVIDADES */
router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("activities")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
}); 


/* AÑADIR UNA ACTIVIDAD A LA COLECCIÓN */
router.post("/add", (req, res) => {

    const activity = {
    actividad: req.body.actividad,
    intensidad: req.body.intensidad,
    calorias: parseInt(req.body.calorias),
    pasos: parseInt(req.body.pasos),
    duracion: parseInt(req.body.duracion)
    } 


/* const activity = {
    actividad: req.body.activity,
    intensidad: req.body.intensity,
    calorias: parseInt(req.body.calories),
    pasos: parseInt(req.body.steps),
    duracion: parseInt(req.body.duration)
    } 
 */
    console.log(activity);
    
    console.log(req.body)
    
    let db = req.app.locals.db;
    db.collection("activities")
    .insertOne(activity, (err, datos) => {
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