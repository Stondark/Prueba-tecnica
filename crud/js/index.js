$( document ).ready(function() {
    console.log( "ready!" );
    var table = $("#lista-table").DataTable({ // Inicialización del datatable
        "language": {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
        },
        "ajax":{  
            url: "../controller/tienda-controller.php?op=listar",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        "columns": [
            {data: "id"},
            {data: "nombre"},
            {data: "fecha_apertura"},
            {data: null,
                defaultContent: "<button class='delete' id='delete' value=''><i class='fa-solid fa-trash'></i></button> <button class='edit' id='edit' value=''><i class='fa-solid fa-pen'></i></button>" ,
                orderable: false,
            }
        ],
        "responsive": true,

    });
    
    load_tienda();
    submit_tienda(table);
    edit_tienda("#lista-table tbody",table);
    delete_tienda("#lista-table tbody",table);

});



// CREAR NUEVA TABLA

$("#select-btn").on("click", function () {
    var id = $("#select_list").val();
    var table = $('#productos-table').DataTable();
    table.clear().destroy();
    if(id == 0){
        Swal.fire("Seleccione una tienda válida")
    } else{
        Swal.fire("Tabla seleccionada")
        dibujarProductos(id);
    }

});

function dibujarProductos(id) {
    var id_tienda = id;
    var table = $("#productos-table").DataTable({ // Inicialización del datatable
        "destroy": true,
        "deferRender": true,
        "retrieve": true,
        "language": {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
        },
        "ajax":{  
            url: "../controller/productos-controller.php?op=listar",
            data: {"id": id},
            type: "POST",
            datatype: "json",
            dataSrc: "",
        },
        "columns": [
            {data: "SKU"},
            {data: "nombre"},
            {data: "descripcion"},
            {data: "valor"},
            {data: "id_tienda"},
            {data: "imagen"},
            {data: null,
                defaultContent: "<button class='delete_p' id='delete_p' value=''><i class='fa-solid fa-trash'></i></button> <button class='edit_p' id='edit_p' value=''><i class='fa-solid fa-pen'></i></button>" ,
                orderable: false,
            }
        ],
        "responsive": true,

    });

    delete_producto("#productos-table tbody",table);
    edit_producto("#productos-table tbody",table, id_tienda);
    submit_producto(table, id_tienda);
}

// ELIMINAR PRODUCTO 

/* Función para el botón eliminar */
var delete_producto = function(tbody, table){
    $(tbody).on("click", "button.delete_p", function(){
        var data = table.row($(this).parents("tr")).data();
        //var id_inputs = $("#productos-table #delete").val(data.SKU);
        var sku_producto = data.SKU;
        alerta_eliminar(sku_producto);
        console.log(data.SKU);

/* Petición ajax para eliminar el producto */

        function ajax_producto(sku_producto) {
            let parametros = { "sku": sku_producto }
            $.ajax({
                data: parametros,
                url: '../controller/productos-controller.php?op=delete',
                type: 'POST',
                success:function(){
                    Swal.fire({
                            title: '¡Borrado con éxito!',
                            text: data.nombre + ' fue borrado con éxito',
                            icon: 'success',
                    })
                }, 
            })
        }

/* Función para mostrar la alerta de confirmación */
        function alerta_eliminar(sku_producto) {
            Swal.fire({
                title: '¿Está seguro de eliminar el producto?',
                text: 'El producto ' + data.nombre + '(' + data.SKU +') será eliminado',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#EB5160',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, elimínalo'
            }).then((result) => {
                if (result.isConfirmed) {
                    ajax_producto(sku_producto); // Llamado a la petición ajax
                    table.ajax.reload(); // Recarga de la tabla 
                }
            })
        }
    });
};

// EDITAR TIENDA

var edit_producto = function(tbody, table, id_tienda){
    $(tbody).on("click", "button.edit_p", function(){
        var data = table.row($(this).parents("tr")).data();
        var id_inputs = $("#productos-table #edit_p").val(data.SKU);
        var id_producto = data.SKU;
        var nombre_producto = data.nombre;
        console.log(id_tienda);
        Swal.fire({
            title: 'Editar producto '  + data.nombre,
            html:
            ' <form id="form-new-insert" enctype="multipart/form-data> "' +
            '<label for="">NOMBRE</label>' +
            '<input type="text" id="nombre" name="nombre" class="swal2-input">' +
            '<label for="">DESCRIPCIÓN</label>' +
            '<textarea id="descripcion" name="descripcion" class="swal2-input"></textarea>'+
            '<label for="">VALOR</label>' +
            '<input type="number" id="valor" name="valor" class="swal2-input">' +
            '<label for="">IMAGEN</label>' +
            '<input type="file" id="foto" name="foto" class="swal2-input">' +
            '</form>',
            focusConfirm: false,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                let nombre = document.getElementById('nombre').value
                let descripcion = document.getElementById('descripcion').value
                let valor = document.getElementById('valor').value
                let foto = document.getElementById('foto').value
                if(!nombre || !descripcion || !valor || !foto){
                    Swal.showValidationMessage("Ingrese valores en los campos vacíos");
                }
                return true;
            }
        }).then((result) =>{
            if(result.isConfirmed){
                if(result){
                    ajax_editProducto(id_producto, id_tienda);
                    table.ajax.reload();
                }
            }
        })

    });

    function ajax_editProducto(id_producto, id_tienda) {
        var aux_nombre = Swal.getPopup().querySelector("#nombre").value;
        var nombre_producto = aux_nombre[0].toUpperCase() + aux_nombre.slice(1); // Convertir primer carácter a mayúscula
        var descripcion = Swal.getPopup().querySelector("#descripcion").value;
        var valor = Swal.getPopup().querySelector("#valor").value;
        var foto = Swal.getPopup().querySelector("#foto").value;
        let parametros = {"sku": id_producto,"nombre": nombre_producto, "descripcion": descripcion, "valor": valor, "foto":foto, "id_tienda": id_tienda}
        console.log(parametros);
        $.ajax({
            data: parametros,
            url: '../controller/productos-controller.php?op=edit',
            type: 'POST',
            success: function(){
                Swal.fire({
                    title: 'Añadido!',
                    text: nombre_producto + ' fue editado correctamente',
                    icon: 'success',
                });
            },
        })
    }

}

