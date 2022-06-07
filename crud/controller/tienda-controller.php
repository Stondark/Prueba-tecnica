<?php

require_once("../model/tienda-model.php");
$tienda = new Tiendas(); // Instancia de la clase Clientes

    switch($_GET["op"]){
        case "listar":
            $datos = $tienda->get_tiendas();
            echo json_encode($datos);
            break;
        
        case "info":
            $datos = $tienda->get_tiendas();
            $opciones = "<option selected>Selecciona la tienda que deseas gestionar</option>";
            foreach($datos as $key){
                $opciones .= "<option value=".$key['ID'].">".$key['nombre']."</option>";
            }

            echo $opciones;
            break;


        case "eliminar":

            if(isset($_POST['id'])){
                $cliente->delete_cliente($_POST['id']);
            }
            break;
        
        case "add":

            if(isset($_POST['nombre']) & isset($_POST['fecha'])){
                $tienda->insert_tienda($_POST['nombre'], $_POST['fecha']);
            }
            break;
        case "edit":
            if(isset($_POST['id']) & isset($_POST['nombre']) & isset($_POST['cedula']) & isset($_POST['direccion']) & isset($_POST['correo']) & isset($_POST['numero'])){
                $cliente->update_cliente($_POST['id'], $_POST['nombre'], $_POST['cedula'], $_POST['direccion'], $_POST['correo'], $_POST['numero']);
            }
            break;      

        default:
            break;
    }


?>