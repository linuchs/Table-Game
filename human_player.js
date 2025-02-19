
function human_player()
{
this.tipo = "HUMAN";
this.name="";

 human_player.prototype.get_tipo= function (){
 				 return (this.tipo);
 			};

human_player.prototype.set_name= function (nome){
        this.name=nome;
 			};
human_player.prototype.get_name= function (){
 				 return (this.name);
 			};
}


human_player.prototype = new player;
human_player.prototype.constructor=human_player;
