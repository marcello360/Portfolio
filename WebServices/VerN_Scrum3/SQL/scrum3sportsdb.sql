-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 21, 2023 at 06:24 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scrum3sportsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `basketball`
--

DROP TABLE IF EXISTS `basketball`;
CREATE TABLE IF NOT EXISTS `basketball` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `conference` varchar(30) NOT NULL,
  `rings` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `basketball`
--

INSERT INTO `basketball` (`id`, `team`, `name`, `conference`, `rings`) VALUES
(1, 'Milwaukee', 'Bucks', 'Eastern', 2),
(2, 'LA', 'Clippers', 'Western', 0),
(3, 'Miami', 'Heat', 'Easten', 2),
(4, 'Dallas', 'Mavericks', 'Western', 1),
(5, 'Cleveland', 'Cavaliers', 'Eastern', 1),
(6, 'Denver', 'Nuggets', 'Western', 7),
(7, 'Boston', 'Celtics', 'Eastern', 15);

-- --------------------------------------------------------

--
-- Table structure for table `football`
--

DROP TABLE IF EXISTS `football`;
CREATE TABLE IF NOT EXISTS `football` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `conference` varchar(30) NOT NULL,
  `rings` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `football`
--

INSERT INTO `football` (`id`, `team`, `name`, `conference`, `rings`) VALUES
(1, 'Pittsburg', 'Steelers', 'AFC', 7),
(2, 'San Francisco', '49ers', 'NFC', 6),
(3, 'Cincinnati', 'Bengals', 'AFC', 1),
(4, 'Kansas City', 'Chiefs', 'NFC', 3),
(5, 'New England', 'Patriots', 'AFC', 7),
(6, 'Minnesota', 'Vikings', 'NFC', 0),
(7, 'Harrisburg', 'Tigers', 'Home', 5);

-- --------------------------------------------------------

--
-- Table structure for table `soccer`
--

DROP TABLE IF EXISTS `soccer`;
CREATE TABLE IF NOT EXISTS `soccer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `conference` varchar(30) NOT NULL,
  `rings` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soccer`
--

INSERT INTO `soccer` (`id`, `team`, `name`, `conference`, `rings`) VALUES
(1, 'Spain', 'Real Madrid', 'LaLiga ', 14),
(2, 'Spain', 'Barcelona', 'LaLiga', 5),
(3, 'England', 'Man City', 'Premier League', 4),
(4, 'England', 'Man United', 'Premier League', 6),
(5, 'France', 'PSG', 'Farmers', 0),
(6, 'Argentina', 'Messi', 'World', 2),
(7, 'Harrisburg', 'Tigers', 'Home', 99);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
