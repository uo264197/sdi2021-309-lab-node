module.exports = function(app, swig) {
    app.get("/autores", function(req, res) {
        let autores = [ {
            "nombre" : "Autor1",
            "grupo" : "Grupo1",
            "rol" : "guitarrista"
        }, {
            "nombre" : "Autor2",
            "grupo" : "Grupo2",
            "rol" : "cantante"
        }, {
            "nombre" : "Autor3",
            "grupo" : "Grupo1",
            "rol" : "bateria"
        } ];

        let respuesta = swig.renderFile('views/bautores-lista.html', {
            autores : autores
        });

        res.send(respuesta);
    });

    app.get('/autores/agregar', function (req, res) {
        let roles = [ "cantante", "bateria", "guitarrista", "bajista", "teclista" ];
        let respuesta = swig.renderFile('views/autores-agregar.html', {
            roles : roles
        });
        res.send(respuesta);
    })

    app.get('/autores/:param', function(req, res) {
        res.redirect("/autores");
    });

    app.post("/autor", function(req, res) {
        res.send("Autor agregado:"+req.body.nombre +"<br>"
            +" Grupo :" +req.body.grupo + "<br>"
            +" Rol: "+req.body.rol);
    })
}