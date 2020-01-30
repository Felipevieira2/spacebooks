@extends('layouts.app')

@section('content')


<div class="container">

    <div class="row justify-content-center">
        <div class="col-md-12">
        
            <div class="card">
                <div class="card-header">Matando o monstro</div>

                <div class="card-body">
                    <div class="row text-center mb-3">
                        <div class="col-md-6 ">Jogador</div>
                        <div class="col-md-6 ">Monstro</div>
                    </div>
                    <div class="row  justify-content-center text-center">
                        <div class="col-md-5" :class="player.classColorLife" >@{{ player.life }}</div>                        
                        <div class="col-md-1"></div>  
                        <div class="col-md-5" :class="monster.classColorLife">@{{ monster.life }}</div>
                    </div>                
                </div>
            </div>
            <br>
            <div class="card" v-show="game.start">
                <div class="card-header">Mate o monstro</div>
                <div class="card-body">                   
                    <button @click="basic_attack()" >Atacar</button>
                    <button @click="special_attack()">Ataque Especial</button>
                    <button @click="getCura()">Curar</button>   
                    <button @click="surrender()">Desistir</button>                    
                </div>
            </div>
            <div class="card" v-show="!game.start">
                <div class="card-header">Menu</div>
                <div class="card-body">         
                    <div class="alert alert-danger" v-show="game.surrender" role="alert">
                        <strong>Você desistiu!</strong>
                    </div>          
                    <button @click="startGame()">@{{ game.textBtnStart }}</button>                                              
                </div>                
            </div>
            <br>
            <div class="card">
                <div class="card-header">Histórico do combate!</div>

                <div class="card-body">                            
                    <div class="row">
                        <div v-for="alert in log.alerts" class="alert col-md-6" :class="alert['class']" role="alert">
                            @{{alert['message']}}
                        </div>
                    </div>                                    
                </div>
            </div>

        </div>
    </div>
</div>


@endsection

