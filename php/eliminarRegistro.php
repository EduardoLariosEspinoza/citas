<?php

include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['dato'])) {
    $dato = $_POST['dato'];
  }
}

$dato = filter_var($dato, FILTER_SANITIZE_STRING);

$sql = 'DELETE FROM citas WHERE id_cita = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dato);
$stmt->execute();
$stmt->close();
$conn->close();
