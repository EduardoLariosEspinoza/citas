<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include("connection.php");

$array = [];
$array2 = [];
$numero_cuenta = json_decode($_POST['numero_cuenta']);

$sql = 'SELECT * FROM citas';

$result = $conn->query($sql);
$result = $result->fetch_all(MYSQLI_ASSOC);

for ($i = 0; $i < sizeof($result); $i++) {
  $result[$i]['iv'] = hex2bin($result[$i]['iv']);
  $result[$i]['mascota'] = hex2bin($result[$i]['mascota']);
  $result[$i]['propietario'] = hex2bin($result[$i]['propietario']);
  $result[$i]['telefono'] = hex2bin($result[$i]['telefono']);
  $result[$i]['fecha'] = hex2bin($result[$i]['fecha']);
  $result[$i]['hora'] = hex2bin($result[$i]['hora']);
  $result[$i]['sintomas'] = hex2bin($result[$i]['sintomas']);

  $result[$i]['mascota'] = openssl_decrypt($result[$i]['mascota'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);
  $result[$i]['propietario'] = openssl_decrypt($result[$i]['propietario'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);
  $result[$i]['telefono'] = openssl_decrypt($result[$i]['telefono'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);
  $result[$i]['fecha'] = openssl_decrypt($result[$i]['fecha'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);
  $result[$i]['hora'] = openssl_decrypt($result[$i]['hora'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);
  $result[$i]['sintomas'] = openssl_decrypt($result[$i]['sintomas'], "AES-256-CBC", "secreto", OPENSSL_RAW_DATA, $result[$i]['iv']);

  $array["mascota"] = $result[$i]['mascota'];
  $array["propietario"] = $result[$i]['propietario'];
  $array["telefono"] = $result[$i]['telefono'];
  $array["fecha"] = $result[$i]['fecha'];
  $array["hora"] = $result[$i]['hora'];
  $array["sintomas"] = $result[$i]['sintomas'];
}

$array2[0] = $array;
echo json_encode($array2);
