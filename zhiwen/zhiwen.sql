-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 14 日 07:40
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zhiwen`
--
CREATE DATABASE IF NOT EXISTS `zhiwen` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `zhiwen`;

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `titleid` smallint(6) unsigned NOT NULL,
  `user` varchar(20) CHARACTER SET utf8 NOT NULL,
  `comment` text CHARACTER SET utf8 NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `titleid`, `user`, `comment`, `date`) VALUES
(5, 9, 'gtt', '大范甘迪废话', '2014-05-13 13:54:00'),
(2, 9, 'gtt', '姜淳贤大坏蛋啊', '2014-05-13 13:48:08'),
(4, 9, 'gttt', '我叫gtt', '2014-05-13 13:49:59'),
(6, 9, 'gtt', '过号华盛顿是大法官', '2014-05-13 13:55:11'),
(7, 9, 'gtt', '上刚发生是打发', '2014-05-13 14:00:23'),
(8, 9, 'gtt', '发的这个想知道', '2014-05-13 14:01:16'),
(14, 9, 'gtt', '我叫姜淳贤', '2014-05-13 19:27:53'),
(15, 9, 'gtt', '我叫将魂县', '2014-05-13 19:29:56');

-- --------------------------------------------------------

--
-- 表的结构 `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8,
  `user` varchar(20) CHARACTER SET utf8 NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `question`
--

