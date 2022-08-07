<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'path/to/PHPMailer/src/Exception.php';
    require 'path/to/PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);

    $mail->CharSet = 'UTF-8';
    $mail->serLanguge('uk', 'phpmailer/language/')
    $mail->IsHTML(true);

    // Om kozo письмо
    $mail->setFrom('Manicure-Peddicure', 'Manicure-Peddicure');
    // Кому отправить
    $mail->addAddress('jomomer545@5k2u.com');
    // Tема письма
    $mail->Subject = 'Привет! This is Manicure-Peddicure';


    // Тело письма
    $body = '<h1>BCтречайте супер письо!</h1>';


    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Phone:</strong>'.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Name:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Message:</strong>'.$_POST['message'].'</p>';
    }

    $mail->Body=$body;

    // Omnpaвляем
    if(!$mail->send()){
        $message='Ошибка';
    }else{
        $message='Данные отправлены!';
    }

    $response=['message'=>$message];

    header('Content-type:application/json');
    echo json_encode($response);

?>