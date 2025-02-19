/*****************************************************************************************************************/
/****************************************Game_Board*()************************************************************/
/*****************************************************************************************************************/

function Game_Board()
{
this.livello_player=0;
this.username_player="";
  this.spostamenti=new Array();            /* L'array  spostamenti contiene 58 elementi del tipo spostamenti[n]=x_y*/
  this.percorso = new Array();            /* Percorso[x_y]=new Array["puo essere 1, 2, 3","corrosponde a spostamenti[n]"]  
                                              l' array percorso contiene i 58 elementi e 
                                              inoltre le posizioni nelle quali andro a
                                              collocare le linee orizzontali e verticali */
  this.p_1;this.p_2;                     /*Verranno inizializzati in base al fatto che siamo in modalit� player_VS_player o player_VS_cpu   
                                        saranno del tipo: new human_player();  o new computer_player(); */        
  this.turno=0;                        /*La variabile indica il turno , quindi quale dei due player tirer�*/
  this.arbitro=0;                     /*E' una variabile ritornata dalla funzione  'mov_caselle()' che ci dice se il gioco  e' finito*/
  this.tipo_game=0;                  /*La variabile mi indica il tipo di gioco,
                                     se questo e'  player_VS_player o player_VS_cpu*/
  
 
this.DRAW_SPIRALE=DRAW_SPIRALE;                     /*Fa il calcolo delle posizioni della spirale dl percorso  da disegnare*/
this.DISEGNA_CAMPO = DISEGNA_CAMPO;                /*Disegna una tabella con i dati presenti nell array */
this.controlla_tipi_player=controlla_tipi_player; /*Controlla di che tipo sono i player*/
this.tira=tira;                                  /*Cambia lo stato delle caselle dei player in modo da indicare il turno di chi tira*/     
this.LANCIA=LANCIA;                             /*Lancia i dadi*/
this.calcolo_avanzamento=calcolo_avanzamento;  /*Calcola di quanto avanzare in base al lancio dei dadi*/
this.cerca_posizione=cerca_posizione;         /*Cerca la posizione, attraverso l'ausilio di mov_caselle(), dove andare a collocare le pedine */
this.mov_caselle=mov_caselle;                /*Fa il calcolo dei movimenti e assegna posizioni 
                                               decreta i vincitori e i  tipi di perdenti gestisce la iena*/

this.realizza_auto_Form=realizza_auto_Form;
/*****************************************************************************************************************/
/****************************************drawSpirale()************************************************************/
/*****************************************************************************************************************/

/*L' ALGORITMO USA LE FUNZIONI GONIOMETRICHE PER CREARE LA SPIRALE QUADRATA CHE MI SERVIRA A POPOLARE GLI ARRAY CHE NECESSITO*/
function DRAW_SPIRALE()
{  
  /*inizializzo this.percorso con stringhe vuote mi servira al momento
  della creazione dei campi <td> vuoti della tabella  di tipo class="tabella"*/
  for (y=0;y<17;y++){for (x=0;x<17;x++){this.percorso[x+"_"+y]=new Array("","");}}
  var x=0;var y=0;            //registrano le direzioni di movimento
  var oldx=0; var oldy=0;    //tengono le vecchie posizioni
  var a=0;var a2=0;         // tengono il valore dell'angolo
  var len=14;              //la lunghezza iniziale della prima linea
  var cont=0;             //tiene il conteggio dei pallini (gli assegna un numero da 0 a 57)
  var vx=0; var vy=0;    //sono variabili di supporto temporanee
           
  for (var j=0;j<14;j++)
  {
    for (var i=0;i<len;i++) 
    { 
      x=-Math.cos(a);
      y=Math.sin(a);
     
      vx=parseInt(oldx+14); vy=oldy;
      if(cont%2==0)
      {//CREO GLI ARRAY IN RUNTIME
        this.percorso[vx+"_"+vy]=new Array("1",cont/2); this.spostamenti[cont/2]=[vx+"_"+vy]; 
      }
      else
      {
        if(a2%2)
        this.percorso[vx+"_"+vy]=new Array("3","");
        else
        this.percorso[vx+"_"+vy]=new Array("2","");
      }
      oldx+=x;oldy+=y;
      cont++;
    }
    if (j==0) len+=2;
    else  
    {
      if (j==1)
      len-=4;
      else 
      {
        if (j==11 || j==9 || j==7|| j==5 || j==3) len-=2;
        if(j==12) len++;
      }
    }
    a2=(a2+1)%4;
    if (a2==0) a=0;
    if (a2==1) a=Math.PI/2;
    if (a2==2) a=Math.PI;
    if (a2==3) a=3*Math.PI/2;
  }
}

/*****************************************************************************************************************/
/****************************************disegnaTabella()*********************************************************/
/*****************************************************************************************************************/

	 function DISEGNA_CAMPO(id_box)	//id_box � il form che contiene la tabella.
	{
     //Qui si trovava l'array obrobbrioso al suo posto la funzione drawSpirale() crea gli array in RunTime
    this.DRAW_SPIRALE();  
    st = "<table border=0 class=\"tabella\">";
		for (y=0;y<17;y++)
		{	
			st+="<tr>";
			for (x=0;x<17;x++)
			{
      if(this.percorso[x+"_"+y][0]==1)
      { 
        if(this.percorso[x+"_"+y][1]==0)
        {
          st+="<td class=\"box_villaggio\" id=\""+x+"_"+y+"\" >";
        }
        else
        {
          if(this.percorso[x+"_"+y][1]==57)
          {
            st+="<td class=\"box_pozzo\" id=\""+x+"_"+y+"\" >";
          }
          else
          {
            st+="<td class=\"box_track_casella\" id=\""+x+"_"+y+"\" >";
          }
        }
        st+=this.percorso[x+"_"+y][1]+ 
        "<div id=\"item1_"+x+"_"+y+"\" class=\"item_1\" >"+
        "1</div>"+
        "<div id=\"item2_"+x+"_"+y+"\" class=\"item_2\" >"+
        "2</div>"+
           "<div id=\"item3_"+x+"_"+y+"\" class=\"item_3\" >"+
        "</div>"+
        "</td>";
      }
      else
      {
        if(this.percorso[x+"_"+y][0]=="2")
        { 
          st+="<td class=\"box_track_hor\" id=\""+x+"_"+y+"\" "+
          ">";  
      
        }
        else 
        {
          if(this.percorso[x+"_"+y][0]=="3")
          { 
            st+="<td class=\"box_track_vert\" id=\""+x+"_"+y+"\" "+
            ">";
          }
          else
          {
            st+="<td class=\"box_track_empty\" id=\""+x+"_"+y+"\" "+
            ">";
          }
        }  st+=""+
          "<br></td>";
      }
    }
    st+="</tr>";
  }
  st+="</table>";
  document.getElementById(id_box).innerHTML=st;
	} 
  
  /*****************************************************************************************************************/
/*************************************controlla_tipi_player()*****************************************************/
/*****************************************************************************************************************/

  /*CONTROLLA SE I PLAYER SONO DI TIPO HUMAN O CPU*/
  function controlla_tipi_player()
  {
    if(document.getElementById('RadioGroup2_0').checked )
    {
      alert('PLAYER VS PLAYER');
      document.getElementById('start').style.visibility="hidden";
      this.p_1=new human_player(); this.p_2=new human_player();
      this.p_1.set_name("Player 1");this.p_2.set_name("Player 2");
   
    }
    else
    {
      if(document.getElementById('RadioGroup2_1').checked )
      {
        alert('PLAYER VS CPU');  this.tipo_game=1;
        document.getElementById('start').style.visibility="hidden";
        this.p_1=new human_player();   this.p_2=new computer_player(); 
        this.p_1.set_name("Player 1"); this.p_2.set_name("Player 2");
      }
    }    
    st ="<input type=\"button\"  value=\"Lancia Bastoncini\" id=\"getta\" "+
    "onclick=\"miaTabella.LANCIA();\">";
    document.getElementById('div_getta').innerHTML=st;
    document.getElementById('div_getta').style.visibility="visible";
    document.getElementById('getta').style.visibility="visible";
    //document.write("prova"); 
    this.tira(this.turno);    
 
  }
  
/*****************************************************************************************************************/
/******************************************tira()*****************************************************************/
/*****************************************************************************************************************/
/*cambia lo stato delle caselle dei player in modo da indicare il turno di chi tira*/
  function tira(ilturno)
  {
    if(ilturno==0)
    { //      document.write("ss");      
      document.getElementById('giocatore_2').innerHTML="Player 2";
      document.getElementById('giocatore_1').innerHTML="Player 1"+"<br>"+"Tira";
    }
    else
    {if(ilturno==1)
    {
   // document.write("zz");      
      document.getElementById('giocatore_1').innerHTML="Player 1";
      document.getElementById('giocatore_2').innerHTML="Player 2"+"<br>"+"Tira";
    }
    }
  }
  
/*****************************************************************************************************************/
/******************************************lancia()***************************************************************/
/*****************************************************************************************************************/

function LANCIA()
{
  var dado=new Array();
  for(i=0;i<3;i++)
  {    
    dado[i]=Math.ceil(Math.random()*2);
  }
  for(y=0;y<3;y++)
  {      
    if((dado[i]%2)!=0)
    { 
      dado[i]=2;
    }
    else
    {
      dado[i]=1;
    }
  }
  var array_supporto=new Array();
  for(k=0;k<3;k++)
  {
      if(dado[k]==1)
      {
        array_supporto[k]="<div class=\"bianco\" "+
        ">Bastoncino nero</br>";
      }
      else
      {
        array_supporto[k]="<div class=\"nero\" "+
        ">Bastoncino bianco</br>";
      } 
      document.getElementById("box_"+(k+1)).innerHTML=array_supporto[k];//box1,box2,box3, sono i div dove mettero i bastoncini
  } //document.write("xx");     
  this.calcolo_avanzamento(dado);
}/**/
  
  
/*****************************************************************************************************************/
/******************************************calcolo_avanzamento()**************************************************/
/*****************************************************************************************************************/
function calcolo_avanzamento(dado)
{       

  /*-------------------------SE HO TRE TABE NERE (UGUALE A 1 STA PER TABA NERA) AVANZO DI 6 CASELLE*/
  if((dado[0]==1)&&(dado[1]==1)&&(dado[2]==1))
  {  
    if((this.turno==0&&(this.p_1.get_tabe()>=this.p_1.pay()))||(this.turno==1&&(this.p_2.get_tabe()>=this.p_2.pay())))
    {
      avanzamento=6;
      st="Hai diritto al rilancio";
      
      this.arbitro=this.cerca_posizione(avanzamento,this.turno);
      if(this.tipo_game==1)//se player2 e' cpu
      {
      if(this.arbitro==0)
        if(this.turno==1)//se il turno passa oppure resta alla cpu
        var t=setTimeout("miaTabella.LANCIA()",1500);
      }/* */
    }
    else          //se non ci sono tabe per il player 1 o per il player 2
    {
      avanzamento=0;        //non avanzo perche ancora non ho tabe
      st="Non hai Tabe "+"<br>"+"passi il turno al tuo avversario";
      //this.arbitro=this.cerca_posizione(avanzamento,this.turno);
      if(this.turno==0)//se gioca il player 1
      {
        this.turno=1;
      if(this.tipo_game==1)//se sto giocando contro la cpu, essendo che passo il turno, faccio gettare i bastoncini alla cpu
        {
          document.getElementById('getta').style.visibility="hidden";//nascondo il pulsante di lancio
        if(this.arbitro==0)
          var t=setTimeout("miaTabella.LANCIA()",1500);
        }  /**/
      }
      else//se gioca il player 2
      {
        this.turno=0; 
      if(this.tipo_game==1)
        { 
          if(this.arbitro==0)
          {
            document.getElementById('getta').style.visibility="visible";
          }
        } /* */
      } /**/ 
    }   

  }
  /*-------------------------SE HO TRE TABE BIANCHE (UGUALE A 2 STA PER TABA BIANCHE) AVANZO DI 3 CASELLE*/
  if((dado[0]==2)&&(dado[1]==2)&&(dado[2]==2))
  { 
    if((this.turno==0&&(this.p_1.get_tabe()>=this.p_1.pay()))||(this.turno==1&&(this.p_2.get_tabe()>=this.p_2.pay())))
    {
      avanzamento=3;
      st="Hai diritto al rilancio";
      this.arbitro=this.cerca_posizione(avanzamento,this.turno);
       if(this.tipo_game==1)//se player2 e' cpu
      {
       if(this.arbitro==0)
        if(this.turno==1){
        var t=setTimeout("miaTabella.LANCIA()",1500); } /**/
      } 
    }
    else
      {
      avanzamento=0;
      st="Non hai Tabe "+"<br>"+"passi il turno al tuo avversario";
      //this.arbitro=this.cerca_posizione(avanzamento,this.turno);
      if(this.turno==0)
      {
        this.turno=1;
        if(this.tipo_game==1)//se player2 e' cpu
        {
          
          document.getElementById('getta').style.visibility="hidden";
          if(this.arbitro==0)
          var t=setTimeout("miaTabella.LANCIA()",1500);
        }/**/
      }
      else
      {
        this.turno=0; 
       if(this.tipo_game==1)//se 
        { 
          if(this.arbitro==0)
          {
           document.getElementById('getta').style.visibility="visible";
          }
        } /**/
      }/**/
    }    

  }
  /*-------------------------SE HO UNA TABA NERA E DUE TABE BIANCHE, AVANZO DI 2 CASELLE E PASSO IL TURNO*/
  if(((dado[0]==1)&&(dado[1]==2)&&(dado[2]==2))||((dado[0]==2)&&(dado[1]==1)&&(dado[2]==2))||((dado[0]==2)&&(dado[1]==2)&&(dado[2]==1)))
  { 
    if((this.turno==0&&(this.p_1.get_tabe()>=this.p_1.pay()))||(this.turno==1&&(this.p_2.get_tabe()>=this.p_2.pay())))
    {
      avanzamento=2;
      st="Passi il turno al tuo avversario";
      this.arbitro=this.cerca_posizione(avanzamento,this.turno);
      if(this.turno==0)
      {
        this.turno=1;
        if(this.tipo_game==1)//se player2 e' cpu
        {
          document.getElementById('getta').style.visibility="hidden";
        if(this.arbitro==0)
         var t=setTimeout("miaTabella.LANCIA()",1500);
        }/**/
      }
      else
      {
        this.turno=0; 
       if(this.tipo_game==1)//se 
        { 
         if(this.arbitro==0)
          {
            document.getElementById('getta').style.visibility="visible";
          }
        } /**/
      }  /**/
    }
    else
    {
      avanzamento=0;
      st="Non hai Tabe "+"<br>"+"passi il turno al tuo avversario";
      //this.arbitro=this.cerca_posizione(avanzamento,this.turno);
      if(this.turno==0)
      {
        this.turno=1;
       if(this.tipo_game==1)//se player2 e' cpu
        {
          document.getElementById('getta').style.visibility="hidden";
          if(this.arbitro==0)
          var t=setTimeout("miaTabella.LANCIA()",1500);
        } /**/
      }
      else
      {
        this.turno=0; 
      if(this.tipo_game==1)
        { 
        if(this.arbitro==0)
          {
            document.getElementById('getta').style.visibility="visible";
          }
        }  /**/
      }
    }
         
  }
  /*-------------------------SE HO UNA TABA BIANCA E DUE TABE NERE, NON AVANZO DI ALCUNA CASELLA E OTTENGO UNA TABA*/
  if(((dado[0]==2)&&(dado[1]==1)&&(dado[2]==1))||((dado[0]==1)&&(dado[1]==2)&&(dado[2]==1))||((dado[0]==1)&&(dado[1]==1)&&(dado[2]==2)))
  {   

    avanzamento=0;
    st="Ottieni un Taba";
  if(this.turno==0)
    { 
      this.p_1.add_tabe(1);
      document.getElementById('taba_counter_1').innerHTML="";
      document.getElementById('taba_counter_1').innerHTML="Player 1 tabe"+"<br>"+this.p_1.get_tabe();
    }
    else
    { 
      this.p_2.add_tabe(1);
      document.getElementById('taba_counter_2').innerHTML="";
      document.getElementById('taba_counter_2').innerHTML="Player 2 tabe"+"<br>"+this.p_2.get_tabe();
      if(this.tipo_game==1)
      {
       if(this.arbitro==0)
        if(this.turno==1){
       var t=setTimeout("miaTabella.LANCIA()",1500);
   
       }
       // var t=setTimeout("this.LANCIA('box_1','box_2','box_3','box_fw','taba_counter_1','taba_counter_2','item1','item2')",1500);
      } 
    }
          

  }
  //finisce else*/
  info_avanzamento="Avanza di "+avanzamento+"<br>"+st;
  document.getElementById('box_fw').innerHTML=info_avanzamento;  
  this.tira(this.turno);
}
/*****************************************************************************************************************/
/**********************************************cerca_posizione()**************************************************/
/*****************************************************************************************************************/
function cerca_posizione(avanzamento,turno)
{
  if(turno==0)
  {
 // document.write("zero");
    var var_rit=this.mov_caselle(this.p_1,this.p_2,avanzamento,'item1_','item2_',1,'taba_counter_1');
  }
  else
  {
    if(turno==1)
    {
    //  document.write("uno");
      var var_rit=this.mov_caselle(this.p_2,this.p_1,avanzamento,'item2_','item1_',1,'taba_counter_2');
    }
  }
  return var_rit;
}
/***********************************************************************************************************************/
/******************************************mov_caselle1*****************************************************************/
/***********************************************************************************************************************/
function mov_caselle(p1,p2,avanzamento,item,item2,VX,taba_counter)//vx mi serve per accelerare la partita
{
    if(p1.stato_iena()==0)//SE LA IENA E' ZERO ALLORA ANCORA NON E' USCITA E IL PLAYER � IN CAMMINO
    {
      avanzamento=avanzamento*VX;
      if(p1.ritorno()==0)//se ancora il player non e' tornato al villaggio
      { 
        if((p1.get_posizione_temp().length)>0)//significa che gia una volta il player si e' mosso sul percorso
        {
          document.getElementById(item+p1.get_posizione_temp()).style.visibility="hidden";//la posizione precedente del player viene cancellata 
        }
      }
            
      if(p1.get_andata()==0)//SE STO ANDANDO AL POZZO 
      {     
        p1.cambia_avanza_player(avanzamento);//avanzo di avanzamento  
        if(this.spostamenti[p1.stato_avanza_player()]==undefined||this.spostamenti[p1.stato_avanza_player()]=="6_10")
        //se l'array con l'indice passato e' indefinito significa che mi trovo fuori dal percorso
        {       
          p1.forza_avanza_player(57); 
          p1.cambia_andata(1);

           if(p1.get_tabe()>=2){
            p1.dec_tabe(2);
            document.getElementById(taba_counter).innerHTML="";
            document.getElementById(taba_counter).innerHTML=p1.get_name()+" tabe"+"<br>"+p1.get_tabe(); p1.increase_payment(0);p1.payed(1);}
        }
      }
      else //SE STO ANDANDO AL POZZO....HO INVERTITO
      {
        if(p1.get_andata()==1)
        {
        if(p1.get_tabe()>=2&&p1.control_payment()==0)//controllo se gia' ho pagato e se ho le tabe richieste
        {
            p1.dec_tabe(2);
            document.getElementById(taba_counter).innerHTML="";
            document.getElementById(taba_counter).innerHTML=p1.get_name()+" tabe"+"<br>"+p1.get_tabe(); p1.increase_payment(0);p1.payed(1);
        }
          p1.indietreggia_player(avanzamento);// VIENE DECREMENTATO DELLA QUANTITA' AVANZAMENTO
          if(this.spostamenti[p1.stato_avanza_player()]==undefined||this.spostamenti[p1.stato_avanza_player()]=="14_0") 
          //se l'array con l'indice passato e' indefinito significa che mi trovo fuori dal percorso
          {       
            p1.forza_avanza_player(0); 
            p1.libera_iena(1);
            p1.cambia_andata(0);//inverto di nuovo il senso del percorso verso il pozzo
            p1.cambia_ritorno(1);//sono al villaggio
            if(p1.get_vincitore()==0&&p2.get_vincitore()==0)
            {
              p1.proclama_vincitore(1);
               p1.set_punteggio(3);//punteggio fine partita
              alert('VINCE IL PLAYER 2');
              p1.payed(0);
            }
            else
            {p1.cambia_posizione(this.spostamenti[p1.stato_avanza_player()]);//passo il valore a cambia posizione
            p1.cambia_posizione_temp(p1.get_posizione().toString());
            document.getElementById(item+p1.get_posizione()).style.visibility="visible";
             p1.set_punteggio(1);//punteggio fine partita altrimenti e' zero in quanto settato in precedenza
            alert('IL PLAYER 2, PERDE MA TORNA AL VILLAGGIO - LA PARTITA FINISCE QUI');
             
              document.getElementById('getta').style.visibility="hidden";
        if(this.livello_player>0){//se il livello di ingresso alal partita e' maggiore di zero quindi e' entrato un utente registrato
                document.getElementById('salva').style.visibility='visible';}//rendo visibile il pulsante di salvataggio

              return 1;
            }    
          }
        }   
      }p1.cambia_posizione(this.spostamenti[p1.stato_avanza_player()]);//passo il valore a cambia posizione
        p1.cambia_posizione_temp(p1.get_posizione().toString());
        document.getElementById(item+p1.get_posizione()).style.visibility="visible";
     
    }
    else///////////////////////////SE LA IENA E' PARTITA E STA ANDANDO AL POZZO //////////////////////////////////////////7
    {
      if(p1.stato_iena()>0)//SE LA IENA STA ANDANDO AL POZZO 
      {
           avanzamento=avanzamento*(VX*2);//LA IENA AVANZA A VELOCITA' DOPPIA
           if((p1.get_posizione_temp().length)>0)//se temp_1>0 significa che gia una volta il player si e' mosso sul percorso
          {
            document.getElementById('item3_'+p1.get_posizione_temp()).style.visibility="hidden";
          } 
        //document.write("XXX");
        if(p1.get_andata()==0)//LA IENA VIAGGIA VERSO IL POZZO
        { 
          p1.cambia_avanza_player(avanzamento); //L'INDICE VIENE INCREMENTATO DELLA QUANTITA' AVANZAMENTO
          
          if(this.spostamenti[p1.stato_avanza_player()]==undefined||this.spostamenti[p1.stato_avanza_player()]=="6_10")
          //se l'array con l'indice passato e' indefinito significa che mi trovo fuori dal percorso
          {       
            p1.forza_avanza_player(57); 
            p1.cambia_andata(1);
            p1.increase_payment(10);
            if(p1.get_tabe()>=10){
            p1.dec_tabe(10);
            document.getElementById(taba_counter).innerHTML="";
            document.getElementById(taba_counter).innerHTML=p1.get_name()+" tabe"+"<br>"+p1.get_tabe(); p1.increase_payment(0);p1.payed(1);}
          }
        }
        else//LA IENA TORNA AL VILLAGGIO DOPO ESSERSI DISSETATA AL POZZO
        {
          if(p1.get_andata()==1)
          {
            if(p1.get_tabe()>=10&&p1.control_payment()==0)//controllo se gia' la iena ha pagato e se ha le tabe richieste
            {
              p1.dec_tabe(10);
              document.getElementById(taba_counter).innerHTML="";
              document.getElementById(taba_counter).innerHTML=p1.get_name()+" tabe"+"<br>"+p1.get_tabe(); p1.increase_payment(0);p1.payed(1);
            }
            p1.indietreggia_player(avanzamento);
            if(this.spostamenti[p1.stato_avanza_player()]==undefined||this.spostamenti[p1.stato_avanza_player()]=="14_0") 
            {       
              this.forza_avanza_player(0); 
            }
              
          }
        }
          p1.cambia_posizione(this.spostamenti[p1.stato_avanza_player()]);
          p1.cambia_posizione_temp(p1.get_posizione().toString());//variabile temporanea
          document.getElementById('item3_'+p1.get_posizione()).style.visibility="visible";
          if((p1.get_andata()==1)&&(p2.stato_iena()==0))//se la mia iena sta tornando e se il mio avversario e' sul percorso
          {
            if((p1.stato_avanza_player())<=(p2.stato_avanza_player()))
            { 
              document.getElementById('getta').style.visibility="hidden";
              document.getElementById(item2+p2.get_posizione()).style.backgroundImage ="url('img/w1_killed.png')"; 
              if(this.livello_player>0){//se il livello di ingresso alal partita e' maggiore di zero quindi e' entrato un utente registrato
              document.getElementById('salva').style.visibility='visible';}//rendo visibile il pulsante di salvataggio
             
              alert("IL PLAYER 1 E' STATO MANGIATO DALLA IENA IL GIOCO FINISCE QUI");
            
              return 1;
              //document.write("fine");
            }
          }
      }
    }
    return 0;
      
}
//metodo che disegna un form, lo riempe con i dati di fine partita
	function realizza_auto_Form(destinazione,path)
	{	
		str = "<form action=\""+path+"\" method=\"POST\" id =\"form_da_submit\" >";
	
			str+="<input type=\"hidden\" id=\"my_user\" value =\""+this.username_player+"\" name =\"my_user\" />";
      str+="<input type=\"hidden\" id=\"my_liv\" value =\""+this.p_2.get_tipo()+"\" name =\"my_liv\" />";
      str+="<input type=\"hidden\" id=\"punteggio1\" value =\""+this.p_1.get_punteggio()+"\" name =\"punteggio1\" />";
      str+="<input type=\"hidden\" id=\"punteggio2\" value =\""+this.p_2.get_punteggio()+"\" name =\"punteggio2\" />";
		str+="<input type=\"submit\" style=\"visibility:hidden;\"/>";
   
		str+="</form>";
		document.getElementById(destinazione).innerHTML+=str;
		document.getElementById("form_da_submit").submit(); 
	}


/***************************************************************************************************************************************/
/***************************************************************************************************************************************/
/***************************************************************************************************************************************/
}