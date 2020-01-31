
let app = new Vue({
    el:'#main',
    data:{
        player: {
            life: 100,
            classColorLife: 'bg-success',
            basic_attack: { 
                    min: 4,
                    max: 10
                }
            ,
            special_attack: { 
                    min: 13,
                    max: 20
                }
            ,
            defense: 40
        },
        monster : {
            life: 100, 
            classColorLife: 'bg-success',     
            attack: { 
                min: 8 ,
                max: 15
            },
            defense: 40
        },
        log:{      
            alerts:[],
        },
        game:{
            txtResult: '',
            classResult: '',
            start: false,
            surrender: false,
            restart: true,
            end: false,
            textBtnStart: 'Começar o Jogo.'
        }   
    },
    watch:{
        'player.life': function(dataNew, dataOld){

            if  ( dataNew <= 0 ){   
                this.game.txtResult = "Vocẽ foi completamente aniquilado!";
                this.game.classResult = 'alert-danger';
                this.game.end = true;                
            }
            if( dataNew <= 20 ){  
                this.player.classColorLife = 'bg-danger';
                
            }
            if( dataNew > 20 ){  
                this.player.classColorLife = 'bg-success';
            }           
            
        },
        'monster.life': function(dataNew, dataOld){
            if  ( dataNew <= 0 ){   
                this.game.txtResult = "VOCÊ ACABOU COM O SEU OPONENTE! UOUUU \O/";
                this.game.classResult = 'alert-success';
                this.game.end = true;
            }
                                       
            if( dataNew <= 20 ){  
                this.monster.classColorLife = 'bg-danger';
            } 

            if( dataNew > 20 ){  
                this.monster.classColorLife = 'bg-success';
            }    
        },
        'game.end': function(dataNew, dataOld)
        {
            if (dataNew){
                this.finishGame()
            }
        }
    },
    methods: {
        basic_attack() { 
            this.attackBasicInThePlayer();             
            this.attackBasicInTheMonster();            
        },
        startGame(){
            this.player.life = 100;
            this.monster.life = 100;
            this.log.alerts = [];
            this.game.start = true; 
            this.game.surrender = false;
            this.game.end = false;                       
        },
        finishGame(){
            this.game.start = false;
            this.game.end = true;
            this.game.textBtnStart = 'Recomeçar';
        },
        surrender(){            
            this.game.start = false;
            this.game.end = true;
            this.game.surrender = true;
            this.game.textBtnStart = 'Recomeçar';
            this.log.alerts.push({ 'message' : 'Vocễ desistiu, vida reduzida de ' + this.player.life + ' para 0' , 'class' : 'alert-danger' })
            this.player.life = 0;
        },
        special_attack(){        
            this.attackBasicInThePlayer();     
            this.attackSpecialInTheMonster();                        
        },
        getCura(){
            let heal = this.getRandomIntInclusive(7, 20);                        
            let lifeOld  =  this.player.life;
            this.player.life +=   heal;
            this.log.alerts.push( { 'message': 'O Jogador recebeu  ' + heal + ' de cura, vida aumentou de ' + lifeOld + ' para ' + this.player.life, 'class':  'alert-success' });                                                      
            this.attackBasicInThePlayer(); 
                                 
        },
        attackBasicInTheMonster(){   
            let attack =  this.getRandomIntInclusive(this.player.basic_attack.max, this.player.basic_attack.min);            
            let lifeNew = this.monster.life;
            let lifeOld = this.monster.life -= attack;
            this.createObjToLogAtack(attack, lifeNew, lifeOld, 'Monstro', 'alert-success');  
        },
        attackBasicInThePlayer(){                        
            let attack = this.getRandomIntInclusive(this.monster.attack.max, this.monster.attack.min);
            let lifeOld = this.player.life;         
            let lifeNew = this.player.life  -= attack;   
            
            this.createObjToLogAtack(attack, lifeNew, lifeOld, 'Jogador', 'alert-danger');           
        },
        attackSpecialInTheMonster(){      
            let attack = this.getRandomIntInclusive(this.player.special_attack.max, this.player.special_attack.min);            
            let lifeOld = this.monster.life;
            let lifeNew = this.monster.life  -= attack;

            this.createObjToLogAtack(attack, lifeNew, lifeOld, 'Monstro', 'alert-success');
        },   
        getRandomIntInclusive(max, min){
            let min = Math.ceil(min);
            let max = Math.floor(max);

            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        createObjToLogAtack(attack, lifeNew, lifeOld, defenderString, classString){            
            this.log.alerts.push( { 'message': 'O ' + defenderString + ' recebeu ' + attack + ' de dano, vida reduzida de ' + lifeOld + ' para ' + lifeNew, 'class':  classString });                                                      
        },    
        
      }
});