// CREAR NUEVO PRODUCTO

// AJAX-> NUEVA TIENDA
var submit_producto = function(table, id){
    if(!$.fn.DataTable.isDataTable("#crear-producto") ){
        $("#crear-producto").on("click", function () {
            Swal.fire({
                title: "Añadir nuevo producto",
                html:
                ' <form id="form-new-insert" enctype="multipart/form-data> "' +
                '<label for="">NOMBRE</label>' +
                '<input type="text" id="nombre" name="nombre" class="swal2-input">' +
                '<label for="">DESCRIPCIÓN</label>' +
                '<textarea id="descripcion" name="descripcion" class="swal2-input"></textarea>'+
                '<label for="">VALOR</label>' +
                '<input type="number" id="valor" name="valor" class="swal2-input">' +
                '<label for="">IMAGEN</label>' +
                '<input type="file" id="foto" name="foto" class="swal2-input">' +
                '</form>',
                focusConfirm: false,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    let nombre = document.getElementById('nombre').value
                    let descripcion = document.getElementById('descripcion').value
                    let valor = document.getElementById('valor').value
                    let foto = document.getElementById('foto').value
                    if(!nombre || !descripcion || !valor || !foto){
                        Swal.showValidationMessage("Ingrese valores en los campos vacíos");
                    }
                    return true;
                }
            }).then((result) =>{
                if(result.isConfirmed && result){
                    ajax_nuevoProducto(id);
                    table.ajax.reload();
                }
            })
        })
    } else{
        Swal.fire("Agregue una tabla primero");
    }
    
}

function ajax_nuevoProducto(id){

    var datos = new FormData($("#form-new-insert")[0]);
    //let parametros = { "nombre": nombre_producto, "descripcion": descripcion, "valor": valor, "id_tienda": id, "foto": foto}
    $.ajax({
        data: datos,
        url: '../controller/productos-controller.php?op=add',
        type: 'POST',
        proccessData: 'false',
        contentType: 'false',
        cache: 'false',
        success: function(){
            load_tienda();

            Swal.fire({
                title: 'Añadido!',
                text: nombre_producto + ' se añadió correctamente',
                icon: 'success',
            });
            
        }
    })
}


// CARGAR TIENDAS
function load_tienda(){
    $.ajax({
        url: '../controller/tienda-controller.php?op=info',
        type: 'POST',
    })
    .done(function(res){
        $("#select_list").html(res);
    })
}



// AJAX-> NUEVA TIENDA
var submit_tienda = function(table){
    $("#crear-tienda").on("click", function () {
        Swal.fire({
            title: "Añadir nueva tienda",
            html:
            ' <form id="form-new-insert">' +
            '<label for="">NOMBRE</label>' +
            '<input type="text" id="nombre" name="nombre" class="swal2-input">' +
            '<label for="">FECHA CREACIÓN</label>' +
            '<input type="date" id="fecha" name="fecha" class="swal2-input" ">'+
            '</form>',
            focusConfirm: false,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                let nombre = document.getElementById('nombre').value
                let fecha = document.getElementById('fecha').value
                if(!nombre || !fecha){
                    Swal.showValidationMessage("Ingrese valores en los campos vacíos");
                }
                return true;
            }
        }).then((result) =>{
            if(result.isConfirmed && result){
                ajax_nuevaTienda();
                table.ajax.reload();
            }
        })
    })
}

