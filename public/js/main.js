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
    logicGame = [[0,1,2],[2,0,1],[1,2,0]];
  
    constructor(player){
        this.player = player;
        this.computer = new Computer;
    }

    doTurnWin(actionplayer,actionComputer){
        //[fila=player ][Colum = CPU]
      let result = this.logicGame[actionComputer][actionplayer];
      let resultAim = this.aimGame[result];
      let shifts = document.getElementById("resultplayer");

      shifts.innerText= resultAim;

      this.soundGame(resultAim);

      return result;
      
    }
    soundGame(nameSound, volume=0.70){
        const music = new Audio( `public/sound/${nameSound}.${this.ext}`);   
        music.volume = volume;
        const playPromise = music.play();
        playPromise.then(()=>console.log(`play automatic`)).catch((error)=>console.log(`automatic fail ${error}`));  
    }

    endGame(resturnwin){
      
        this.shifts -= 1; 

        if(this.shifts ===0){
            alert(`fin de turnos, puntos totales: ${resturnwin}`); 
            const poinRegistre = document.getElementById(`rightSide`);
           
            let HTMLString = `<div class="poinregistre" id="poinregistre">${resturnwin}</div>`;
            poinRegistre.innerHTML += HTMLString;

             
            this.player.bd.push(resturnwin);
                
            let liElements = document.querySelectorAll("div[id^='poinregistre']");
            console.log(liElements.length);
            if (liElements.length > 5) { 

                liElements[0].remove();
                this.player.bd.shift();
            
            }
            console.log(this.player.bd);

            localStorage.point = JSON.stringify(this.player.bd);

            this.shifts=10;
            this.player.totalPoint=0;
            this.soundGame("win");

        }
       
        const shifts = document.getElementById("shifts");
        shifts.innerText= this.shifts;

    }

    validatePoint(trnwin,poinps,pointcpu){

        if(trnwin===1) this.player.totalPoint+=poinps;
        else if(trnwin===2) this.player.totalPoint-=pointcpu;
        else this.player.totalPoint+=0;
        return this.player.totalPoint;
    }

   
    doTurn(action){ 
            const playerAction = this.player.doAction(action);
            const computerAction = this.computer.doAction();

            const [,optPlayer,,pointPs] = playerAction;
            const [,optComputer,,pointCPU] = computerAction;

            let turnWin = this.doTurnWin(optPlayer,optComputer);
        
            let resTurnWin = this.validatePoint(turnWin,pointPs,pointCPU)
      
            playerAction.push(turnWin,resTurnWin);
      
           
            const calpoint = this.player.calPoint(playerAction);
            const calpoint2 = this.computer.calPoint(computerAction);
            this.endGame(resTurnWin);
    }
}

class Character{
    
    randoMin= 0;
    randoMax= 0;
    totalPoint = 0;
    basePoint = 0;
    maxPoint = 0;
    name = "";
    user = "";
    bd =[];
    actionType2 = { rock : 0, paper: 1, scissors: 2,}

    constructor(){  }

    calPoint([option,idoption,user,point,turwin=null,returnwin=null]){

        this.drawPoint(point,returnwin,user,turwin);
        this.drawOption(option,user);
    }


    drawPoint(ptn, rtrnwin,usr,twin) {

        const pointBar= document.getElementById(`total${usr}`);
        pointBar.innerText= rtrnwin;
        const PointSumBar = document.getElementById(`total${usr}Sum`);   
    }


    drawOption(opt,usr){
        const iconOption = document.getElementById(usr);
        iconOption.style.backgroundImage=`url(public/img/${opt}.svg)`;
    }
 

    doAttack(maxpoint){
        return this.basePoint=maxpoint;
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
        this.totalPoint = 0;
        this.maxPoint = 100;
    }

    doAction(action){
        let idPoint = this.actionType2[action];
        let resPoint = this.doAttack(this.maxPoint);
        return [action, idPoint, this.user, resPoint];
    }

    recordPoint(){ }

}

class Computer extends Character{
    constructor(){
        super();
        this.user = "main2";
        this.name = "Robot";
        this.basePoint = 0;
        this.totalPoint = 0;
        this.maxPoint = 30;
    }
    doAction(){
     
        const j = this.randomAttack(0,3); //validar valores negativos
        let idOption = this.actionType2[j];
        let resPoint =   this.doAttack(this.maxPoint);
        return [j, idOption, this.user, resPoint];
       
    }
}



const player = new Player();
const game = new Game(player);


const optionGame = document.getElementsByClassName("btnAction");
Array.from(optionGame).forEach(el =>{ 
    el.addEventListener('click',() => game.doTurn(el.id));
    el.addEventListener('mouseover',() => game.soundGame("Button",0.09));
});


//LOGIN


class Auth{
    password = "admin";
    user= "admin";
    isLoggedIn=false;
    constructor(){}
    doLogin(password, user){
        
        const containerLogin = document.getElementById("containerLogin");
        const container = document.getElementById("container");

        if(this.password === password && this.user === user) {
            this.isLoggedIn = true; 
       
            containerLogin.style.visibility=`hidden`;
            containerLogin.style.display=`none`;
            container.style.visibility=`visible`;
            container.style.display=`grid`;
            console.log("ingreso");
        }else {
            container.style.visibility=`hidden`;
            container.style.display=`none`;
            containerLogin.style.visibility=`visible`;
            containerLogin.style.display=`flex`;
            
            console.log("no ingreso");
        } 
    }


}

const auth = new Auth(player);

const user = document.getElementById("user");
const password = document.getElementById("password");
const submit = document.getElementById("submit");


const poinRegistre = document.getElementById(`rightSide`); 






submit.addEventListener('click',() =>{

    // if(!auth.isLoggedIn) {console.log("no hay sesion"); return}

    
    auth.doLogin(password.value, user.value);

    const arr = localStorage.point;
        console.log(arr);
        if(arr!=undefined){
            let arrStorage =  JSON.parse(arr); 
            if (arrStorage.length > 0 ) {
                arrStorage.forEach((element)  => {
                    let HTMLString = `<div class="poinregistre" id="poinregistre">${element}</div>`;
                    poinRegistre.innerHTML += HTMLString;
                });
            }
        }
 
    

    // Credenciales erroneas

});

