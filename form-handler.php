<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $org = $_POST['org'];
    $message = $_POST['message'];


	
    require 'class.phpmailer.php';
    $thm = "Вам отправлено сообщение с " . $_SERVER['SERVER_NAME'];
    $msg = "Имя: $name<br/>";
    if(isset($phone)){$msg .= "<strong>Телефон:</strong> $phone <br/>";}
    if(isset($city)){$msg .= "<strong>Город:</strong> $city <br/>";}
    if(isset($org)){$msg .= "<strong>Организация:</strong> $org <br/>";}
    if(isset($message)){$msg .= "<strong>Текст сообщения:</strong> $message <br/>";}


    $mail = new PHPMailer();
    $mail->From = 'noreply@'. $_SERVER['SERVER_NAME']; // от кого
    $mail->FromName = $_SERVER['SERVER_NAME']; // от кого
    $mail->AddAddress('zephyro@yandex.ru', ''); // кому - адрес, Имя

    $mail->IsHTML(true); // выставляем формат письма HTML
    $mail->Subject = $thm; // тема письма
    $mail->Body = $msg;

    if (!$mail->Send()) die('Mailer Error: ' . $mail->ErrorInfo);

    header("Location: " . $_SERVER["PHP_SELF"]);
    exit;
}
?>