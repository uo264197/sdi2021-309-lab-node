module.exports = function(app, swig, gestorBD) {
    app.post('/comentarios/:cancion_id', function(req, res) {
        if ( req.session.usuario == null){
            res.send("Error al insertar comentario, no hay usuario conectado"); return;
        }
        let comentario = {
            autor : req.session.usuario,
            texto : req.body.texto,
            cancion_id : gestorBD.mongo.ObjectID(req.params.cancion_id)
        }

        // Conectarse
        gestorBD.insertarComentario(comentario, function(id){
            if (id == null) {
                res.send("Error al insertar comentario");
            } else {
                res.send("Agregada id: "+ id);
            }
        });
    })

    app.post('/comentario/borrar/:id', function(req,res) {
        if ( req.session.usuario != req.body.autor){
            res.send("Error al borrar comentario, no es un comentario del usuario conectado"); return;
        }

        let criterio = { "_id" : gestorBD.mongo.ObjectID(req.params.id) };
        gestorBD.borrarComentario(criterio, function(result) {
            if (result == null) {
                res.send("Error al borrar ");
            } else {
                res.send("Comentario borrado");
            }
        });
    })
}