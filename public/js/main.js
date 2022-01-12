'use stric'
class Game{
    shifts = 10;
    win = 100;
    lost = 30;
    tie = 0;
    totalPoints= 0;
    player;
    computer;
    ext = "ogg";
    aimGame = ["Empate","Ganas","Pierdes"];
    logicGame = [
        [0,1,2],
        [2,0,1],
        [1,2,0],
    ]
  
    constructor(player){
        this.player = player;
        this.computer = new Computer;
    }

    doTurnWin(actionplayer,actionComputer){
        //[fila=player ][Colum = CPU]
      let result = this.logicGame[actionplayer][actionComputer];
      let resultAim = this.aimGame[result];

      const shifts = document.getElementById("resultplayer");
      shifts.innerText= resultAim;

      this.soundGame(resultAim);

      return resultAim;
      
    }
    soundGame(nameSound){
        //loser sound
        const music = new Audio( `public/sound/${nameSound}.${this.ext}`);   
        let playPromise = music.play();
        playPromise.then(()=>console.log(`play automatic`)).catch((error)=>console.log(`automatic fail ${error}`));  
    }

    endGame(){
      
        this.shifts -= 1; 

        if(this.shifts ===0)alert("fin de turnos"); //guardar total de puntos 
        else alert(this.shifts);

        //add shifts view
        const shifts = document.getElementById("shifts");
        shifts.innerText= this.shifts;

       
    }

   
    doTurn(action){ 
            const playerAction = this.player.doAction(action);
            const computerAction = this.computer.doAction();

            const [,optPlayer,] = playerAction;
            const [,optComputer,] = computerAction;

            console.log(playerAction, computerAction);
            console.log(optPlayer, optComputer);

            const turnWin = this.doTurnWin(optPlayer,optComputer);
            console.log(turnWin);

            const calpoint = this.player.calPoint(playerAction)
            const calpoint2 = this.computer.calPoint(computerAction)
            this.endGame();
    }
}

class Character{
    name;
    randoMin= 0;
    randoMax= 0;
    basePoint = 0;
    maxPoint = 100;
    name = "";
    user = "";

    actionType2 = {
        rock : 0,
        paper: 1,
        scissors: 2,
    }

    constructor(){  }
    
    calPoint([option,damage,user]){
        this.basePoint = 0;

        this.drawOption(option,user);
    }

    drawPoint(jugador) {
        const lifebar = document.getElementById(id);
    }

    drawOption(opt,usr){
        const iconOption = document.getElementById(usr);
        iconOption.style.backgroundImage=`url(public/img/${opt}.svg)`;
    }
 

    doAttack(){
        return this.basePoint;
    }
 
    randomAttack(min=0,max=0){
        this.randoMin = min;
        const objectSize = Object.keys(this.actionType2).length;
        this.randoMax = max > objectSize.length ? objectSize.length : max;
        const j =  Math.floor(Math.random() * (this.randoMax - this.randoMin)+ this.randoMin);
        const propertyNames = Object.keys(this.actionType2);
        let action = propertyNames[j];
        return action;
    }
}

class Player extends Character{
   
    constructor(){
        super();
        this.user = "main1";
        this.name = "jhon";
        this.basePoint = 0;
        this.maxPoint = 100;
    }

    doAction(action){
        // console.log(this.name+" "+action);
        let amountPoint = this.actionType2[action];
        return [action, amountPoint, this.user];
    }

}

class Computer extends Character{
    constructor(){
        super();
        this.user = "main2"
        this.name = "Robot"
        this.maxPoint = 30;
    }
    doAction(){
     
        const j = this.randomAttack(0,3); //validar valores negativos
        let pointAttack = this.actionType2[j];
        console.log(pointAttack);
        let damage = 0;
        damage =   this.doAttack( this.maxPoint);
        return [j, pointAttack, this.user];
       
    }
}



const player = new Player();
const game = new Game(player);


const optionGame = document.getElementsByClassName("btnAction");
Array.from(optionGame).forEach(el =>{ 
    el.addEventListener('click',() => game.doTurn(el.id));
    el.addEventListener('mouseover',() => game.soundGame("Button"));
});