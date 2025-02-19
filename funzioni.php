<?php	
/*La classe verifica login non fa altro che controllare se è aperta una sessione avente
come variabile di sessione $_SESSION['livello']. Nel caso contrario, verifica la presenza 
di password e login corretti. In loro assenza o in errato inserimento l'utente è anonimo*/
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
class GestoreLogin
{
//la funzione ritorna un boolean di conferma e apre una sessione settando $_SESSION['livello']
//ho solo una eccezione che è data nel caso di prima apertura o  logout(in presenza di $_SESSION['logout']   
// Meglio passare tutto come parametro invece di usare il post internamente, che impedisce il riuso.
 
/*********************************************************************************************/
	function controllo_accesso($login,$password,$pathIN)//controlla il tipo di utente loggato
	{
		$liv=0;//livello per riconoscimento utente
		$fd = file($pathIN);
		foreach($fd as $k => $v)
		{	
			$v = str_replace(array("\r","\n"),"",$v);//non dovrebbero esserci ma non si sa mai
			$v = explode("#",$v);
			if ($login==$v[0] && $password==$v[1])
			{
				$liv=$v[2];//livello utente loggato
				break;	//uscita foreach
			}
		}			
		$_SESSION["livello"]=$liv;	
		
$_SESSION["nome"]=$login;	
	}
/*********************************************************************************************/
function disegna_logOut($path,$login,$livello_accesso)//scrive HTML in particolare i pulsanti di logout e avvio partita
{
  $p= array("ANONIMO","ISCRITTO");//ripeto registrato per evitare controlli
  echo "<table class=\"presentazione\"><tr><td><div id=\"info_utente\">"; 
  echo " BENVENUTO/A " . $_SESSION["nome"] . "<br> UTENTE ";
  echo $p[$_SESSION["livello"]] ;
  echo "</div></td><td><form action=\"$path\" method=\"POST\" id=\"logout\"></td>";
  echo"<td><input value=\"AVVIA UNA NUOVA PARTITA\" type=\"button\" id=\"avvia_nuova\" onclick=\"crea();carica_parametri('$login','$livello_accesso');\"/></td>";
  echo"<td><input type=submit id=\"logout_button\" value=\"LOGOUT\" name=\"logout\" />";
  echo "</form>";
  echo "</td></tr></table>";//
}
/*********************************************************************************************/	
	function registra_utente($login,$password,$pathOUT)//registra sul file i nuovi utenti
	{
  $registrato=0;
	
  $fd2=file($pathOUT);
	
  foreach($fd2 as $k => $v)
  {	
    $v = str_replace(array("\r","\n"),"",$v);//Non si puo mai sapere
    $v = explode("#",$v);
   
      if ($login==$v[0] && $password==$v[1]||$login==$v[0] && $password!=$v[1])//debbo avere corrispondenza 
      {
     
      $registrato=1;
      echo("<center>ESISTE UN UTENTE CON QUESTA USERNAME</center>");
      
    }
  }
  if($registrato==0)
  {  
    $val="";
    if($login!=$val && $password!=$val)//escludo la possibilita di username e password uguali a "" stringa vuota
    {
      $scrivi_file=fopen($pathOUT,"a");
      $stringa="\r\n".$login."#".$password."#"."1";
      fwrite($scrivi_file,$stringa);
      fclose($scrivi_file); 
    }
      else{echo("<center>INSERISCI TUTTI I DATI</center>");}
  }
}
  
		
/*********************************************************************************************/

}
?>
