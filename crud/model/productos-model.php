<?php
    require_once("../db/db.php");
    class Productos extends Conexion{
        public function get_productos($id){
            parent::conectar();
            $sql = "SELECT * FROM producto WHERE id_tienda = ?";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $id);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function delete_producto($sku){
            parent::conectar();
            $sql = "DELETE FROM `producto` WHERE `producto`.`SKU` = ?";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $sku);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }
        public function insert_producto($nombre, $descripcion, $valor, $id_tienda, $imagen){
            parent::conectar();
            $sql = "INSERT INTO producto (`SKU`, `nombre`, `descripcion`, `valor`, `id_tienda`, `imagen`) VALUES (NULL, ?, ?, ?, ?, ?);";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $nombre);
            $consulta->bindValue(2, $descripcion);
            $consulta->bindValue(3, $valor);
            $consulta->bindValue(4, $id_tienda);
            $consulta->bindValue(5, $imagen);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function update_tienda($id, $nombre_tienda, $fecha_tienda){
            parent::conectar();
            $sql = "UPDATE tienda SET nombre = ?, fecha_apertura = ?
                    WHERE id = ?";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $nombre_tienda);
            $consulta->bindValue(2, $fecha_tienda);
            $consulta->bindValue(3, $id);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

    }



?>