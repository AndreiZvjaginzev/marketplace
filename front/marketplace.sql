-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 29 2022 г., 03:31
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `marketplace`
--

-- --------------------------------------------------------

--
-- Структура таблицы `menu_links`
--

CREATE TABLE `menu_links` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `route` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `menu_links`
--

INSERT INTO `menu_links` (`id`, `name`, `route`, `parent_id`) VALUES
(1, 'Home', '/', NULL),
(2, 'Network', NULL, NULL),
(3, 'Activity', '/activity', 2),
(4, 'Photos', '/photos', 2),
(5, 'Products', NULL, NULL),
(6, 'Jobs', NULL, NULL),
(7, 'Classfields', NULL, NULL),
(8, 'Pages', NULL, NULL),
(9, 'Blog', NULL, NULL),
(10, 'Contact', NULL, NULL),
(11, 'Videos', '/videos', 2),
(12, 'Members', '/members', 2),
(13, 'Groups', '/groups', 2),
(14, 'Forums', '/forums', 2),
(15, 'All Products', '/all_products', 5),
(16, 'Categories', '/categories', 5),
(17, 'All Jobs', '/all_jobs', 6),
(18, 'Job Categories', '/job_categories', 6),
(19, 'Submit Job', '/submit_job', 6),
(20, 'All Adverts', '/adverts', 7),
(21, 'Advert Categories', '/ad_categories', 7),
(22, 'Submit Advert', '/ad_submit', 7);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `menu_links`
--
ALTER TABLE `menu_links`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `menu_links`
--
ALTER TABLE `menu_links`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
