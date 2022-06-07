<?php
    require_once("../db/db.php");
    class Tiendas extends Conexion{
        public function get_tiendas(){
            parent::conectar();
            $sql = "SELECT * FROM tienda";
            $consulta = $this->conexion->prepare($sql);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function get_tiendas_id($id){
            parent::conectar();
            $sql = "SELECT * FROM tienda WHERE id = ?";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $id);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function delete_tienda($id){
            parent::conectar();
            $sql = "DELETE FROM tienda WHERE id = ?";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $id);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function insert_tienda($nombre_tienda, $fecha_tienda){
            parent::conectar();
            $sql = "INSERT INTO tienda (id, nombre, fecha_apertura) VALUES (NULL, ?, ?);";
            $consulta = $this->conexion->prepare($sql);
            $consulta->bindValue(1, $nombre_tienda);
            $consulta->bindValue(2, $fecha_tienda);
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