<?php
	sleep(3);
	require 'config.php';

	$query="INSERT INTO user (user,password,email,sex,birthday,date) VALUES ('{$_POST['user']}',sha1('{$_POST['password']}'),'{$_POST['email']}','{$_POST['sex']}','{$_POST['birthday']}',NOW())";

	
	mysql_query($query) or die('新增失败!'.mysql_error());

	echo mysql_affected_rows();
	mysql_close();
?>