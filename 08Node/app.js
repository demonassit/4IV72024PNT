//vamos a crear nuestro propio servidor

var http = require('http');

//todo servidor debe de poder atender peticiones y debe de generar respuestas, por lo tanto nuestra funcion debe tener dos parametros request, response

var servidor = http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write('<h2>Hola mundo esto es mi primer servidor que hace lo mismo que todos los demas, pero en chiquito, habia una vez un patito que decia miau miau  mañana me desquitare y les dejare un examen bien feo porque platican mucho :3 </h2>');
    console.log('Se hizo una peticion web');
    response.end();
});

//en que puerto va a estar funcionando el servidor
servidor.listen(3000);

//ejecutamos en consola
console.log('Ejecutando el servidor en puerto 3000');