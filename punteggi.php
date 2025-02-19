<?php
session_start();
header("Cache-control: no-cache, must-revalidate");
header("Pragma: no-cache");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>PUNTEGGI</title>
	<script type="text/javascript" src="funzioni.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="Author" content="Allegra Salvatore"/>  
	<link rel="stylesheet" href="style.css" type="text/css"/>
	<?php
  include("funzioni_punteggio.php");
  ?>
</head>
  <body>
    <center>
      <div id="item"></div>
      <div id="div_tabella"></div>
      <?php 
      
        if (isset($_POST))
        { $obj = new gestoreSalvataggio();	
        /*echo($_POST["my_user"]);  echo($_POST["my_liv"]);  echo($_POST["punteggio1"]);  echo($_POST["punteggio2"]);}*/
          $obj->salva_punteggio("punteggio.dat",$_POST["my_user"],$_POST["my_liv"],$_POST["punteggio1"],$_POST["punteggio2"]);	/**/
          $obj->carica_punteggio("punteggio.dat");
          }
          unset($_POST);
      
        
      ?>
     <a href="index.php" onclick="history.back()">TORNA INDIETRO</a>
    </center>
  </body>
</html>