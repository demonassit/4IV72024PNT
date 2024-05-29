const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//toda la api la vamos a manejar con JSON
//los archivos con json tienen en formato clave valor, como si fuera un diccionario donde tenemos clave : valor

const {json} = require('express');
const app = express();

//vamos a decirle a nuestra aplicacion que usara todo en formato json

app.use(express.json());
//vamos a decirle que estamos ocupando un middleware, que se encarga de las conexiones entre la aplicacion en bootstrap con nuestra API
app.use(cors());

//establecemos los parametros de la conexion
const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'articulosbd'
});

//vamos a realizar la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion Exitosa si conected');
    }
});

//vamos a empezar por definir las rutas para saber como se va a consumir el servicio

app.get('/', function(req, res){
    res.send('Ruta Inicio')
});

//quiero mostrar los articulos
app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});


//Buscar un solo articulo
app.get('/api/articulos/:id', (req, res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila);
        }
    });
});

//para guardar un articulo
app.post('/api/articulos', (req, res)=>{
    let data = {
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock
    }
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error, result){
        if(error){
            throw error
        }else{
            //lo primero que tenemos que decirle es tenemos un id autoincrementable significa que tenemos que agregar id a la query
            Object.assign(data, {id:result.insertId});
            res.send(data);
        }
    });
});

//para editar un registro
app.put('/api/articulos', (req, res)=>{
    let id = req.params.id;
    let descripcion = req.params.descripcion;
    let precio = req.params.precio;
    let stock = req.params.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})

//eliminar un articulo
app.delete('/api/articulos/:id', (req, res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?',[req.params.id], function(error, fila){
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });
});

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
});