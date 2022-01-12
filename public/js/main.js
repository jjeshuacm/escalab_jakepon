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
  
    
    constructor(player){
        this.player = player;
        this.computer = new Computer;
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
        this.soundGame("loser")
       
        
    }
   
    doTurn(action){ 
            const playerAction = this.player.doAction(action);
            const computerAction = this.computer.doAction();
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
        rock : 100,
        paper: 20,
        scissors: 40,
    }

    constructor(){  }
    
    calPoint([option,damage,user]){
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
        this.maxPoint = 100;
    }

    doAction(action){
        console.log(this.name+" "+action);
        let amountPoint = this.actionType2[action];
        return [action, amountPoint, this.user];
    }

}

class Computer extends Character{
    constructor(){
        super();
        this.user = "main2"
        this.name = "Robot"
        this.maxPoint -= 30;
    }
    doAction(){
     
        const j = this.randomAttack(0,3); //validar valores negativos
        let pointAttack = this.actionType2[j];
        console.log(pointAttack);
        let damage = 0;
        damage =   this.doAttack( this.maxPoint);
        return [j, damage, this.user];
       
    }
}



const player = new Player();
const game = new Game(player);


const optionGame = document.getElementsByClassName("btnAction");
Array.from(optionGame).forEach(el => el.addEventListener('click',() => game.doTurn(el.id)));