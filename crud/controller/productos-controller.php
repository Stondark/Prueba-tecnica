<?php

require_once("../model/productos-model.php");
$producto = new Productos(); // Instancia de la clase Clientes

    switch($_GET["op"]){
        case "listar":
            if(isset($_POST['id'])){
                $datos = $producto->get_productos($_POST['id']);
                echo json_encode($datos);
            }
            break;
        
        case "delete":
            if(isset($_POST['sku'])){
                $datos = $producto->delete_producto($_POST['sku']);
            }
            break;
            
        case "add":
            
            if(isset($_POST['nombre']) & isset($_POST['descripcion']) & isset($_POST['valor']) & isset($_POST['id_tienda']) & isset($_FILES['foto']['name'])){
                $nombre = $_FILES['foto']['name'];
                $tmp = $_FILES['foto']['tmp_name'];
                $ruta = "../img/".$nombre;
                move_uploaded_file($tmp, $ruta);

                $datos = $producto->insert_producto($_POST['nombre'], $_POST['descripcion'], $_POST['valor'], $_POST['id_tienda'], $ruta);

            }

            break;

        default:
            break;
    }


?>