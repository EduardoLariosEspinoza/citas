<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include("connection.php");

$cita = json_decode($_POST['mascota']);

$mascota = filter_var($cita->mascota, FILTER_SANITIZE_STRING);
$propietario = filter_var($cita->propietario, FILTER_SANITIZE_STRING);
$telefono = filter_var($cita->telefono, FILTER_SANITIZE_STRING);
$fecha = filter_var($cita->fecha, FILTER_SANITIZE_STRING);
$hora = filter_var($cita->hora, FILTER_SANITIZE_STRING);
$sintomas = filter_var($cita->sintomas, FILTER_SANITIZE_STRING);
$numero_cuenta = filter_var($cita->numero_cuenta, FILTER_SANITIZE_STRING);

$key = "secreto"; // La clave de encriptación (debe ser segura y secreta)
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CBC"));

// Encriptar
$mascota = openssl_encrypt($mascota, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
$propietario = openssl_encrypt($propietario, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
$telefono = openssl_encrypt($telefono, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
$fecha = openssl_encrypt($fecha, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
$hora = openssl_encrypt($hora, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
$sintomas = openssl_encrypt($sintomas, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);

$iv = bin2hex($iv);
$mascota = bin2hex($mascota);
$propietario = bin2hex($propietario);
$telefono = bin2hex($telefono);
$fecha = bin2hex($fecha);
$hora = bin2hex($hora);
$sintomas = bin2hex($sintomas);

$sql = 'INSERT INTO citas (mascota, propietario, telefono, fecha, hora, sintomas, numero_cuenta, iv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $mascota, $propietario, $telefono, $fecha, $hora, $sintomas, $numero_cuenta, $iv);
$stmt->execute();
$stmt->close();
$conn->close();