INSERT INTO `question` (`id`, `title`, `content`, `user`, `date`) VALUES
(5, '第三方刚大放送', '撒个地方官 是东方红速递还行覅生活上覅USD韩国都很感动和嘎斯 好地方叫号V大代购ID号分 河谷地方不穿内裤信访局尽快到现场陈小菊花科学家进出口v空间相册', 'gttt', '2014-05-12 16:09:50'),
(4, '爸爸去哪', '是韩国MBC电视台推出的一档爱护子女的父亲们与试图聆听子女们心事，同时传达给子女们无限父爱的节目。节目于2013年1月6日&nbsp;...</span>', 'gttt', '2014-05-12 15:53:23'),
(6, '占地方鬼地方的地方科学家', '撒个地方官 是东方红速递ui还行覅生活上覅USD韩国都很感动和嘎斯hgdhfgd； 好地方叫号V大代购ID号分 河谷地方不穿内裤信访局尽快到现场陈小菊花科学家进出口v空间相册v撒个地方官 是东方红速递ui还行覅生活上覅USD韩国都很感动和嘎斯hgdhfgd； 好地方叫号V大代购ID号分 河谷地方不穿内裤信访局尽快到现场陈小菊花科学家进出口v空间相册v', 'gttt', '2014-05-12 16:10:27'),
(7, '速度飞洒的大洪水', '撒嘎斯；仨奇偶赛欧死藕丝哈佛上课可接触面，v空间小恐惧空间相册空间小虎虎在习不习惯iU盾法规到如皋HID吧哦时间烦死付啊搜房话费度搜ｉ', 'gttt', '2014-05-12 16:11:04'),
(8, 'ＳＧＳ案发开心烦恼工作量', '幸福感对账单废话废话到房租房东ｉｆ个哦京东覅高经费等工作东方化工地方地方近哈工大考浪费交电话费国际快递空间很简单经典回顾加快递费；啊啊恶搞；啊ｕｉ哦狗的肉', 'gttt', '2014-05-12 16:11:46'),
(9, '发生过到根深蒂固法国恢复', '屌丝 速度和公安 哦受伤is烦得很高搜卡双丰收了空手道发号施令流口水的分公司李稻葵空手道和裸四口快递费闪光灯浪费块话费螺丝刀红高粱卡洛斯分手快乐卡两艘 收快递费收电费卡红高粱卡双丰收了开发宫东风市领导开发水电费搜i地速度佛收到货佛山搜', 'gttt', '2014-05-12 16:12:39');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` char(40) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(10) CHARACTER SET utf8 NOT NULL,
  `birthday` date DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `user`, `password`, `email`, `sex`, `birthday`, `date`) VALUES
(1, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'aaa@qq.com', 'female', '2014-05-05', '2014-05-11 21:45:47'),
(2, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@163.com', 'male', '0000-00-00', '2014-05-11 21:55:10'),
(3, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@163.com', 'female', '0000-00-00', '2014-05-11 21:55:42'),
(4, 'aaa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@163.com', 'male', '0000-00-00', '2014-05-11 21:56:09'),
(5, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@gmail.com', 'male', '0000-00-00', '2014-05-11 21:56:30'),
(6, '11', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', '1@163.com', 'male', '0000-00-00', '2014-05-11 21:56:49'),
(7, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:16'),
(8, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:20'),
(9, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:21'),
(10, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:28'),
(11, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:29'),
(12, 'aa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'a@qq.com', 'male', '0000-00-00', '2014-05-11 21:57:30'),
(13, 'aaa', '64573424d59703ca14b6a27db71f3920b096a361', '1@qq.com', 'female', '2014-05-08', '2014-05-11 21:58:06'),
(14, 'ddd', '42cfe854913594fe572cb9712a188e829830291f', '555@163.com', 'female', '2014-03-27', '2014-05-11 22:11:59'),
(15, '777', 'fba9f1c9ae2a8afe7815c9cdd492512622a66302', '77@163.com', 'male', '2014-05-08', '2014-05-11 22:12:31'),
(16, 'aaa', 'f7a9e24777ec23212c54d7a350bc5bea5477fdbb', 'uuu@163.com', 'female', '2014-05-08', '2014-05-11 22:14:06'),
(17, 'a34', '5dd4ebdac62609c834f7768f02286b798bd82a38', '7@qq.com', 'male', '0000-00-00', '2014-05-11 22:19:38'),
(18, 'aaa', '09a9ed2c9b4c439667f00e5b07f7283971654f6c', '7@163.com', 'male', '0000-00-00', '2014-05-11 22:20:20'),
(19, '123', '7c4a8d09ca3762af61e59520943dc26494f8941b', '8@163.com', 'male', '0000-00-00', '2014-05-11 22:22:19'),
(20, '1234', '7c4a8d09ca3762af61e59520943dc26494f8941b', '9@163.com', 'female', '2014-05-02', '2014-05-11 22:22:50'),
(21, '123', 'b8d3c99fd5a38b3b1adec6815675a24f88725d03', '7@163.com', 'male', '0000-00-00', '2014-05-11 22:28:11'),
(22, '12345', 'f83a161e0038478b20d8dd0195e34cee3461dbc7', '6@qq.com', 'male', '2014-05-07', '2014-05-11 22:28:28'),
(23, 'ed', '05ef347df5bc94361569e0541c2e5bc2bdfcc1d5', 'd@qq.com', 'male', '0000-00-00', '2014-05-11 22:28:44'),
(24, 'gt', '8bf7c3b5621d16c73f2f85ee04a0431a3190e4e5', 'gt@163.com', 'female', '1991-05-07', '2014-05-12 09:49:16'),
(25, 'gtt', '7b0b69e60574090f08965c0de57d766ab462cc4a', 'gtt@163.com', 'female', '2014-05-08', '2014-05-12 09:54:36'),
(26, 'gtt', '7b0b69e60574090f08965c0de57d766ab462cc4a', 'gtt@163.com', 'female', '2014-05-08', '2014-05-12 09:57:32'),
(27, '骨头汤', '8bf7c3b5621d16c73f2f85ee04a0431a3190e4e5', '高婷@qq.com', 'male', '0000-00-00', '2014-05-12 14:43:58'),
(28, 'gttt', 'ad2022ad407b6c002a9cbcae933423908c0e9e6d', 'gt@163.com', 'female', '0000-00-00', '2014-05-12 15:04:08');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
