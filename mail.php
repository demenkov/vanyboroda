<?php

function clean_string($string) {
	$bad = array("content-type","bcc:","to:","cc:","href");
	return str_replace($bad,"",$string);
}
$message = '';

foreach (array(
	'name',
	'email',
) as $key) {
	if (!empty($_POST[$key])) {
		$message .= $key . ": ".clean_string($_POST[$key]) . PHP_EOL;
	}
}
$email_to = 'tennalian@gmail.com';
$email_from = 'robot@forexatlas.com';
$email_subject = 'Обратный звонок c NavalnyStrategy'.$_SERVER['SERVER_NAME'];
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'Content-Type:text/html;charset=utf-8'."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_to, $email_subject, $message, $headers);
die(json_encode(array('result'=>true, 'text'=>'Thank you')));
?>