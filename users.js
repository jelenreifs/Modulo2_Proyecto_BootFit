const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()

/*******************************************/
/*              GET USUARIOS              */
/******************************************/

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


/*******************************************/
/*          REGISTRO: POST USER           */
/******************************************/

router.post("/add", function(req, res) {
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


/*******************************************/
/*               LOGIN            */
/******************************************/

router.post("/login", function (req,res) {
    let tfno = req.body.tfno;
    let password = req.body.password;

    let db = req.app.locals.db;
  db.collection("users")
    .find({ tfno: tfno })
    .toArray(function (err,arrayUsuario) {
      if (err !== null) {
        res.send({ mensaje: "Ha habido un error" });
      } else {
        if (arrayUsuario.length > 0) { 
          if (bcrypt.compareSync(password,arrayUsuario[0].password)) {
            res.send({ mensaje: "Logueado correctamente" , usuario: arrayUsuario});

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