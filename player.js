function player()
{
this.numero_taba=0;//mi  dice il numero di tabe per il player viene inizializzato  a zero
this.iena=0;
this.tornato=0;
this.andato=0;
this.temporaneo="";
this.avanza_player=0;
this.posizione="";
this.vincitore=0;
this.pagamento=1;
this.stato_pagamento=0;
this.punti=0;

/*Incrementa il numero delle tabe*/
player.prototype.add_tabe=function(val)
{
  this.numero_taba+=val;
};
/*Decrementa il numero delle tabe*/
player.prototype.dec_tabe=function(val)
{
  this.numero_taba-=val;
};
/*Ritorna il numero delle tabe*/

player.prototype.get_tabe=function()
{
return this.numero_taba;

};

player.prototype.stato_iena=function()//ci dice se la iena e' ancora al villaggio se è uguale a zero
{
return this.iena;
};
player.prototype.libera_iena=function(val)//fa uscire la iena
{
this.iena=val;
};


player.prototype.ritorno=function()//mi dice se il player e' tornato al villaggio se uguale a 0 non e' tornato
{
return this.tornato;
};
player.prototype.cambia_ritorno=function()//cambia lo stato di tornato a 1
{
this.tornato=1;
};

player.prototype.get_andata=function()//mi dice se il player e' andato al pozzo 
{
return this.andato;
};
player.prototype.cambia_andata=function(val)//cambia lo stato di andato a 1
{
this.andato=val;
};



player.prototype.get_posizione_temp=function()//da lo stato della variabile di supporto che tiene la posizione del mio player
{
return this.temporaneo;
};
player.prototype.cambia_posizione_temp=function(temp)//cambia lo stato della variabile di supporto che tiene la posizione del mio player
{
this.temporaneo=temp;
};

//DA LA POSIZIONE ATTUALE DEL MIO PLAYER
player.prototype.get_posizione=function()
{
return this.posizione;
};
player.prototype.cambia_posizione=function(temp)
{
this.posizione=temp;
};





player.prototype.stato_avanza_player=function()
{
return this.avanza_player;
};
player.prototype.cambia_avanza_player=function(variabile)
{
this.avanza_player+=variabile;
};
player.prototype.indietreggia_player=function(variabile)
{
this.avanza_player-=variabile;
};
player.prototype.forza_avanza_player=function(variabile)//
{
this.avanza_player=variabile;
};





player.prototype.get_vincitore=function()//
{
return this.vincitore;
};

player.prototype.proclama_vincitore=function(variabile)//
{
this.vincitore=variabile;
};

/********************controllo sul pagamento al pozzo***************************/

player.prototype.pay=function()//
{
return this.pagamento;
};

player.prototype.increase_payment=function(variabile)//
{
this.pagamento=variabile;
};
player.prototype.control_payment=function()//
{
return this.stato_pagamento;
};
player.prototype.payed=function(x)//
{
this.stato_pagamento=x;
};
/************************assegno un punteggio al player********************************************/
player.prototype.set_punteggio=function(x)//
{
this.punti=x;
};
player.prototype.get_punteggio=function()//
{
return this.punti;
};
/////////////////////////////
}
//player.prototype.constructor=player;
