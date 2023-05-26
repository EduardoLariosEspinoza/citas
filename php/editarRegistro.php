<?php

include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['dato'])) {
    $dato = $_POST['dato'];
    echo "El dato recibido es: " . json_encode($dato);
  }
}

$fecha = filter_var($dato['fecha'], FILTER_SANITIZE_STRING);
$hora = filter_var($dato['hora'], FILTER_SANITIZE_STRING);
$sintomas = filter_var($dato['sintomas'], FILTER_SANITIZE_STRING);
$mascota = filter_var($dato['mascota'], FILTER_SANITIZE_STRING);
$propietario = filter_var($dato['propietario'], FILTER_SANITIZE_STRING);
$telefono = filter_var($dato['telefono'], FILTER_SANITIZE_STRING);
$id_cita = filter_var($dato['id_cita'], FILTER_SANITIZE_STRING);

$sql = 'UPDATE citas SET fecha = ?, hora = ?, sintomas = ?, mascota = ?, propietario = ?, telefono = ? WHERE id_cita = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $fecha, $hora, $sintomas, $mascota, $propietario, $telefono, $id_cita);
$stmt->execute();
$stmt->close();
$conn->close();
