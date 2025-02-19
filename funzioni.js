
function invia(l1,l2,p1,p2,form)//(*)
{
	document.getElementById(l2).value=document.getElementById(l1).value;
	document.getElementById(p2).value=document.getElementById(p1).value;
	document.getElementById(form).submit();
}
function registra(l1,l2,p1,p2,form)//(*)
{
	document.getElementById(l2).value=document.getElementById(l1).value;
	document.getElementById(p2).value=document.getElementById(p1).value;
	document.getElementById(form).submit();
}
/* (*)La piccola funzione implementata sopra sposta i valori nel form che viene usato
per  l'invio dei dati. Questa scelta è stata fatta per consentire lo spostamento 
del focus automaticamente anche premendo il tasto <INVIO> , se fosse stato
implementato il submit avrebbe inviato i dati e non avrebbe spostato il focus*/

/*scelgo di non metterla all'interno di Game_Board.js in quanto non mi disegna 
la tabella ma mi serve sono da struttura portante in quanto sarebbe stata messa nell'index*/
function crea(){ 
var st="";st="<div id=\"titolo\">GIOCO DELLA IENA - SCEGLI CON CHI GIOCARE</div>";
st+="<table id=\"container\"><tr>";
st+="<td id=\"container_td\">";
      st+="<table id=\"tabella_dadi\">";
      st+="<tr>";
      st+="<td id=\"td_dadi_up\">";
        st+="<table>";
        st+="<tr><td>";
          st+="<table id=\"radio_buttons\">";
          st+="<tr><td>Scegli il tipo di avversario per Player2</td></tr>";
          st+="<tr><td>";
          st+="<form id=\"form2\" name=\"form2\" method=\"post\" >";
          st+="<label><input type=\"radio\" name=\"RadioGroup2\" value=\"radio\" id=\"RadioGroup2_0\" checked=\"checked\" />Human</label>";
          st+="<label><input type=\"radio\" name=\"RadioGroup2\" value=\"radio\" id=\"RadioGroup2_1\" />Cpu</label>";
          st+="</form>";
          st+="</td></tr></table>";
        st+="</td>";
        st+="<td>";
        st+="<div id=\"giocatore_1\">Player 1</div>";
        st+="<div id=\"giocatore_2\">Player 2</div>";
        st+="</td>";
        st+="<td>";
        st+="<div id=\"taba_counter_1\">Player 1 tabe</div>";
        st+="<div id=\"taba_counter_2\">Player 2 tabe</div>";
        st+="</td>";
        st+="<td valign=\"top\">";
        st+="<form name=\"Gioco_iena\">";
        st+="<div id=\"start_button\"><input id=\"start\" value=\"START\" type=\"button\" onclick=\"miaTabella.controlla_tipi_player()\" /></div>";
        st+="<div id=\"div_getta\"></div>";
        st+="</form>";
        st+="</td>";
        st+="</tr>";
        st+="</table>";
      st+="</td>";
      st+="</tr>";
      st+="<tr>";
      st+="<td id=\"td_dadi_down\">";
        st+="<table id=\"box_fw_table\"><tr><td>";
        st+="<div id=\"box_1\"></div>";
        st+="<div id=\"box_2\"></div>";
        st+="<div id=\"box_3\"></div></td><td  id=\"box_fw_td\">";
        st+="<div id=\"box_fw\"></div>";
        st+="</td></tr></table></td>";
      st+="</tr>";
      st+="</table>";
st+="</td>";
st+="<td id=\"container_td\">";
st+="<div id=\"div_tabella2\">";
st+="</div>";

st+="</td>";
st+="</tr>";
st+="</table>";
st+="<div id=\"div_tabella\"></div>";
st+="<input type=\"button\" value=\"Salva\" id=\"salva\" onclick=\"miaTabella.realizza_auto_Form('div_tabella','punteggi.php')\";/>";
document.getElementById("principale").innerHTML=st;
/*********************************************/ 
miaTabella= new Game_Board();
miaTabella.DISEGNA_CAMPO("div_tabella2");
/*********************************************/
} 
//////////////////////////////////////////////////////////////
function carica_parametri(user_name,livello_accesso)
{
miaTabella.livello_player=livello_accesso;
miaTabella.username_player=user_name;
}
  