
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
            end: false,
            surrender: false,
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
            if ( this.game.start ){
                this.log.alerts.push( { 'message': 'O Jogador recebeu ' + this.log.lastAtackInPlayer + ' de dano, vida reduzida de ' + dataOld + ' para ' + dataNew, 'class': 'alert-success'} );
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

            this.log.alerts.push( { 'message' : 'O Monstro recebeu ' + this.log.lastAtackInMonster + ' de dano, vida reduzida de ' + dataOld + ' para ' + dataNew, 'class' : 'alert-danger' });
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
            this.attack_basic_in_the_monster();
            this.attack_basic_in_the_player();         
        },
        startGame(){
            this.player.life = 100;
            this.monster.life = 100;
            this.game.start = true;
            this.log.alerts = [];
        },
        surrender(){            
            this.game.start = false;
            this.game.end = true;
            this.game.surrender = true;
            this.game.textBtnStart = 'Recomeçar';
            this.log.alerts.push({ 'message' : 'Vocễ desistiu, vida reduzida de ' + this.player.life + ' para 0' , 'class' : 'alert-danger' })
            this.player.life = 0;
        },
        special_attack() {            
            this.attack_special_in_the_the_monster();
            this.attack_basic_in_the_player();              
        },
        getCura(){
            let heal = this.getRandomIntInclusive(7, 20);                        
            this.log.lastHealInPlayer = heal;
            this.player.life +=   heal;
            this.log.alerts.push( { 'message' : 'O Monstro recebeu 0 de dano', 'class' : 'alert-danger' }); 
            this.attack_basic_in_the_player(); 
            
        },
        attack_basic_in_the_monster()
        {   
            let attack =  this.getRandomIntInclusive(this.player.basic_attack.max, this.player.basic_attack.min);

            this.log.lastAtackInMonster = attack;
            this.monster.life -= attack
        },
        attack_basic_in_the_player()
        {   
            let attack = this.getRandomIntInclusive(this.monster.attack.max, this.monster.attack.min);

            this.log.lastAtackInPlayer = attack;
            this.player.life  -= attack;
        },
        attack_special_in_the_the_monster()
        {      
            let attack = this.getRandomIntInclusive(this.player.special_attack.max, this.player.special_attack.min);
            
            this.log.lastAtackInMonster = attack;
            this.monster.life  -= attack;

        },   
        getRandomIntInclusive(max, min) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
      }
});



