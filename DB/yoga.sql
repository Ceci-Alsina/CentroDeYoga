-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-06-2024 a las 05:54:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yoga`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONSULTA`
--

CREATE TABLE `CONSULTA` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL COMMENT 'Nombre persona que consulta',
  `APELLIDO` varchar(50) NOT NULL COMMENT 'Apellido persona que consulta',
  `MENSAJE` varchar(200) NOT NULL COMMENT 'Mensaje de consulta',
  `RECIBE_NEWSLETTER` tinyint(1) NOT NULL COMMENT 'Define si recibe o no la newsletter',
  `FECHA_ALTA` datetime NOT NULL COMMENT 'Fecha de alta de la consulta',
  `FECHA_RESPUESTA` datetime DEFAULT NULL COMMENT 'Fecha en que se responde la consulta',
  `ID_RANGO_ETARIO` int(11) NOT NULL COMMENT 'Rango etario de la persona que consulta',
  `ID_GENERO` int(11) NOT NULL COMMENT 'Género de la persona que consulta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Consulta recibidas por la página';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONTACTO`
--

CREATE TABLE `CONTACTO` (
  `ID_CONSULTA` int(11) NOT NULL,
  `ID_TIPO_CONTACTO` int(11) NOT NULL,
  `VALOR` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contactos de la consulta';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GENERO`
--

CREATE TABLE `GENERO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Generos';

--
-- Volcado de datos para la tabla `GENERO`
--

INSERT INTO `GENERO` (`ID`, `DESCRIPCION`) VALUES(1, 'Hombre');
INSERT INTO `GENERO` (`ID`, `DESCRIPCION`) VALUES(2, 'Mujer');
INSERT INTO `GENERO` (`ID`, `DESCRIPCION`) VALUES(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RANGO_ETARIO`
--

CREATE TABLE `RANGO_ETARIO` (
  `ID` int(11) NOT NULL,
  `RANGO` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rangos Etarios';

--
-- Volcado de datos para la tabla `RANGO_ETARIO`
--

INSERT INTO `RANGO_ETARIO` (`ID`, `RANGO`) VALUES(1, '15 a 34 años');
INSERT INTO `RANGO_ETARIO` (`ID`, `RANGO`) VALUES(2, '35 a 45 años');
INSERT INTO `RANGO_ETARIO` (`ID`, `RANGO`) VALUES(3, 'mayor a 45 años');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TIPO_CONTACTO`
--

CREATE TABLE `TIPO_CONTACTO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tipos de contactos';

--
-- Volcado de datos para la tabla `TIPO_CONTACTO`
--

INSERT INTO `TIPO_CONTACTO` (`ID`, `DESCRIPCION`) VALUES(1, 'Mail');
INSERT INTO `TIPO_CONTACTO` (`ID`, `DESCRIPCION`) VALUES(2, 'Teléfono');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `CONSULTA`
--
ALTER TABLE `CONSULTA`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `GENERO_FK` (`ID_GENERO`),
  ADD KEY `RANGO_ETARIO_FK` (`ID_RANGO_ETARIO`);

--
-- Indices de la tabla `CONTACTO`
--
ALTER TABLE `CONTACTO`
  ADD PRIMARY KEY (`ID_CONSULTA`,`ID_TIPO_CONTACTO`),
  ADD KEY `TIPO_CONTACTO_FK` (`ID_TIPO_CONTACTO`);

--
-- Indices de la tabla `GENERO`
--
ALTER TABLE `GENERO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `RANGO_ETARIO`
--
ALTER TABLE `RANGO_ETARIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `TIPO_CONTACTO`
--
ALTER TABLE `TIPO_CONTACTO`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `CONSULTA`
--
ALTER TABLE `CONSULTA`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CONSULTA`
--
ALTER TABLE `CONSULTA`
  ADD CONSTRAINT `GENERO_FK` FOREIGN KEY (`ID_GENERO`) REFERENCES `GENERO` (`ID`),
  ADD CONSTRAINT `RANGO_ETARIO_FK` FOREIGN KEY (`ID_RANGO_ETARIO`) REFERENCES `RANGO_ETARIO` (`ID`);

--
-- Filtros para la tabla `CONTACTO`
--
ALTER TABLE `CONTACTO`
  ADD CONSTRAINT `CONSULTA_FK` FOREIGN KEY (`ID_CONSULTA`) REFERENCES `CONSULTA` (`ID`),
  ADD CONSTRAINT `TIPO_CONTACTO_FK` FOREIGN KEY (`ID_TIPO_CONTACTO`) REFERENCES `TIPO_CONTACTO` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
