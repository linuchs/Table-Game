
<?php	
  //nessun output prima di session_start();
  session_start();
  //L'include  contiene la session_start() e deve essere inserito qui 
  include("funzioni.php");
  //header("Cache-control: no-cache, must-revalidate");
  //header("Pragma: no-cache");
  $log = new GestoreLogin();//classe che gestisce login e logout
  //la sessione è aperta e l'utente ha fatto qualche cosa
  if (isset($_SESSION["livello"]))
  {
    if (isset($_POST["logout"])) 
    {
          $_SESSION=array();
          session_destroy();
          session_unset();
          header("Location:index.php");
    }
  }
  else
  {
      if (isset($_POST["login"]) && isset($_POST["password"])){ //ho fatto login
      $log->controllo_accesso($_POST["login"],$_POST["password"],"login.dat");}
      if (isset($_POST["reg_login"]) && isset($_POST["reg_password"])){ //ho fatto login
      $log->registra_utente($_POST["reg_login"],$_POST["reg_password"],"login.dat");}
  }
  $_POST=array();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="Author" content="Allegra Salvatore" />

<title>PROGETTO - WEB PROGRAMMING - GIOCO DELLA IENA -</title>
<script type="text/javascript" src="GameBoard.js"></script>
<script type="text/javascript" src="player.js"></script>
<script type="text/javascript" src="human_player.js"></script>
<script type="text/javascript" src="computer_player.js"></script>
<script type="text/javascript" language="javascript" src="funzioni.js"></script>
<link rel="stylesheet" href="style.css" type="text/css"/>
</head>

<body>
  <center>
  <div id="principale"></div>
  
<script type="text/javascript">
</script>
    <?php
			//Ricontrollo la sessione in quanto potrei anche aver fatto il logout
			if (isset($_SESSION["livello"]))
			{
				$log->disegna_logOut("index.php",$_SESSION["nome"],$_SESSION["livello"]);//predispongo il logout: questa funzione scrive HTML
      }
        else//true==SESSIONE CHIUSA prima apertura della pagina o logout effettuato
      {
		?>
      <!-- <HTML> creo la tabella di login-->
      <form id="form" method="post" action="index.php">
      <input type="hidden" id="password" name="password"/>
      <input type="hidden" id="login"  name="login"/>
      </form>
        <form id="form2" method="post" action="index.php">
      <input type="hidden" id="reg_password" name="reg_password"/>
      <input type="hidden" id="reg_login"  name="reg_login"/>
      </form>
      <table class="login">
      <tr>
      <td>Nome Utente</td>
      <td><input type="text" id="log" onchange="document.getElementById('pass').focus();"/></td>
      </tr>
      <tr>
      <td>Password</td>
      <td><input type="password" id="pass" onchange="document.getElementById('but').focus();"/></td>
      </tr>
      <tr>
      <td><input type="button" id ="bottone_reg" value="REGISTRATI" onclick="registra('log','reg_login','pass','reg_password','form2');" /></td>
      <td><input type="button" id ="but" value="LOGIN" onclick="invia('log','login','pass','password','form');" /></td>
      </tr>
      </table>
      <!--HTML-->
      <script type="text/javascript" language="javascript">
      document.getElementById('log').focus();
      </script>
      <?php 
        }
      ?>
    <!-- <div id="ricarica_gioco" onclick=
    "window.location.reload(true);">
      RIAVVIA
    </div>-->
  </center>
</body>
</html>
