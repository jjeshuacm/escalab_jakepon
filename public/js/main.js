'use stric'
class Game{
    shifts = 10;
    win = 100;
    lost = 30;
    tie = 0;
    totalPoints= 0;
    player;
    computer;
    
    constructor(player){
        this.player = player;
        this.computer = new Computer;
    }
    endGame(){
        //total de puntos generados despues de los 10 turnos.
          this.shifts -= 1;
          if(this.shifts ===0)alert("fin de turnos"); //guardar total de puntos 
          else alert(this.shifts);

        // if (this.shifts.getLife() === 0) alert('perdiste');
        // else if (this.shifts.getLife() === 0) alert('ganaste');
    }
    //turnos del juego 
    doTurn(action){
            //ejecutar accion del jugador
            const playerAction = this.player.doAction(action);
            //ejecutar accion del enemigo
            const computerAction = this.computer.doAction();
            //opciones 
            const calpoint = this.player.calPoint(playerAction)
            const calpoint2 = this.computer.calPoint(computerAction)
            //revisar cantidad de turnos
            this.endGame();
     

    }

}
//mas opciones //elepcion random entre un inicio y un fin //al momento de definir un jugador //si la elige un ataque ramdom
class Character{
    name;
    randoMin= 0;
    randoMax= 0;
    basePoint = 0;
    maxPoint = 100;
    name = "";
    user = "";
    //envio de las opciones dinamicas?
    // actionType = ['rock','paper','scissors'];
    //valores defectos de cada opcion
    actionType2 = {
        rock : 100,
        paper: 20,
        scissors: 40,
    }

    constructor(){ 

        // modificar propiedades heredadas 
        // recibir y modificar sus propios parametros al instanciar 
    }
    //calcular
    calPoint(cantidad=0, character=0){
//pintar()
    }
//pintar
    drawPoint(jugador) {
        const lifebar = document.getElementById(id);
        // lifebar.style.width = `${(this.life / this.maxLife) * 100}%`;
    }

    drawOption(players){
        // const lifebar = document.getElementById(id);
        //cambiar imagen segun personaje
    }
    //validar solo las 3 opciones no los main

    doAttack(){
        return this.basePoint;
    }
    //atack alatorio para los dos. solo activado para enemigo
    //max default debe ser el total de array -1
    randomAttack(min=0,max=0){
        this.randoMin = min;

        const objectSize = Object.keys(this.actionType2).length;
   
        //retornar que se ha elegido un valor al maximo de opciones si max > length
        // this.randoMax = max > this.actionType.length ? this.actionType.length : max;
        this.randoMax = max > objectSize.length ? objectSize.length : max;
       
        console.log( this.randoMin,  this.randoMax);
        //contar total de datos en actiontype
         // Retorna un entero aleatorio entre min (incluido) y max (excluido)
        const j =  Math.floor(Math.random() * (this.randoMax - this.randoMin)+ this.randoMin);
        // console.log(j);
        //randomOptionSelected
        
        
        //convertir objecto en array para aplicar filter
        const propertyNames = Object.keys(this.actionType2);
        // console.log(propertyNames);
        // console.log(j);
        // let found = propertyNames.find(e => e.name === j);
        let action = propertyNames[j];
        // console.log(action);
        return action;
    }
}

class Player extends Character{
   
    constructor(){
        //llamado a el constructor clase padre
        super();
        this.user = "ps1";
        this.name = "jhon";
        this.maxPoint = 100;
    }

    doAction(action){
        console.log(this.name+" "+action);
        let amountPoint = this.actionType2[action];

        return [action, amountPoint, this.user];
        // let main1Option = this.drawOption(this.user);
        // return amountPoint;
    }

}

class Computer extends Character{
    constructor(){
        super();
        this.user = "cup"
        this.name = "Robot"
        this.maxPoint -= 30;
    }
    doAction(){
        //obtener valores alatorios entre inicio y fin : si cambian la cantidad de elementos.
        //optener las opciones del padre
        //elegir una al azar
        const j = this.randomAttack(0,3); //validar valores negativos
        //puntos por cada opcion configurables segun la elegida
        //enviar valor a restar para cada opcion dinamica
        //filter? buscar en array
        // console.log(j);
        let pointAttack = this.actionType2[j];
        console.log(pointAttack);
        let damage = 0;
        damage =   this.doAttack( this.maxPoint);
        // let main1Option = this.drawOption(this.user);

        return [j, damage, this.user];
        // return damage;
        // console.log(pointAttack);
      
        //    if (action === 'heal' && this.life === this.maxLife) action = 'strong';
     

       
    }
}



const player = new Player();
//iniciar juego 
const game = new Game(player);



//Convertir htmlCollection en array. 
    //Recorrer elementos de array con foreach.
        //Añadir Evento click a cada elemento del foreach
            //llamado a la instancia de clase y al metodo doTurn

        //  Array.from(optionGame).forEach((el)=>{
        //         el.addEventListener('click', ()=>{
        //             console.log(el.id);
        //             })
        //     });
//validar si no se ha enviado nada en el elmento?
const optionGame = document.getElementsByClassName("btnAction");
Array.from(optionGame).forEach(el => el.addEventListener('click',() => game.doTurn(el.id)));