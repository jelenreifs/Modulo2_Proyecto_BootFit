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



/* AÑADIR USUARIO AL REGISTRO */
router.post("/registro", function(req, res) {
    let tfno = req.body.tfno;
    let password = req.body.password;
    let contraseinaCifrada = bcrypt.hashSync( password, 10 );

    let db = req.app.locals.db;
    db.collection("users")
        .insertOne({
            tfno: tfno,
            password: contraseinaCifrada
        }, function (err, result) {
     if(err !== null){
       res.send({mensaje: "Error al registrar el usuario"} )
     }else{
       res.send({mensaje: "Usuario registrado correctamente"})
     }
   })
})



/* PARA EL LOGIN */
router.post("/login", function (req, res) {
    let tfno = req.body.tfno;
    let password = req.body.password;

    let db = req.app.locals.db;
  db.collection("users")
    .find({ tfno: tfno })
    .toArray(function (err, arrayUsuario) {
      if (err !== null) {
        res.send({ mensaje: "Ha habido un error" });
      } else {
        if (arrayUsuario.length > 0) {
          if (bcrypt.compareSync(password,   arrayUsuario[0].password)) {
            res.send({ mensaje: "Logueado correctamente" });
          } else {
            res.send({ mensaje: "Contraseña incorrecta" });
          }
        } else {
          res.send({ mensaje: "El usuario no existe" });
        }
      }
    });
});

 




module.exports = router;