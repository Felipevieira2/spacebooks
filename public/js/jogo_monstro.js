
new Vue({
    el:'#main',
    data:{
        player :{
            life: 100,
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
            attack: { 
                min: 8 ,
                max: 15
            },
            defense: 40
        },
    },
    watch:{
        
    },
    methods: {
        basic_attack() {            
            this.attack_basic_the_monster();
            this.attack_basic_the_player();         
        },
        special_attack() {            
            this.attack_special_the_monster();
            this.attack_basic_the_player();              
        },
        getCura(){
            
            this.player.life +=  this.getRandomIntInclusive(7, 20);
            this.attack_basic_the_player();  
        },
        attack_basic_the_monster()
        {
            this.monster.life -=  this.getRandomIntInclusive(this.player.basic_attack.max, this.player.basic_attack.min);
        },
        attack_basic_the_player()
        {
            this.player.life  -= this.getRandomIntInclusive(this.monster.attack.max, this.monster.attack.min);
        },
        attack_special_the_monster()
        {            
            this.monster.life -=  this.getRandomIntInclusive(this.player.special_attack.max, this.player.special_attack.min);
        },
        attack_basic_the_player()
        {
            this.player.life  -= this.getRandomIntInclusive(this.monster.attack.max, this.monster.attack.min);
        },
        getRandomIntInclusive(max, min) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
      }
});