function ajax_nuevaTienda(){

    var aux_nombre = Swal.getPopup().querySelector("#nombre").value;
    var nombre_tienda = aux_nombre[0].toUpperCase() + aux_nombre.slice(1); // Convertir primer carácter a mayúscula
    var fecha_aux = Swal.getPopup().querySelector("#fecha").value.split("-");
    var fecha = `${fecha_aux[2]}-${fecha_aux[1]}-${fecha_aux[0]}`;
    let parametros = { "nombre": nombre_tienda, "fecha": fecha}
    $.ajax({
        data: parametros,
        url: '../controller/tienda-controller.php?op=add',
        type: 'POST',
        success: function(){
            load_tienda();

            Swal.fire({
                title: 'Añadido!',
                text: nombre_tienda + ' se añadió correctamente',
                icon: 'success',
            });
            
        }
    }).done(function(res){
        if(res.error){
            Swal.fire("Ingrese una fecha válida (dd-mm-YYYY)");
        }
    })
}

// EDITAR TIENDA

var edit_tienda = function(tbody, table){
    $(tbody).on("click", "button.edit", function(){
        var data = table.row($(this).parents("tr")).data();
        var id_inputs = $("#lista-table #edit").val(data.id);
        var id_tienda = data.id;
        var nombre_tienda = data.nombre;
        console.log(id_tienda);
        Swal.fire({
            title: 'Editar tienda '  + data.nombre,
            html:` <form id="form-new-insert">
                <label for="">NOMBRE</label>
                <input type="text" id="nombre" name="nombre" class="swal2-input" value="${data.nombre}">
                <label for="">FECHA</label>
                <input type="date" id="fecha" name="fecha" class="swal2-input" ">
                </form>`,
            focusConfirm: false,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                let nombre = document.getElementById('nombre').value
                let fecha = document.getElementById('fecha').value
                if(!nombre || !fecha){
                    Swal.showValidationMessage("Ingrese valores en los campos vacíos");
                }
                return true;
            }
        }).then((result) =>{
            if(result.isConfirmed){
                if(result){
                    ajax_editTienda(id_tienda, nombre_tienda);
                    table.ajax.reload();
                    load_tienda();
                }
            }
        })

    });

    function ajax_editTienda(id_tienda, nombre_tienda) {
        var aux_nombre = Swal.getPopup().querySelector("#nombre").value;
        var nombre_tienda = aux_nombre[0].toUpperCase() + aux_nombre.slice(1); // Convertir primer carácter a mayúscula
        var fecha_aux = Swal.getPopup().querySelector("#fecha").value.split("-");
        var fecha = `${fecha_aux[2]}-${fecha_aux[1]}-${fecha_aux[0]}`;
        let parametros = {"id": id_tienda,"nombre": nombre_tienda, "fecha": fecha}
        console.log(parametros);
        $.ajax({
            data: parametros,
            url: '../controller/tienda-controller.php?op=edit',
            type: 'POST',
            success: function(){
                Swal.fire({
                    title: 'Añadido!',
                    text: nombre_tienda + ' fue editado correctamente',
                    icon: 'success',
                });
            },
        })
    }

}

// ELIMINAR TIENDA 

/* Función para el botón eliminar */
var delete_tienda = function(tbody, table){
    $(tbody).on("click", "button.delete", function(){
        var data = table.row($(this).parents("tr")).data();
        var id_inputs = $("#lista-table #delete").val(data.id);
        var id_tienda = data.id;
        alerta_eliminar(id_tienda);
        console.log("Hola");

/* Petición ajax para eliminar el producto */

        function eliminar_tienda(id_tienda) {
            let parametros = { "id": id_tienda }
            $.ajax({
                data: parametros,
                url: '../controller/tienda-controller.php?op=eliminar',
                type: 'POST',
                success:function(){
                    Swal.fire({
                            title: '¡Borrado con éxito!',
                            text: data.nombre + ' fue borrado con éxito',
                            icon: 'success',
                    })
                }, 
            })
        }

/* Función para mostrar la alerta de confirmación */
        function alerta_eliminar(id_tienda) {
            Swal.fire({
                title: '¿Está seguro de eliminar la tienda?',
                text: 'El cliente ' + data.nombre + '(' + data.id +') será eliminado',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#EB5160',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, elimínalo'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminar_tienda(id_tienda); // Llamado a la petición ajax
                    table.ajax.reload(); // Recarga de la tabla 
                    load_tienda();
                }
            })
        }
    });
};
