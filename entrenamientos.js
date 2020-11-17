const express = require("express");
const router = express.Router()

/* AÑADIR ENTRENAMIENTOS PARA CADA USER */
router.post("/add", (req, res) => {
    const entrenamiento = req.body
    
/*     const calculos = {
        calorias : entrenamiento.duracion * entrenamiento.calorias / 30,
        pasos: (entrenamiento.duracion * entrenamiento.pasos) / 30
    } */
    
    let db = req.app.locals.db;
    db.collection("users")
        .find({ tfno: entrenamiento.tfno }).toArray((err, user) => {
            if (err != null) {
                res.send(err)
            } else {
                if (user.length === 0) {
                    res.send({ mensaje: "No hay un usuario registrado con ese Nº de teléfono" });
                } else {
                    db.collection("activities")
                        .find({
                            actividad: entrenamiento.activibity,
                            intensidad: entrenamiento.intensity,
                            duracion: entrenamiento.duration,
                            calorias: entrenamiento.calories,
                            pasos: entrenamiento.steps

                        }).toArray((err, rutina) => {
                            if (err != null) {
                                res.send(err);
                            } else {
                                if (rutina[0] === "intensivo" || rutina[0] === "moderado" || rutina[0] === "suave"  ) {
                                    res.send({ mansaje:"Categoría seleccionada" });
                                } else {
                                    db.collection("entrenamientos")
                                        .insertOne({ 
                                            actividad: entrenamiento.activity,
                                            intensidad: entrenamiento.intensity,
                                            duracion: parseInt(entrenamiento.duration),
                                            calorias : (entrenamiento.duration * entrenamiento.calories) / 30,
                                            pasos: (entrenamiento.duration * entrenamiento.steps) / 30
                                         /*    calorias: calculos.calorias,
                                            pasos: calculos.pasos,
 */
                                        }, (err, datos) => {
                                            if (err != null) {
                                                res.send(err);
                                            } else {
                                                res.send(datos);
                                                console.log(datos)
                                            }
                                        }
                                    )
                                }
                            }
                        }) // find
                    }
                }
            }) // find 

    }) // POST
 


module.exports = router;