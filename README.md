# Table-Game

Team: Allegra
Realizzare una piattaforma di gioco su scacchiera, estendibile e
basata su classi JavaScript.
Dovranno essere presenti le classi:
- Player
 - ComputerPlayer
 - HumanPlayer
- GameBoard

Bisogna prevedere la possibilità di sostituire la classe
ComputerPlayer in maniera veloce ed efficiente usando un sistema di
selezione di classi JavaScript.
Le specializzazione della classe ComputerPlayer vanno salvate su files
diversi, in maniera da includere solo quella selezionata l'utente (ad
esempio: hard - hardComputerPlayer.js").
Il file .js dovrà contenere una o piu' funzioni/metodi specializzanti
la classe giocatore specifica.

Info: http://www.pergioco.net/Giochi/GiochiDiTavoliere/Iena/Iena.htm

Status: Assigned

Tag: 0x46

# Files usati:

index.php //la pagina principale

funzioni.php //contiene la classe Gestore_login per la gestione dei login

punteggi.php

funzioni_punteggi.php //contiene i metodi usati dentro punteggi.php

GameBoard.js //contiene tutti i metodi di gestione e costruzione della tabella e dei suoi player

player.js //contiene i metodi della classe player ereditata da human_player computer_player

human_player.js

computer_player.js

funzioni.js  //contiene alcune funzioni di supporto slegate dalle altre classi compresa la funzione crea() che mi servira come scheletro per la mia classe GameBoard()

login.dat //contiene i dati di login dei player

punteggio.dat// contiene i risultati delle partite

style.css 

Le pagina di login e di logout vengono gestiti in index.php tramite funzioni.php che contiene i metodi della classe  GestoreLogin.
Questi gestiscono la registrazione dei player, o il semplice login
SOLO chi e' registato puo salvare i punteggi della propria partita e vedere quelli degli altri giocatori,
L'utente NON REGISTRATO puo anche esso giocare ma non potra registare i propri punteggi ne tantomeno vedere quelli degli altri.

index.php usa funzioni.php,funzioni.js,
player.js 
human_player.js
computer_player.js
style.css 
punteggi.php usa funzioni_punteggi.php prende i parametri passati tramite POST da index.php e 
scrive su punteggio.dat che contiene i risultati delle partite
