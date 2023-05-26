<?php

//header('Content-Type: text/html; charset=iso-8859-1');
//La ruta donde se encuentra la librería principal de simplesamlphp
$saml_lib_path = '/simplesamlphp/lib/_autoload.php';
require_once($saml_lib_path);
// url de nuestro servidor, en este caso, carpeta demo.
$SP_URL = 'https://' . $_SERVER['SERVER_NAME'] . "/demo/";
// Fuente de autenticacion definida en el authsources del SP ej, default-sp
$SP_ORIGEN = 'desarrollo4sistemas';
// Se crea la instancia del saml, pasando como parametro la fuente de autenticacion.
$saml = new SimpleSAML_Auth_Simple($SP_ORIGEN);
//Se asegura que un usuario esté autenticado. Si no lo está, inicia el proceso de autenticación.
$saml->requireAuth();
//NOTA: El flujo no continuará hasta que el usuario este correctamente autenticado por el IDP
$atributos = $saml->getAttributes();
