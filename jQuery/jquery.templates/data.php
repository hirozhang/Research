<?php
		$data = array(
			array('username'=>'Hiro', 'tweet'=>'http://www.twitter.com/hiro_zhang', 'imgSource'=>'http://0.gravatar.com/avatar/a0d9455186ce7aecc659545e21651d00?s=24&d=&r=G', 'desc'=>'<a href="http://www.ihiro.org/" target="_blank">Hiro技术站</a>', 'email'=>'hiro.zhd@gmail.com'),
			array('username'=>'Hiro1', 'tweet'=>'http://www.twitter.com/hiro_zhang', 'imgSource'=>'http://0.gravatar.com/avatar/a0d9455186ce7aecc659545e21651d00?s=24&d=&r=G', 'desc'=>'<a href="http://www.ihiro.org/" target="_blank">Hiro技术站</a>', 'email'=>'hiro.zhd@gmail.com')
			);
		echo json_encode($data);
?>