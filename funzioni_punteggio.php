<?php	

/*********************************************************************************************/
/*********************************************************************************************/
class GestoreSalvataggio
{

/*********************************************************************************************/	
	function salva_punteggio($pathIN,$user,$player2,$punto1,$punto2)//registra sul file i nuovi utenti
	{
 
	if($user!=""){
  $fd2=file($pathIN);
	   
      $scrivi_file=fopen($pathIN,"a");
      $stringa="\r\n La partita ".$user." contro ".$player2." finisce ".$punto1." a ".$punto2;
      fwrite($scrivi_file,$stringa);
      fclose($scrivi_file); 
      }
  
}
  
  
		
/*********************************************************************************************/
function carica_punteggio($pathOUT)//registra sul file i nuovi utenti
	{
  
		$fd = file($pathOUT);
    echo("<table border=1 width=350>");
		foreach($fd as $k => $v)
		{	
			echo("<tr><td>\r\n".$v."</tr></td>");
    }
      echo("</table>");
	}
  
  
}
?>
