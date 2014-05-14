<?php
	require 'config.php';

	$query=mysql_query("SELECT user FROM user WHERE user='{$_POST['user']}'") or die('SQL错误！');

	 if(mysql_fetch_array($query,MYSQL_ASSOC)){
	 	echo 'false';
	 }else{
	 	echo 'true';
	 }
	 mysql_close();
?>