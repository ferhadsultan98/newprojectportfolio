<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Form verilerini al
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';

// Basit bir kontrol
if (!empty($name) && !empty($email) && !empty($message)) {
    // E-posta ayarları
    $to = "sultanoworks@gmail.com";
    $subject = "Yeni İletişim Mesajı";
    $body = "Ad: $name\nE-posta: $email\nMesaj:\n$message";
    $headers = "From: $email\r\n";

    // E-postayı gönder
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mesaj gönderilemedi."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Tüm alanlar zorunludur."]);
}
?>
