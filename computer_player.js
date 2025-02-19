   
function computer_player()
{
this.tipo = "CPU";
this.name="";
 computer_player.prototype.get_tipo= function (){
 				 return (this.tipo);
 			};
      
computer_player.prototype.set_name= function (nome){
        this.name=nome;
 			};
computer_player.prototype.get_name= function (){
 				 return (this.name);
 			};
}


computer_player.prototype = new player;
computer_player.prototype.constructor=computer_player;

