-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2022 a las 19:33:34
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reporte_1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `Nombre`) VALUES
(1, 'San Vicente del Caguán'),
(2, 'Tumaco'),
(3, 'Tuluá'),
(4, 'Barranquilla'),
(5, 'El Retorno'),
(6, 'Los Patios'),
(7, 'Ibagué'),
(8, 'Yopal'),
(9, 'El Tambo'),
(10, 'Dosquebradas'),
(11, 'Puerto Nariño'),
(12, 'Ocaña'),
(13, 'Tame'),
(14, 'Sabanalarga'),
(15, 'Neiva'),
(16, 'Bucaramanga'),
(17, 'Calarcá'),
(18, 'Envigado'),
(19, 'Bogotá'),
(20, 'Santa Rosa de Cabal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `primer_nombre` varchar(15) NOT NULL,
  `primer_apellido` varchar(15) NOT NULL,
  `dias_mora` int(4) NOT NULL,
  `id_ciudad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `primer_nombre`, `primer_apellido`, `dias_mora`, `id_ciudad`) VALUES
(1, 'Halee', 'Justin', 21, 9),
(2, 'Jemima', 'Kenyon', 34, 5),
(3, 'Edan', 'Barry', 14, 7),
(4, 'Devin', 'Magee', 35, 15),
(5, 'Angela', 'Vernon', 38, 11),
(6, 'Gillian', 'Quin', 46, 10),
(7, 'Todd', 'Jescie', 23, 14),
(8, 'Ursa', 'Kaseem', 33, 3),
(9, 'Hunter', 'Hilel', 8, 4),
(10, 'Len', 'Dorian', 14, 19),
(11, 'Oleg', 'Brennan', 39, 18),
(12, 'Jael', 'Madaline', 18, 9),
(13, 'Caldwell', 'Hamish', 3, 5),
(14, 'Jasper', 'Carol', 37, 4),
(15, 'Alvin', 'Chase', 18, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
