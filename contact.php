<?php

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

    header('Content-Type: text/html; charset=utf-8');
    die('Dostęp zabroniony');

}

$user_name = $_POST['FirstName'];
$user_email = $_POST['email'];
$phone_number = $_POST['tel'];
$message = $_POST['message'];

if(isset($_POST['FirstName']) && isset($_POST['email']) && isset($_POST['tel']) && isset($_POST['message'])) {

    $errors = array();

    if(empty($_POST['FirstName'])) {
        array_push($errors, 'Your full name');
    }

    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        array_push($errors, 'Your valid email address');
    }

    if(empty($_POST['tel'])) {
        array_push($errors, 'Your valid telephone number');
    }

    if(empty($_POST['message'])) {
        array_push($errors, 'Enter your message');
    }

    if(count($errors) > 0) {

        echo json_encode($errors);

    } else {

      $message_body = $message."\r\n\r\nClient's Name : ". $user_name."\r\nEmail : ".$user_email."\r\nPhone Number : ". $phone_number;

        $to = 'przemek.lewtak@gmail.com';
        $subject = 'Someone has just sent you an email';
        //$message = $_POST['message'];
        $headers = 'From: ' . $_POST['email'] . "\r\n" .
            'Reply-To: ' . $_POST['email'] . "\r\n" .
            'Content-Type: text/plain;charset=utf-8\r\n' .
            'X-Mailer: PHP/' . phpversion();

        $mail_sent = mail($to, $subject, $message_body, $headers);

        if($mail_sent) {
            echo json_encode(array(
                'status' => 'success',
      			'message' => 'Message sent'
            ));
        } else {
            echo json_encode(array(
                //'error' => 'Wystąpił błąd podczas wysyłania wiadomości'
                'status' => 'validation-error',
      			'errors' => $errors
            ));
        }

    }

} else {

    echo json_encode(array(
        'error' => 'Przesłano niepoprawne pola formularza'
    ));

}