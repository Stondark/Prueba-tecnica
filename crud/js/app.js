$( document ).ready(function() {
    console.log( "ready!" );
    select_tienda();
});

// CREAR NUEVA TIENDA 

$("#crear-tienda").on("click", function () {
    Swal.fire({
        title: "Añadir nueva tienda",
        html:
        ' <form id="form-new-insert">' +
        '<label for="">NOMBRE</label>' +
        '<input type="text" id="nombre" name="nombre" class="swal2-input">' +
        "</form>",
        focusConfirm: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            let nombre = document.getElementById('nombre').value
            if(!nombre){
                Swal.showValidationMessage("Ingrese valores en los campos vacíos");
            }
            return true;
        }
    }).then((result) =>{
        if(result.isConfirmed && result){
            ajax_nuevaTienda();
        }
    })
});



// PETICIONES AJAX 

// AJAX -> SELECT TIENDA

function select_tienda(){
    $.ajax({
        url: '../controller/tienda-controller.php?op=info',
        type: 'POST',
    })
    .done(function(res){
        $("#select_list").html(res);
    })
}

// AJAX-> NUEVA TIENDA

function ajax_nuevaTienda(){

    var aux_nombre = Swal.getPopup().querySelector("#nombre").value;
    var nombre_tienda = aux_nombre[0].toUpperCase() + aux_nombre.slice(1); // Convertir primer carácter a mayúscula
    let objDate = new Date(); // Creamos un objeto tipo fecha
    let dia_aux = objDate.getDate(); let dia = ("0" + dia_aux).slice(-2);
    let mes_aux = objDate.getMonth() + 1; let mes = ("0" + mes_aux).slice(-2); // Tomamos la fecha actual y le añadimos 0 para cumplir con el formato
    let anio = objDate.getFullYear(); 
    var fecha = `${dia}/${mes}/${anio}`; // Le damos formato dd-mm-YYYY
    let parametros = { "nombre": nombre_tienda, "fecha": fecha}
    $.ajax({
        data: parametros,
        url: '../controller/tienda-controller.php?op=add',
        type: 'POST',
        success: function(){
            select_tienda();
            Swal.fire({
                title: 'Añadido!',
                text: nombre_tienda + ' se añadió correctamente',
                icon: 'success',
            });
        }
    })
}