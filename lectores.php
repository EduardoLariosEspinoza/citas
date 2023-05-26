<?php

//header('Access-Control-Allow-Origin: *');

require_once('./php/login.php');
include('./php/connection.php');

$sql = 'SELECT COUNT(*) as total FROM citas_lectores WHERE numero_cuenta = "' . $atributos['uCuenta'][0] . '"';
$result = $conn->query($sql);
$result = $result->fetch_all(MYSQLI_ASSOC);

if ($result[0]['total'] == 0) {
  header('Location: ./inicio.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Administrador de Pacientes Universitario</title>
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <h2 class="text-center my-5 titulo">Pagina lectores</h2>
  <div class="container mt-5 p-5">
    <div id="contenido" class="row">
      <div class="col-md-6">
        <h2 id="administra" class="mb-4">Administra tus Citas</h2>
        <ul id="citas" class="list-group lista-citas"></ul>
      </div>
    </div>
  </div>

  <script>
    <?php
    echo 'let cuenta = "' . $atributos['uCuenta'][0] . '";';
    ?>
  </script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="js/lectores.js"></script>

</body>

</html>