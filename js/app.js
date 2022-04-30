// variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando se agrega un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //muestra los cursos del local storage
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHtml();
    });

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[];
        limpiarHtml();
    });
}


//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}
//eliminar curso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');

        //elimina del arreglo de articuloscarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso =>curso.id !== cursoId);
        carritoHtml(); //iterar sobre el carrito y mostra su html
    }
}

//leer datos del contenido html al que se le click y extraer la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }
    else{
        //agregamos el curso al carrito
         //agrega elementos al arreglo de carrito
         articulosCarrito = [...articulosCarrito,infoCurso];

    }

    console.log(articulosCarrito);

    carritoHtml();
}

//muestra el carrito de compras en el html
function carritoHtml(){

    //limpiar el html
    limpiarHtml();   
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compras al storage
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

//elimina los cursos del tbody
function limpiarHtml(){
    // forma lenta contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
