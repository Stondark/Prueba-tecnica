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
            $opciones = "<option value ='0' selected>Selecciona la tienda que deseas gestionar</option>";
            foreach($datos as $key){
                $opciones .= "<option value=".$key['id'].">".$key['nombre']."</option>";
            }
            echo $opciones;
            break;

        case "eliminar":
            if(isset($_POST['id'])){
                $tienda->delete_tienda($_POST['id']);
            }
            break;
        
        case "add":
            $exp_reg = '/([3][0,1]|[0-2]\d)-([1][0-2]|[0]\d)-(\d\d\d\d)/';
            if(isset($_POST['nombre']) & isset($_POST['fecha'])){
                $fecha = $_POST['fecha'];
                if(!preg_match($exp_reg, $fecha)){
                    $res = array("error"=> true);
                    echo json_encode($res);
                } else{
                    $tienda->insert_tienda($_POST['nombre'], $_POST['fecha']);
                }

            }
            break;
        case "edit":
            if(isset($_POST['id']) & isset($_POST['nombre']) & isset($_POST['fecha'])){
                $tienda->update_tienda($_POST['id'],$_POST['nombre'], $_POST['fecha']);
            }
            break;     

        default:
            break;
    }


?>