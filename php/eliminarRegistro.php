<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['dato'])) {
    $dato = $_POST['dato'];
    echo "El dato recibido es: " . json_encode($dato);
  }
}

$dato = filter_var($dato, FILTER_SANITIZE_STRING);

$sql = 'DELETE FROM citas WHERE id_cita = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dato);
$stmt->execute();
$stmt->close();
$conn->close();
