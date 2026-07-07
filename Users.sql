-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2026 at 04:27 PM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sma`
--

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `name`, `password`, `refreshToken`, `role`) VALUES
(1, 'admin', 'admin@sman1jangkabuya.sch.id', 'Admin Sman 1 Jangka Buya', '$2b$10$qEeY6FFqr8dksVm.8ePXk.nX4i.j/AQF8IozGTjFr7yS4yymwbvs2', NULL, 'Admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
