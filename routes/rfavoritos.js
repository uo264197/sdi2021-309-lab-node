module.exports = function(app, swig, gestorBD) {

    app.get('/favoritos', function(req,res) {
        let criterio = { autor : req.session.usuario };
        gestorBD.obtenerFavoritos(criterio, function(canciones) {
            if (canciones == null) {
                res.send("Error al mostrar favoritos");
            } else {
                let respuesta = swig.renderFile('views/bfavoritos.html',
                    {
                        canciones : canciones
                    });
                res.send(respuesta);
            }
        });
    })

    app.get('/favoritos/add/:id', function(req,res) {
        if ( req.session.usuario == null){
            res.redirect("/tienda"); return;
        }
        let favorito = {
            id : req.session.id,
            nombre : req.session.nombre,
            precio : req.session.precio,
            autor : req.session.usuario
        }

        // Conectarse
        gestorBD.insertarFavorito(favorito, function(id){
            if (id == null) {
                res.send("Error al insertar canción");
            } else {
                res.send("Agregada id: "+ id);
            }
        });
    })



}