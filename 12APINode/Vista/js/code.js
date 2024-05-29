/*
Este proyecto tiene como fin poder consumir una base de datos
significa que el proyecto esta dividido en dos partes 

la aplicacion visual para el usuario
API con mysql*/



//url de donde se encuentra la BD
const url = "http://localhost:3000/api/articulos";

const contenedor = document.querySelector('tbody');

let resultados = '';

//elementos del modal

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));

const formArticulo = document.getElementById('form');

const descripcion = document.getElementById('descripcion');

const precio = document.getElementById('precio');

const stock = document.getElementById('stock');

//necesitamos una variable para elegir una opcion
let opcion = '';

//vamos a dar la accion para que muestre el modal
btnCrear.addEventListener('click', ()=>{
    //primero vamos a vaciar los campos del modal
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
    //vamos a usar el metodos de bootstrap para ejecutar el modal
    modalArticulo.show();

    //vamos a darle opciones a nuestro boton
    opcion = 'crear';
});

//voy a crear una funcion para obtener todos los articulos

const mostrar = (articulos) =>{
    //tenemos que obtener cada una de las filas de la consulta
    articulos.forEach(articulo => {
        resultados += `
            <tr>
                <td> ${articulo.id} </td>
                <td> ${articulo.descripcion} </td>
                <td> ${articulo.precio} </td>
                <td> ${articulo.stock} </td>
                <td class="text-center" > <a class="btnEditar btn btn-primary" >Editar</a> <a class="btnBorrar btn btn-danger" >Borrar</a></td>
            </tr>
        `
    });
    //mostrar los resultados de la querry
    contenedor.innerHTML = resultados;
}

//vamos a conectar para que se muestren los elementos
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));


//un procedimiento para borrar
//un procedimiento para editar
//un procedimiento para guardar

const on = (element, event, selector, handler) => {
    console.log(element);
    console.log(event);
    console.log(selector);
    console.log(handler);
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e);
        }
    });     
}

//vamos a borrar
on(document, 'click', '.btnBorrar', e => {
    //lo primero es identificar la fila
    const fila = e.target.parentNode.parentNode;
    //ya que se donde esta la fila, necesito el id
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm("¿Estas seguro de borrar este registro?", function(){
        fetch(url+id, {
            method : 'DELETE'
        })
        .then(res => res.json())
        .then( ()=> location.reload() )
    }, function(){
        alertify.error('Cancelar')
    });
});

//para editar
//primero debemos de enviar los datos de la fila al modal 
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const descripcionForm = fila.children[1].innerHTML;
    console.log(descripcionForm);
    const precioForm = fila.children[2].innerHTML;
    const stockForm = fila.children[3].innerHTML;
    //ya que los identifique ahora obtener el valor
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    opcion = 'editar';
    modalArticulo.show();
})