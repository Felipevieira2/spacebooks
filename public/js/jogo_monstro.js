
let app = new Vue({
    el:'#main',
    data:{
        player :{
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
            lastAtackInMonster:'',
            lastAtackInPlayer:'',
            lastHealInPlayer:'',
            alerts:[],
        },
        game:{
            result:'',
            start: false,
            restart: true,
            end: false,
            textBtnStart: 'Começar o game'
        }   
    },
    watch:{
        'player.life': function(dataNew, dataOld){

            if  ( dataNew <= 0 )
            {   
                this.game.result = "Vocẽ foi completamente aniquilado!";
                this.game.end = true;
            }

            if( dataNew <= 20 )
            {  
                this.player.classColorLife = 'bg-danger';
                
            }
            if( dataNew > 20 )
            {  
                this.player.classColorLife = 'bg-success';
            }  
            
                      
            
        },
        'monster.life': function(dataNew, dataOld){
            if  ( dataNew <= 0 )
            {   
                this.game.result = "VOCÊ ACABOU COM O SEU OPONENTE! UOUUU \O/";
                this.game.end = true;
            }
                                       
            if( dataNew <= 20 )
            {  
                this.monster.classColorLife = 'bg-danger';
            } 

            if( dataNew > 20 )
            {  
                this.monster.classColorLife = 'bg-success';
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
        },
        surrender(){            
            this.game.start = false;
            this.game.end = true;
            this.game.textBtnStart = 'Recomeçar';
            this.log.alerts.push({ 'message' : 'Vocễ desistiu, vida reduzida de ' + this.player.life + ' para 0' , 'class' : 'alert-danger' })
            this.player.life = 0;
        },
        special_attack() {        
            this.attackBasicInThePlayer();     
            this.attackSpecialInTheMonster();                        
        },
        getCura(){
            let heal = this.getRandomIntInclusive(7, 20);                        
            this.log.lastHealInPlayer = heal;
            let lifeOld  =  this.player.life;
            this.player.life +=   heal;
            this.log.alerts.push( { 'message': 'O Jogador recebeu  ' + heal + ' de cura, vida aumentou de ' + lifeOld + ' para ' + this.player.life, 'class':  'alert-success' });                                                      
            this.attackBasicInThePlayer(); 
                                 
        },
        attackBasicInTheMonster()
        {   
            let attack =  this.getRandomIntInclusive(this.player.basic_attack.max, this.player.basic_attack.min);            
            let monsterLifeOld = this.monster.life;
            let monsterLifeNew = this.monster.life -= attack;

            this.log.alerts.push( { 'message' : 'O Monstro recebeu ' + attack + ' de dano, vida reduzida de ' + monsterLifeOld + ' para ' +   monsterLifeNew , 'class' :  'alert-success' });
        },
        attackBasicInThePlayer()
        {                        
            let attack = this.getRandomIntInclusive(this.monster.attack.max, this.monster.attack.min);
            let lifeOld = this.player.life;
         
            let lifeNew = this.player.life  -= attack;
            
            this.log.alerts.push( { 'message': 'O Jogador recebeu ' + attack + ' de dano, vida reduzida de ' + lifeOld + ' para ' + lifeNew, 'class':  'alert-danger' });                                                      
           
        },
        attackSpecialInTheMonster()
        {      
            let attack = this.getRandomIntInclusive(this.player.special_attack.max, this.player.special_attack.min);
            
            lifeOld = this.monster.life;
            lifeNew = this.monster.life  -= attack;

            this.log.alerts.push( { 'message': 'O Monstro recebeu ' + attack + ' de dano, vida reduzida de ' + lifeOld + ' para ' + lifeNew, 'class':  'alert-success' }); 
        },   
        getRandomIntInclusive(max, min) {
            min = Math.ceil(min);
            max = Math.floor(max);

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
      }
});



