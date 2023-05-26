<?php
require_once('../login.php');
if ($saml->isAuthenticated()) { //Si hay sesión iniciada, hacer logout del IDP
  $saml->logout("./index.html");
}  // Se puede pasar como parametro a donde redireccionar tras el logout
//Si no tenia sesión iniciada, lo redirecciona a la url configurada.
header("Location:" . "./index.html");
