-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 03, 2024 at 10:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payment_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240430132432-create-user.js'),
('20240430152443-create-transaction.js');

-- --------------------------------------------------------

--
-- Table structure for table `Transactions`
--

CREATE TABLE `Transactions` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Transactions`
--

INSERT INTO `Transactions` (`id`, `amount`, `status`, `type`, `user_id`, `order_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 100000.00, 1, 10, 1, 'dp/1/240513/101010', '2024-05-01 14:51:37', '2024-05-01 14:51:37', NULL),
(2, 50000.00, 1, 20, 1, 'wd/1/240513/130040', '2024-05-01 14:51:37', '2024-05-01 14:51:37', NULL),
(3, 2000.00, 1, 20, 1, 'wd/1/020524/010950', '2024-05-01 18:09:51', '2024-05-01 18:09:51', '2024-05-02 01:10:42'),
(4, 2000.00, 1, 20, 1, 'wd/1/020524/011210', '2024-05-01 18:12:10', '2024-05-01 18:12:10', NULL),
(5, 2000.20, 1, 10, 1, 'dp/1/020524/021748', '2024-05-01 19:17:48', '2024-05-01 19:17:48', NULL),
(6, 90000.00, 1, 10, 1, 'dp/1/030524/140224', '2024-05-03 07:02:24', '2024-05-03 07:02:24', NULL),
(7, 25000.00, 1, 20, 1, 'wd/1/030524/140235', '2024-05-03 07:02:35', '2024-05-03 07:02:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) DEFAULT 0.00,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `total_amount`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Admin Update', 'admin@example.com', '$2a$10$LqTjmrQyoFe90gSvdsKOEupHKtuhx5uATH1HJOmtMDAyaTiA43qGq', 115000.00, '2024-05-01 14:45:12', '2024-05-03 07:02:35', NULL),
(3, 'me', 'me@try.com', '$2a$10$CFIsGVrrXErAa8qcmfNgnO8bjYbdMpt16/GO8CcORnnGLraFDZhA2', 0.00, '2024-05-03 00:19:57', '2024-05-03 00:19:57', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `transactions_deleted_at` (`deletedAt`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `users_deleted_at` (`deletedAt`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
