-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 11, 2015 at 05:06 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `fierce_enigma`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Restaurant'),
(2, 'Legal'),
(3, 'Services'),
(4, 'eCommerce'),
(5, 'Charity'),
(6, 'Celebrity'),
(7, 'Real Estate'),
(8, 'Food'),
(9, 'Advertising'),
(10, 'Insurance'),
(11, 'Beauty'),
(12, 'Technology');

-- --------------------------------------------------------

--
-- Table structure for table `cms_types`
--

CREATE TABLE `cms_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cms_types`
--

INSERT INTO `cms_types` (`id`, `name`) VALUES
(1, 'Raw PHP'),
(2, 'Wordpress'),
(3, 'Joomla');

-- --------------------------------------------------------

--
-- Table structure for table `mobiles`
--

CREATE TABLE `mobiles` (
  `id` int(11) NOT NULL COMMENT 'pk',
  `url` varchar(150) NOT NULL COMMENT 'url of the mobile site'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COMMENT='list of mobiles sites';

--
-- Dumping data for table `mobiles`
--

INSERT INTO `mobiles` (`id`, `url`) VALUES
(1, 'http://www.askalawyerforhelp.com/mobile/'),
(2, 'http://www.cpr4web.com/dev/595tap/mobile/'),
(3, 'http://www.legendspizzaandwings.com/mobile/'),
(4, 'http://www.legendstavernandgrille.com/mobile/'),
(5, 'http://www.record-sealing.com/'),
(6, 'http://www.cpr4web.com/dev/klitzlaw/mock2/mobile/'),
(7, 'http://www.lawpracticesolutions.com/'),
(8, 'http://www.famousnation.com/'),
(9, 'http://www.cpr4web.com/dev/mobile/pocket-mobile/'),
(13, 'No URL');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `url` varchar(150) NOT NULL,
  `dev_url` varchar(150) NOT NULL,
  `visible` int(11) NOT NULL,
  `responsive` tinyint(1) NOT NULL,
  `mobile` varchar(150) NOT NULL,
  `cms` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COMMENT='This table holds all of the websites FE has done';

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `category`, `description`, `name`, `url`, `dev_url`, `visible`, `responsive`, `mobile`, `cms`, `notes`) VALUES
(1, 8, 'This is an awesome site about fierce enigma', 'Fierce Enigmas', 'http://www.fierceenigma.com', '', 1, 1, '', 3, ''),
(2, 1, 'Tavern and Pub', 'Legends Tavern and Grilleest', 'http://www.legendstavernandgrille.com', '', 1, 0, 'http://www.legendstavernandgrille.com/mobile/', 1, ''),
(3, 2, 'Law Firm', 'Gary Singer Law', 'http://www.garysingerlaw.com', '', 1, 0, '', 3, ''),
(4, 1, 'Pizza Restaurant', 'Legends Pizza and Wings', 'http://www.legendspizzaandwings.com', '', 1, 0, 'http://www.legendspizzaandwings.com/mobile/', 3, ''),
(5, 2, 'Law Firm', 'Robert Serrone, PA', 'http://www.record-sealing.com/', '', 1, 0, 'http://www.record-sealing.com/', 3, ''),
(6, 2, 'Website for ask a lawyer', 'Ask a Lawyer for Help', 'http://www.askalawyerforhelp.com/', '', 0, 0, 'http://www.askalawyerforhelp.com/mobile/', 2, ''),
(7, 2, 'Title Company', 'Gibraltor Title', 'http://www.youareclosing.com', '', 1, 1, '', 3, ''),
(8, 2, 'Law Firm', 'Compo Law', 'http://www.mcompolaw.com/', '', 1, 1, '', 0, ''),
(9, 3, 'Home and Business Cleaning Services', 'Total Custom Cleaning', 'http://www.totalcustomcleaning.com', '', 1, 0, '', 0, ''),
(10, 2, 'Law Practice Solutions for Attorneys', 'Law Practice Solutions', 'http://www.lawpracticesolutions.com', '', 1, 0, 'http://www.lawpracticesolutions.com/', 0, ''),
(11, 6, 'Celebrity and eCommerce Site', 'The ChickStarter', 'http://www.thechickstarter.com', '', 1, 0, '', 0, ''),
(12, 6, 'NFL HOF Players Classic Organization', 'HOF Players Classic', 'http://www.hofplayersclassic.com', '', 1, 1, '', 0, ''),
(13, 6, 'Celebrity Event Site', 'Famous Nation', 'http://www.famousnation.com', '', 1, 0, 'http://www.famousnation.com/', 0, ''),
(14, 6, 'Official Site of Jim McMahon', 'Swang Wear', 'http://www.swangwear.com', '', 1, 0, '', 0, ''),
(15, 7, 'Real Estate Broker in Florida', 'Realty One Source', 'http://www.realtyonesourcefl.com/', '', 1, 0, '', 0, ''),
(16, 2, 'Graphics for Legal Professionals', 'Graphic Legal', 'http://www.graphiclegal.com/', '', 1, 1, '', 0, ''),
(17, 3, 'Wax on Wheels Detailing', 'Wax on Wheels', 'http://www.waxonwheels.com/', '', 1, 0, '', 0, ''),
(18, 1, 'Yummy in my Tummy Food Services', 'YIMT', 'http://www.yummyinmytummy.com', '', 1, 1, '', 0, ''),
(19, 3, 'Sharp Saver Magazine', 'Sharp Saver', 'http://www.sharpsaverfla.com', '', 1, 1, '', 0, ''),
(20, 11, 'Insurance Brokerage', 'Government Insurance', 'http://www.governmentinsurancecorp.com/', '', 1, 0, '', 0, ''),
(21, 11, 'Robert Garcia Celebrity Stylist', 'Robert Garcia Salon', 'http://www.robertgarciasalon.com/', '', 1, 0, '', 0, ''),
(22, 5, 'SIDES Charity Site', 'SIDES Charity', 'http://www.sidescharity.org/', '', 0, 1, '', 0, ''),
(23, 1, 'Sports Bar', '595 Tap and Tavern', 'http://www.cpr4web.com/dev/595tap', '', 1, 0, 'http://www.cpr4web.com/dev/595tap/mobile/', 0, ''),
(24, 2, 'Tsets', 'testing', 'test', '', 0, 0, 'tset', 0, ''),
(25, 1, 'Desc', 'klitzlaw.com', 'http://www.klitzlaw.com', '', 1, 0, 'http://www.klitzlaw.com/mobile', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COMMENT='admin table';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(8, 'fe', '713db533b4bc44497b677ad703dc90f97054bfeb');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_mobilesandresponsives`
--
CREATE TABLE `vw_mobilesandresponsives` (
`id` int(11)
,`name` varchar(150)
,`category` int(11)
,`description` varchar(150)
,`url` varchar(150)
);

-- --------------------------------------------------------

--
-- Structure for view `vw_mobilesandresponsives`
--
DROP TABLE IF EXISTS `vw_mobilesandresponsives`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_mobilesandresponsives` AS select `sites`.`id` AS `id`,`sites`.`name` AS `name`,`sites`.`category` AS `category`,`sites`.`description` AS `description`,`sites`.`url` AS `url` from (`sites` join `categories` on((`sites`.`category` = `categories`.`id`))) where ((`sites`.`responsive` <> '0') and (`sites`.`visible` <> '0')) union select `sites`.`id` AS `id`,`sites`.`name` AS `name`,`sites`.`category` AS `category`,`sites`.`description` AS `description`,`sites`.`url` AS `url` from (`sites` join `categories` on((`sites`.`category` = `categories`.`id`))) where ((`sites`.`mobile` <> ' ') and (`sites`.`visible` <> '0'));

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms_types`
--
ALTER TABLE `cms_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobiles`
--
ALTER TABLE `mobiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`),
  ADD KEY `mobile` (`mobile`),
  ADD KEY `responsive` (`responsive`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cms_types`
--
ALTER TABLE `cms_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `mobiles`
--
ALTER TABLE `mobiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'pk',AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `sites`
--
ALTER TABLE `sites`
  ADD CONSTRAINT `sites_ibfk_3` FOREIGN KEY (`category`) REFERENCES `categories` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
