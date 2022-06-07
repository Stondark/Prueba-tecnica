<?php

Class Metodos{

    public function multiplosDeUnNumero( int $num ){
        return array_sum(array_filter((range(1,$num - 1)), function($tmp){
            return $tmp % 3 == 0 || $tmp % 5 == 0;}));


        // Invocamos el método array_sum el cuál le pasaremos 
        // otro método array_filter donde el cuál le creamos un array con la función range y también creamos 
        // otra función temporar donde estará el condicional de valores a buscar
    }

    public function invertirPalabras(string $string): string{
        $palabras = explode(" ", $string); // Convertimos el string en un Array "Bienvenido a Treda Solutions" => Array ( [0] => Bienvenido [1] => a [2] => Treda [3] => Solutions )
        for($i = 0; $i < count($palabras); $i++ ){
            if(strlen($palabras[$i]) > 5){ // Si la palabra en dicha posición es mayor a 5 usar el método strrev para invertir la palabra
                $palabras[$i] = strrev($palabras[$i]);
            }
            // strlen($palabras[$i]) > 5 ? $palabras[$i] = strrev($palabras[$i]) : $palabras[$i]; CONDICIONAL ALTERNATIVO
        }
        return implode(" ", $palabras); // Devolvemos el array en un string separándolo por " "
    } 

}

// Instanciación para probar los métodos

$test = new Metodos;

print_r($test->multiplosDeUnNumero(10));
echo "<br>___________________ <br>";
print_r($test->invertirPalabras("Bienvenido a Treda Solutions"));
echo "<br>___________________ <br>";
?>