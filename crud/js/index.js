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

$("#select-btn").on("click", function () {
    let id = $("#select_list").val()
    id == 0 ? Swal.fire("Seleccione una tienda válida") : select_tienda(id);

});



// SELECTOR DE TIENDA

function select_tienda(id){
    let parametros = {"id": id}
    $.ajax({
        url: '../controller/tienda-controller.php?op=select',
        type: 'POST',
        data: parametros
    })
    .done(function(res){
        Swal.fire("Se seleccionó la tienda")
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
