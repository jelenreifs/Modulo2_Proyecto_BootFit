const express = require("express");
const router = express.Router()


router.get("/", (req, res) => {
    let db = req.app.locals.db;
    db.collection("entrenamientos")
        .find()
        .toArray((err, datos) => {
        if(err!=null) {
            console.log(err);
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});



router.post("/add", (req, res) => { 
    const entrenamiento = req.body

   let db = req.app.locals.db;
    db.collection("users")
        .find({ tfno: entrenamiento.tfno }).toArray((err, user) => {
            if (err != null) {
                res.send(err)
            } else {
                if (user.length === 0) {
                    res.send({ mensaje: "No hay usuario registrado" });
                } else {
                    db.collection("activities")
                        .find({
                            actividad: entrenamiento.activity
                        }).toArray((err, rutina) => {
                            if (err != null) {
                                res.send(err);
                            } else {
                                db.collection("entrenamientos").insertOne({
                                    actividad: entrenamiento.activity,
                                    intensidad: entrenamiento.intensidad,
                                    duracion: parseInt(entrenamiento.duration),
                                    calorias: (entrenamiento.duration * rutina[0].intensidad[entrenamiento.intensidad][0].calorias) / 30,
                                    pasos: (entrenamiento.duration * rutina[0].intensidad[entrenamiento.intensidad][0].pasos) / 30
                                }, ((err, datos) => {
                                    if (err != null) {
                                        res.send(err);
                                    } else {
                                        res.send(datos);
                                    }
                                })
                                ) 
                            }
                        }) 
                    }
                }
        }) 
 })
    


module.exports = router;