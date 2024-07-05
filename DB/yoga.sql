-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2024 at 04:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yoga`
--

-- --------------------------------------------------------

--
-- Table structure for table `CATEGORIAS`
--

CREATE TABLE `CATEGORIAS` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `CATEGORIAS`:
--

--
-- Dumping data for table `CATEGORIAS`
--

INSERT INTO `CATEGORIAS` (`ID`, `DESCRIPCION`) VALUES
(1, 'Libro'),
(3, 'Vela');

-- --------------------------------------------------------

--
-- Table structure for table `CONSULTA`
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

--
-- RELATIONSHIPS FOR TABLE `CONSULTA`:
--   `ID_GENERO`
--       `GENERO` -> `ID`
--   `ID_RANGO_ETARIO`
--       `RANGO_ETARIO` -> `ID`
--

-- --------------------------------------------------------

--
-- Table structure for table `CONTACTO`
--

CREATE TABLE `CONTACTO` (
  `ID_CONSULTA` int(11) NOT NULL,
  `ID_TIPO_CONTACTO` int(11) NOT NULL,
  `VALOR` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contactos de la consulta';

--
-- RELATIONSHIPS FOR TABLE `CONTACTO`:
--   `ID_CONSULTA`
--       `CONSULTA` -> `ID`
--   `ID_TIPO_CONTACTO`
--       `TIPO_CONTACTO` -> `ID`
--

-- --------------------------------------------------------

--
-- Table structure for table `GENERO`
--

CREATE TABLE `GENERO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Generos';

--
-- RELATIONSHIPS FOR TABLE `GENERO`:
--

--
-- Dumping data for table `GENERO`
--

INSERT INTO `GENERO` (`ID`, `DESCRIPCION`) VALUES
(1, 'Hombre'),
(2, 'Mujer'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Table structure for table `PRODUCTOS`
--

CREATE TABLE `PRODUCTOS` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `PRECIO` decimal(10,2) NOT NULL,
  `DESCRIPCION` varchar(100) NOT NULL,
  `STOCK` int(11) NOT NULL,
  `IMAGEN` longblob NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `PRODUCTOS`:
--   `ID_CATEGORIA`
--       `CATEGORIAS` -> `ID`
--

-- --------------------------------------------------------

--
-- Table structure for table `RANGO_ETARIO`
--

CREATE TABLE `RANGO_ETARIO` (
  `ID` int(11) NOT NULL,
  `RANGO` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rangos Etarios';

--
-- RELATIONSHIPS FOR TABLE `RANGO_ETARIO`:
--

--
-- Dumping data for table `RANGO_ETARIO`
--

INSERT INTO `RANGO_ETARIO` (`ID`, `RANGO`) VALUES
(1, '15 a 34 años'),
(2, '35 a 45 años'),
(3, 'mayor a 45 años');

-- --------------------------------------------------------

--
-- Table structure for table `TIPO_CONTACTO`
--

CREATE TABLE `TIPO_CONTACTO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tipos de contactos';

--
-- RELATIONSHIPS FOR TABLE `TIPO_CONTACTO`:
--

--
-- Dumping data for table `TIPO_CONTACTO`
--

INSERT INTO `TIPO_CONTACTO` (`ID`, `DESCRIPCION`) VALUES
(1, 'Mail'),
(2, 'Teléfono');

-- --------------------------------------------------------

--
-- Table structure for table `USUARIOS`
--

CREATE TABLE `USUARIOS` (
  `ID` int(11) NOT NULL COMMENT 'ID de usuario',
  `usuario` varchar(10) NOT NULL COMMENT 'Nombre de usuario',
  `nombre` varchar(50) DEFAULT NULL COMMENT 'Nombre del usuario',
  `apellido` varchar(50) DEFAULT NULL COMMENT 'Apellido del usuario',
  `PASSWORD` varchar(100) NOT NULL COMMENT 'Password del usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `USUARIOS`:
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CATEGORIAS`
--
ALTER TABLE `CATEGORIAS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `CONSULTA`
--
ALTER TABLE `CONSULTA`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `GENERO_FK` (`ID_GENERO`),
  ADD KEY `RANGO_ETARIO_FK` (`ID_RANGO_ETARIO`);

--
-- Indexes for table `CONTACTO`
--
ALTER TABLE `CONTACTO`
  ADD PRIMARY KEY (`ID_CONSULTA`,`ID_TIPO_CONTACTO`),
  ADD KEY `TIPO_CONTACTO_FK` (`ID_TIPO_CONTACTO`);

--
-- Indexes for table `GENERO`
--
ALTER TABLE `GENERO`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `PRODUCTOS`
--
ALTER TABLE `PRODUCTOS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CATEGORIA_FK` (`ID_CATEGORIA`);

--
-- Indexes for table `RANGO_ETARIO`
--
ALTER TABLE `RANGO_ETARIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `TIPO_CONTACTO`
--
ALTER TABLE `TIPO_CONTACTO`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CONSULTA`
--
ALTER TABLE `CONSULTA`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PRODUCTOS`
--
ALTER TABLE `PRODUCTOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USUARIOS`
--
ALTER TABLE `USUARIOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de usuario';

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CONSULTA`
--
ALTER TABLE `CONSULTA`
  ADD CONSTRAINT `GENERO_FK` FOREIGN KEY (`ID_GENERO`) REFERENCES `GENERO` (`ID`),
  ADD CONSTRAINT `RANGO_ETARIO_FK` FOREIGN KEY (`ID_RANGO_ETARIO`) REFERENCES `RANGO_ETARIO` (`ID`);

--
-- Constraints for table `CONTACTO`
--
ALTER TABLE `CONTACTO`
  ADD CONSTRAINT `CONSULTA_FK` FOREIGN KEY (`ID_CONSULTA`) REFERENCES `CONSULTA` (`ID`),
  ADD CONSTRAINT `TIPO_CONTACTO_FK` FOREIGN KEY (`ID_TIPO_CONTACTO`) REFERENCES `TIPO_CONTACTO` (`ID`);

--
-- Constraints for table `PRODUCTOS`
--
ALTER TABLE `PRODUCTOS`
  ADD CONSTRAINT `CATEGORIA_FK` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `CATEGORIAS` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
