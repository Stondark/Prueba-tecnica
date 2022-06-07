<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">

    <title>Tienda</title>
</head>

<body>
    <!-- NAV -->
    <?php
    include_once("../views/includes/nav.php");
    ?>

    <!-- CONTENIDO -->

    <div class="card text-center">
        <div class="card-header">
            ¡Bienvenido!
        </div>
        <div class="card-body">
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select_list"> </select>
            <a id="select-btn" class="btn btn-primary">Seleccionar</a>
            <p class="card-text">Si no hay ninguna tienda prueba créandola 🤩</p>

            <a id="crear-tienda" class="btn btn-primary">Crear</a>
        </div>
    </div>
    <table id="lista-table" class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>FECHA</th>
                <th>
                    <!-- Botones editar y eliminar-->
                </th>
            </tr>
        </thead>
    </table>

    <script src="../js/index.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
</body>

</html>