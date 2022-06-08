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
                $datos = $producto->delete_producto($_POST['id']);
            }

        default:
            break;
    }


?>